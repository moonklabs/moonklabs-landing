"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { contactEmail, contactEndpoint, contactInterests } from "@/app/site-config";

type Status =
  | { readonly kind: "idle" }
  | { readonly kind: "sending" }
  | { readonly kind: "done" }
  | { readonly kind: "error"; readonly message: string };

interface ApiResponse {
  readonly success?: boolean;
  readonly error?: string | null;
}

const FIELD =
  "mt-2 w-full rounded-xl border border-line-strong bg-ink px-4 py-3 text-base text-fg placeholder:text-mute focus:border-fg focus:outline-none";
const LABEL = "block text-sm text-mute";
const NETWORK_ERROR = "서버 연결에 실패했습니다. 네트워크 상태를 확인해주세요.";
const FALLBACK_ERROR = "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

export default function ContactForm({ className = "bg-card" }: { readonly className?: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // /contact/?type=partner opens the form on 제휴 문의; ?interest=장사왕 preselects a product.
  const params = useSearchParams();
  const requested = params.get("type") === "partner" ? "제휴 문의" : params.get("interest");
  const defaultInterest = contactInterests.find((item) => item === requested) ?? "";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = { ...Object.fromEntries(data.entries()), consent: data.get("consent") === "on" };
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body: ApiResponse = await res.json();
      setStatus(res.ok && body.success ? { kind: "done" } : { kind: "error", message: body.error ?? FALLBACK_ERROR });
    } catch {
      // Offline, blocked, or a non-JSON reply. The message points to email instead.
      setStatus({ kind: "error", message: NETWORK_ERROR });
    }
  };

  if (status.kind === "done") {
    return (
      <div role="status" className="rounded-3xl bg-card p-8 text-left md:p-10">
        <p className="text-xl font-medium">문의가 접수되었습니다.</p>
        <p className="mt-2 text-mute">담당자가 확인 후 남겨주신 연락처로 연락드리겠습니다. 보통 1영업일 이내 회신드립니다.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`rounded-3xl p-6 text-left md:p-10 ${className}`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={LABEL}>
          회사명 *
          <input name="company" required maxLength={100} autoComplete="organization" className={FIELD} />
        </label>
        <label className={LABEL}>
          이름 *
          <input name="name" required maxLength={50} autoComplete="name" className={FIELD} />
        </label>
        <label className={LABEL}>
          업무용 이메일 *
          <input name="email" type="email" required maxLength={254} autoComplete="email" className={FIELD} />
        </label>
        <label className={LABEL}>
          연락처
          <input name="phone" type="tel" maxLength={30} autoComplete="tel" pattern="[0-9+\-() ]*" className={FIELD} />
        </label>
        <label className={`${LABEL} sm:col-span-2`}>
          관심 제품·문의 유형 *
          <select name="interest" required defaultValue={defaultInterest} className={FIELD}>
            <option value="" disabled>
              선택해주세요
            </option>
            {contactInterests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </label>
        <label className={`${LABEL} sm:col-span-2`}>
          문의 내용
          <textarea name="message" rows={4} maxLength={2000} placeholder="현재 과제나 궁금한 점을 적어주세요." className={FIELD} />
        </label>
      </div>
      {/* Honeypot: hidden from people, tempting to bots. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <label className="mt-5 flex items-start gap-3 text-sm text-mute">
        <input name="consent" type="checkbox" required className="mt-1 size-4 accent-[var(--color-fg)]" />
        <span>
          상담 목적의 개인정보(회사명, 이름, 이메일, 연락처) 수집·이용에 동의합니다.{" "}
          <Link href="/privacy/" target="_blank" className="underline underline-offset-2">
            개인정보 처리방침
          </Link>{" "}
          *
        </span>
      </label>
      {status.kind === "error" ? (
        <p role="alert" className="mt-4 text-sm text-warn">
          {status.message} 급하시면{" "}
          <a href={`mailto:${contactEmail}`} className="underline">
            {contactEmail}
          </a>
          로 보내주세요.
        </p>
      ) : null}
      <button type="submit" disabled={status.kind === "sending"} className="btn-primary mt-6 w-full disabled:opacity-50">
        {status.kind === "sending" ? "보내는 중…" : "도입 문의 보내기"}
      </button>
    </form>
  );
}
