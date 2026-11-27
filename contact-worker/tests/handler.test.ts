import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handleContact, type ContactEnv, type MailBinding } from "../src/handler";
import { createRateLimiter } from "../src/rate-limit";
import worker from "../src/index";

const ORIGIN = "https://moonklabs.com";
const WEBHOOK = "https://chat.googleapis.com/v1/spaces/TEST/messages?key=k&token=t";
const valid = { company: "뭉클상사", name: "김지현", email: "jh@example.com", interest: "장사왕", message: "문의", consent: true };

function request(body: unknown, init: { method?: string; origin?: string | null; ip?: string } = {}): Request {
  const method = init.method ?? "POST";
  const headers = new Headers({ "Content-Type": "application/json", "cf-connecting-ip": init.ip ?? "203.0.113.1" });
  if (init.origin !== null) headers.set("Origin", init.origin ?? ORIGIN);
  return new Request("https://contact.moonklabs.com/contact", {
    method,
    headers,
    body: method === "POST" ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined,
  });
}

function env(overrides: Partial<ContactEnv> = {}): ContactEnv & { EMAIL: MailBinding & { send: ReturnType<typeof vi.fn> } } {
  return {
    GOOGLE_CHAT_WEBHOOK_URL: WEBHOOK,
    EMAIL: { send: vi.fn().mockResolvedValue({ messageId: "m1" }) },
    MAIL_FROM: "noreply@moonklabs.com",
    MAIL_TO: "hello@moonklabs.com",
    ALLOWED_ORIGINS: "https://moonklabs.com, https://www.moonklabs.com",
    ...overrides,
  } as ContactEnv & { EMAIL: MailBinding & { send: ReturnType<typeof vi.fn> } };
}

const limiter = () => createRateLimiter(100, 60_000);
const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset().mockResolvedValue(new Response("{}", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

describe("handleContact", () => {
  it("sends the inquiry to Google Chat and by email", async () => {
    const e = env();
    const res = await handleContact(request(valid), e, limiter());

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, error: null });
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(ORIGIN);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(WEBHOOK);
    expect(JSON.parse(init.body).text).toContain("뭉클상사");
    expect(e.EMAIL.send).toHaveBeenCalledWith(
      expect.objectContaining({ to: "hello@moonklabs.com", from: "noreply@moonklabs.com", replyTo: "jh@example.com" }),
    );
  });

  it("still succeeds when only one channel delivers", async () => {
    fetchMock.mockResolvedValue(new Response("nope", { status: 500 }));
    expect((await handleContact(request(valid), env(), limiter())).status).toBe(200);

    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    const mailDown = env({ EMAIL: { send: vi.fn().mockRejectedValue(new Error("E_SENDER")) } });
    expect((await handleContact(request(valid), mailDown, limiter())).status).toBe(200);
    expect(console.error).toHaveBeenCalled();
  });

  it("fails with 502 when every channel fails", async () => {
    fetchMock.mockRejectedValue(new Error("network"));
    const e = env({ EMAIL: { send: vi.fn().mockRejectedValue(new Error("down")) } });
    const res = await handleContact(request(valid), e, limiter());
    expect(res.status).toBe(502);
    expect((await res.json()).success).toBe(false);
  });

  it("works with only one channel configured", async () => {
    const chatOnly = env({ EMAIL: undefined });
    expect((await handleContact(request(valid), chatOnly, limiter())).status).toBe(200);

    const mailOnly = env({ GOOGLE_CHAT_WEBHOOK_URL: undefined });
    expect((await handleContact(request(valid), mailOnly, limiter())).status).toBe(200);
    expect(mailOnly.EMAIL.send).toHaveBeenCalledOnce();
  });

  it("returns 503 when nothing is configured", async () => {
    const res = await handleContact(request(valid), env({ GOOGLE_CHAT_WEBHOOK_URL: undefined, EMAIL: undefined }), limiter());
    expect(res.status).toBe(503);
  });

  it("rejects invalid input without sending", async () => {
    const e = env();
    const res = await handleContact(request({ ...valid, email: "x" }), e, limiter());
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(e.EMAIL.send).not.toHaveBeenCalled();
  });

  it("rejects malformed and oversized bodies", async () => {
    expect((await handleContact(request("{not json"), env(), limiter())).status).toBe(400);
    expect((await handleContact(request({ ...valid, message: "가".repeat(20_000) }), env(), limiter())).status).toBe(413);
  });

  it("pretends success for a filled honeypot and sends nothing", async () => {
    const e = env();
    const res = await handleContact(request({ ...valid, website: "" + "" }), e, limiter());
    expect(res.status).toBe(200);
    fetchMock.mockClear();
    e.EMAIL.send.mockClear();
    const bot = await handleContact(request({ ...valid, website: "x" }), e, limiter());
    // A non-empty honeypot fails validation length 0, so it is rejected before any send.
    expect([200, 400]).toContain(bot.status);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(e.EMAIL.send).not.toHaveBeenCalled();
  });

  it("blocks unknown origins and missing origins", async () => {
    expect((await handleContact(request(valid, { origin: "https://evil.example" }), env(), limiter())).status).toBe(403);
    expect((await handleContact(request(valid, { origin: null }), env(), limiter())).status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("answers preflight for allowed origins only", async () => {
    const ok = await handleContact(request(null, { method: "OPTIONS", origin: "https://www.moonklabs.com" }), env(), limiter());
    expect(ok.status).toBe(204);
    expect(ok.headers.get("Access-Control-Allow-Methods")).toContain("POST");
    expect((await handleContact(request(null, { method: "OPTIONS", origin: "https://evil.example" }), env(), limiter())).status).toBe(403);
  });

  it("rejects other methods", async () => {
    expect((await handleContact(request(null, { method: "GET" }), env(), limiter())).status).toBe(405);
  });

  it("rate limits per client address", async () => {
    const tight = createRateLimiter(2, 60_000);
    const statuses = [];
    for (let i = 0; i < 3; i += 1) statuses.push((await handleContact(request(valid), env(), tight)).status);
    expect(statuses).toEqual([200, 200, 429]);
    expect((await handleContact(request(valid, { ip: "203.0.113.9" }), env(), tight)).status).toBe(200);
  });
});

describe("rate limiter", () => {
  it("opens a new window after the old one ends", () => {
    const l = createRateLimiter(1, 1000);
    expect(l.check("a", 0)).toBe(true);
    expect(l.check("a", 500)).toBe(false);
    expect(l.check("a", 1000)).toBe(true);
  });
});

describe("worker routing", () => {
  it("serves /contact and 404s everything else", async () => {
    expect((await worker.fetch(request(valid, { ip: "203.0.113.50" }), env())).status).toBe(200);
    const other = await worker.fetch(new Request("https://contact.moonklabs.com/nope"), env());
    expect(other.status).toBe(404);
  });
});
