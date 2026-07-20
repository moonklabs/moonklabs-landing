import { contactEmail } from "@/app/site-config";

type ContactPayload = {
  company?: string;
  name?: string;
  email?: string;
  interest?: string;
  message?: string;
};

const MAX_FIELD_LENGTH = 2000;

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

async function notifySlack(payload: Required<ContactPayload>) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: [
        "🔔 *새 도입 상담 문의*",
        `*회사:* ${payload.company}`,
        `*담당자:* ${payload.name}`,
        `*이메일:* ${payload.email}`,
        `*관심 영역:* ${payload.interest}`,
        `*문의 내용:*\n${payload.message}`,
      ].join("\n"),
    }),
  });
  return res.ok;
}

async function notifyEmail(payload: Required<ContactPayload>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "noreply@moonklabs.com",
      to: process.env.CONTACT_NOTIFY_EMAIL ?? contactEmail,
      reply_to: payload.email,
      subject: `[뭉클랩 도입 문의] ${payload.company} — ${payload.interest}`,
      text: [
        `회사: ${payload.company}`,
        `담당자: ${payload.name}`,
        `이메일: ${payload.email}`,
        `관심 영역: ${payload.interest}`,
        "",
        "문의 내용:",
        payload.message,
      ].join("\n"),
    }),
  });
  return res.ok;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  const payload = {
    company: sanitize(body.company),
    name: sanitize(body.name),
    email: sanitize(body.email),
    interest: sanitize(body.interest),
    message: sanitize(body.message),
  };

  if (!payload.company || !payload.name || !payload.email) {
    return Response.json(
      { ok: false, error: "회사명, 담당자, 이메일은 필수입니다." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return Response.json({ ok: false, error: "이메일 형식을 확인해주세요." }, { status: 400 });
  }

  const results = await Promise.allSettled([notifySlack(payload), notifyEmail(payload)]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);

  if (!delivered) {
    // 알림 채널(SLACK_WEBHOOK_URL / RESEND_API_KEY) 미설정 시 서버 로그로만 남는다.
    console.log("[contact] lead received (no notifier configured):", payload);
  }

  return Response.json({ ok: true });
}
