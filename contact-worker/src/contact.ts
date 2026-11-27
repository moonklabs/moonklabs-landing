import { z } from "zod";

export const INTERESTS = ["MKbot.ai", "Beejet", "장사왕", "Sprintable", "기업 맞춤 Agent 자동화", "제휴 문의", "기타"] as const;

const LIMITS = { company: 100, name: 50, email: 254, phone: 30, message: 2000 } as const;

export const contactSchema = z.object({
  company: z.string().trim().min(1, "회사명을 입력해주세요.").max(LIMITS.company),
  name: z.string().trim().min(1, "이름을 입력해주세요.").max(LIMITS.name),
  email: z.string().trim().max(LIMITS.email).email("이메일 형식을 확인해주세요."),
  phone: z
    .string()
    .trim()
    .max(LIMITS.phone)
    .regex(/^[0-9+\-() ]*$/, "연락처 형식을 확인해주세요.")
    .optional()
    .default(""),
  interest: z.enum(INTERESTS, { errorMap: () => ({ message: "관심 제품을 선택해주세요." }) }),
  message: z.string().trim().max(LIMITS.message).optional().default(""),
  consent: z.literal(true, { errorMap: () => ({ message: "개인정보 수집·이용에 동의해주세요." }) }),
  // Honeypot: real users never fill this hidden field.
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ParseResult = { readonly ok: true; readonly data: ContactInput } | { readonly ok: false; readonly error: string };

export function parseContact(raw: unknown): ParseResult {
  const result = contactSchema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };
  const message = result.error.issues[0]?.message;
  return { ok: false, error: !message || message === "Required" ? "필수 항목을 입력해주세요." : message };
}

interface Row {
  readonly label: string;
  readonly value: string;
}

function rows(input: ContactInput, now: Date): readonly Row[] {
  return [
    { label: "회사", value: input.company },
    { label: "이름", value: input.name },
    { label: "이메일", value: input.email },
    { label: "연락처", value: input.phone },
    { label: "관심 제품", value: input.interest },
    { label: "접수 시각", value: now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }) },
  ];
}

/** Google Chat reads `<...>` as links and mentions (e.g. `<users/all>`), so angle brackets are dropped. */
function chatSafe(value: string): string {
  return value.replace(/[<>]/g, "").trim() || "-";
}

/** Google Chat incoming-webhook payload. Pure so it can be unit-tested. */
export function buildChatPayload(input: ContactInput, now: Date): { readonly text: string } {
  const lines = rows(input, now).map((row) => `*${row.label}:* ${chatSafe(row.value)}`);
  return { text: [`*새 도입 문의* · ${chatSafe(input.company)}`, ...lines, "*문의 내용:*", chatSafe(input.message)].join("\n") };
}

const HTML_ESCAPES: Readonly<Record<string, string>> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);
}

/** Header values must stay on one line. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export interface MailContent {
  readonly subject: string;
  readonly text: string;
  readonly html: string;
  readonly replyTo: string;
}

/** Notification email content. Pure so it can be unit-tested. */
export function buildMailContent(input: ContactInput, now: Date): MailContent {
  const list = rows(input, now);
  const message = input.message || "-";
  const htmlRows = list
    .map((row) => `<tr><th align="left" style="padding:4px 16px 4px 0">${escapeHtml(row.label)}</th><td>${escapeHtml(row.value || "-")}</td></tr>`)
    .join("");
  return {
    subject: singleLine(`[도입 문의] ${input.company} / ${input.name} (${input.interest})`),
    text: [...list.map((row) => `${row.label}: ${row.value || "-"}`), "", "문의 내용:", message].join("\n"),
    html: `<h2>새 도입 문의</h2><table>${htmlRows}</table><h3>문의 내용</h3><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    replyTo: input.email,
  };
}
