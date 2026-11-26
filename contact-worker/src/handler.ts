import { buildChatPayload, buildMailContent, parseContact, type ContactInput } from "./contact";
import { createRateLimiter, type RateLimiter } from "./rate-limit";

export interface MailBinding {
  send(message: {
    readonly to: string;
    readonly from: string;
    readonly subject: string;
    readonly text: string;
    readonly html: string;
    readonly replyTo: string;
  }): Promise<unknown>;
}

export interface ContactEnv {
  readonly GOOGLE_CHAT_WEBHOOK_URL?: string;
  readonly EMAIL?: MailBinding;
  readonly MAIL_FROM?: string;
  readonly MAIL_TO?: string;
  readonly ALLOWED_ORIGINS?: string;
}

interface ApiResponse {
  readonly success: boolean;
  readonly error: string | null;
}

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 16 * 1024;
const defaultLimiter = createRateLimiter(RATE_LIMIT, RATE_WINDOW_MS);

function allowedOrigin(req: Request, env: ContactEnv): string | null {
  const origin = req.headers.get("origin");
  const allowed = (env.ALLOWED_ORIGINS ?? "").split(",").map((value) => value.trim()).filter(Boolean);
  return origin && allowed.includes(origin) ? origin : null;
}

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin) return { Vary: "Origin" };
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function reply(body: ApiResponse, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...corsHeaders(origin) },
  });
}

function clientKey(req: Request): string {
  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for") ?? "";
  return ip.split(",")[0]?.trim() || "unknown";
}

async function sendChat(webhookUrl: string, input: ContactInput, now: Date): Promise<void> {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(buildChatPayload(input, now)),
  });
  if (!res.ok) throw new Error(`Google Chat responded with ${res.status}`);
}

async function sendMail(binding: MailBinding, from: string, to: string, input: ContactInput, now: Date): Promise<void> {
  await binding.send({ to, from, ...buildMailContent(input, now) });
}

/** Starts every configured channel. Each entry is named so failures can be logged per channel. */
function deliveries(env: ContactEnv, input: ContactInput, now: Date): readonly { readonly channel: string; readonly task: Promise<void> }[] {
  const chat = env.GOOGLE_CHAT_WEBHOOK_URL
    ? [{ channel: "google-chat", task: sendChat(env.GOOGLE_CHAT_WEBHOOK_URL, input, now) }]
    : [];
  const mail =
    env.EMAIL && env.MAIL_FROM && env.MAIL_TO
      ? [{ channel: "email", task: sendMail(env.EMAIL, env.MAIL_FROM, env.MAIL_TO, input, now) }]
      : [];
  return [...chat, ...mail];
}

export async function handleContact(req: Request, env: ContactEnv, limiter: RateLimiter = defaultLimiter): Promise<Response> {
  const origin = allowedOrigin(req, env);

  if (req.method === "OPTIONS") return new Response(null, { status: origin ? 204 : 403, headers: corsHeaders(origin) });
  if (req.method !== "POST") return reply({ success: false, error: "허용되지 않는 요청입니다." }, 405, origin);
  if (!origin) return reply({ success: false, error: "허용되지 않는 출처입니다." }, 403, origin);
  if (!limiter.check(clientKey(req))) {
    return reply({ success: false, error: "요청이 많습니다. 잠시 후 다시 시도해주세요." }, 429, origin);
  }

  let raw: unknown;
  try {
    const body = await req.text();
    if (body.length > MAX_BODY_BYTES) return reply({ success: false, error: "요청이 너무 큽니다." }, 413, origin);
    raw = JSON.parse(body);
  } catch {
    return reply({ success: false, error: "잘못된 요청 형식입니다." }, 400, origin);
  }

  const parsed = parseContact(raw);
  if (!parsed.ok) return reply({ success: false, error: parsed.error }, 400, origin);

  // Honeypot filled: pretend success, send nothing.
  if (parsed.data.website) return reply({ success: true, error: null }, 200, origin);

  const started = deliveries(env, parsed.data, new Date());
  if (started.length === 0) {
    console.error("No delivery channel configured; contact submission dropped");
    return reply({ success: false, error: "문의 접수가 일시적으로 불가합니다. 이메일로 문의해주세요." }, 503, origin);
  }

  const results = await Promise.allSettled(started.map((entry) => entry.task));
  const failed = results.flatMap((result, i) => (result.status === "rejected" ? [{ channel: started[i].channel, reason: result.reason }] : []));
  failed.forEach(({ channel, reason }) => console.error(`Contact delivery failed (${channel}):`, reason));

  // The inquiry counts as received when at least one channel got it.
  if (failed.length === started.length) {
    return reply({ success: false, error: "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }, 502, origin);
  }
  return reply({ success: true, error: null }, 200, origin);
}
