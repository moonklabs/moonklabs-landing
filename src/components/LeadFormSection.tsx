"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { contactEmail, contactInterests } from "@/app/site-config";

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full bg-white px-4 py-3.5 text-sm text-black placeholder:text-zinc-400 outline-none transition-colors border border-zinc-200 focus:border-violet-600";

export default function LeadFormSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "전송에 실패했습니다.");
      }
      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setErrorMessage(err instanceof Error ? err.message : "전송에 실패했습니다.");
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="py-32 px-6"
      style={{ background: "#FAFAFA" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: headline + trust notes */}
        <div className="space-y-8">
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-black text-black"
            style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            귀사의 업무에도
            <br />
            Agent를 붙여보세요.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-zinc-500 text-base leading-relaxed max-w-md"
          >
            어떤 업무부터 자동화하면 좋을지부터 함께 정리해드립니다. 첫 상담과 진단 워크숍은
            무료입니다.
          </motion.p>
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="space-y-3 text-sm text-zinc-600"
          >
            {[
              "보통 1영업일 이내 회신드립니다",
              "영업 콜 없이, 문의하신 내용에만 답합니다",
              "무료 진단 워크숍으로 자동화 대상과 기대 효과를 먼저 확인합니다",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 bg-violet-600 inline-block shrink-0" />
                {line}
              </li>
            ))}
          </motion.ul>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-xs text-zinc-400 tracking-wide"
          >
            폼이 불편하시면 이메일로 보내주세요 —{" "}
            <a href={`mailto:${contactEmail}`} className="text-zinc-600 underline underline-offset-4 hover:text-black transition-colors">
              {contactEmail}
            </a>
          </motion.p>
        </div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {state === "success" ? (
            <div
              className="h-full flex flex-col items-start justify-center gap-4 p-10"
              style={{ background: "#fff", border: "1px solid rgba(124,58,237,0.3)", boxShadow: "0 12px 40px rgba(15,10,40,0.06)" }}
            >
              <span className="w-10 h-10 flex items-center justify-center bg-violet-600 text-white text-lg">✓</span>
              <h3 className="text-black text-2xl font-bold" style={{ letterSpacing: "-0.02em" }}>
                문의가 접수되었습니다.
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                남겨주신 이메일로 1영업일 이내에 회신드리겠습니다. 급하신 경우{" "}
                <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
                  {contactEmail}
                </a>
                로 바로 연락 주세요.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-8 lg:p-10"
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 12px 40px rgba(15,10,40,0.06)",
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-1.5 block">
                  <span className="text-xs text-zinc-500 tracking-wide">회사명 *</span>
                  <input name="company" required maxLength={200} placeholder="뭉클랩" className={inputClass} />
                </label>
                <label className="space-y-1.5 block">
                  <span className="text-xs text-zinc-500 tracking-wide">담당자 이름 / 직함 *</span>
                  <input name="name" required maxLength={200} placeholder="김담당 / 팀장" className={inputClass} />
                </label>
              </div>
              <label className="space-y-1.5 block">
                <span className="text-xs text-zinc-500 tracking-wide">업무용 이메일 *</span>
                <input name="email" type="email" required maxLength={200} placeholder="you@company.com" className={inputClass} />
              </label>
              <label className="space-y-1.5 block">
                <span className="text-xs text-zinc-500 tracking-wide">관심 영역</span>
                <select name="interest" defaultValue={contactInterests[0]} className={inputClass}>
                  {contactInterests.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1.5 block">
                <span className="text-xs text-zinc-500 tracking-wide">현재 과제 (선택)</span>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={2000}
                  placeholder="자동화하고 싶은 업무나 현재 겪고 있는 문제를 간단히 적어주세요."
                  className={`${inputClass} resize-none`}
                />
              </label>

              {state === "error" && (
                <p role="alert" className="text-sm text-red-600">
                  {errorMessage} 이메일(
                  <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
                    {contactEmail}
                  </a>
                  )로도 문의하실 수 있습니다.
                </p>
              )}

              <button
                type="submit"
                disabled={state === "submitting"}
                className="w-full px-8 py-4 text-sm font-medium tracking-wide text-white bg-black hover:bg-zinc-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {state === "submitting" ? "전송 중…" : "도입 상담 신청하기 →"}
              </button>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                남겨주신 정보는 상담 회신 용도로만 사용합니다.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
