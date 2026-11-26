import { describe, expect, it } from "vitest";
import { buildChatPayload, buildMailContent, parseContact } from "../src/contact";

const valid = { company: "뭉클상사", name: "김지현", email: "jh@example.com", phone: "010-1234-5678", interest: "MKbot.ai", message: "도입 문의", consent: true };
const NOW = new Date("2026-11-26T03:00:00Z");

function parsed(overrides: Record<string, unknown> = {}) {
  const result = parseContact({ ...valid, ...overrides });
  if (!result.ok) throw new Error(result.error);
  return result.data;
}

describe("parseContact", () => {
  it("accepts a complete submission and trims values", () => {
    expect(parsed({ company: "  뭉클상사  " }).company).toBe("뭉클상사");
  });

  it("defaults the optional fields", () => {
    const data = parsed({ phone: undefined, message: undefined });
    expect(data).toMatchObject({ phone: "", message: "", website: "" });
  });

  it.each([
    [{ company: "" }, "회사명을 입력해주세요."],
    [{ name: " " }, "이름을 입력해주세요."],
    [{ email: "not-an-email" }, "이메일 형식을 확인해주세요."],
    [{ phone: "abc" }, "연락처 형식을 확인해주세요."],
    [{ interest: "없는 제품" }, "관심 제품을 선택해주세요."],
    [{ consent: false }, "개인정보 수집·이용에 동의해주세요."],
  ])("rejects %j", (overrides, message) => {
    expect(parseContact({ ...valid, ...overrides })).toEqual({ ok: false, error: message });
  });

  it("reports missing fields in plain words", () => {
    expect(parseContact({})).toEqual({ ok: false, error: "필수 항목을 입력해주세요." });
    expect(parseContact(null).ok).toBe(false);
  });

  it("rejects over-long input", () => {
    expect(parseContact({ ...valid, message: "가".repeat(2001) }).ok).toBe(false);
  });
});

describe("buildChatPayload", () => {
  it("lists every field with the Seoul time", () => {
    const { text } = buildChatPayload(parsed(), NOW);
    expect(text).toContain("*새 도입 문의* · 뭉클상사");
    expect(text).toContain("*이메일:* jh@example.com");
    expect(text).toContain("*관심 제품:* MKbot.ai");
    expect(text).toContain("2026. 11. 26.");
    expect(text).toMatch(/12:00:00/);
  });

  it("drops angle brackets so input cannot mention or link", () => {
    const { text } = buildChatPayload(parsed({ message: "<users/all> 확인 <https://evil.example|클릭>" }), NOW);
    expect(text).not.toMatch(/[<>]/);
  });

  it("shows a dash for empty values", () => {
    const { text } = buildChatPayload(parsed({ phone: "", message: "" }), NOW);
    expect(text).toContain("*연락처:* -");
    expect(text.endsWith("*문의 내용:*\n-")).toBe(true);
  });
});

describe("buildMailContent", () => {
  it("builds subject, text and reply-to", () => {
    const mail = buildMailContent(parsed(), NOW);
    expect(mail.subject).toBe("[도입 문의] 뭉클상사 / 김지현 (MKbot.ai)");
    expect(mail.replyTo).toBe("jh@example.com");
    expect(mail.text).toContain("회사: 뭉클상사");
    expect(mail.text).toContain("문의 내용:\n도입 문의");
  });

  it("escapes HTML in user input", () => {
    const mail = buildMailContent(parsed({ company: "<b>A&B</b>", message: "<script>alert('x')</script>" }), NOW);
    expect(mail.html).toContain("&lt;b&gt;A&amp;B&lt;/b&gt;");
    expect(mail.html).not.toContain("<script>");
  });

  it("keeps the subject on one line", () => {
    const mail = buildMailContent(parsed({ company: "A\r\nBcc: x@example.com" }), NOW);
    expect(mail.subject).not.toMatch(/[\r\n]/);
  });
});
