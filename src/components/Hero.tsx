"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const lineVariant = {
  hidden: { y: 36, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const feedItems = [
  { time: "새벽 2:10", task: "어제 매출 · 광고 성과 정리 완료" },
  { time: "새벽 3:40", task: "품절 위험 상품 2건 미리 발견" },
  { time: "새벽 5:15", task: "주간 보고서 초안 작성 완료" },
  { time: "오전 5:50", task: "반복 문의 12건 분류 · 답변 초안 준비" },
  { time: "오전 6:20", task: "스프린트 티켓 정리 · 리뷰어 배정" },
];

function LiveAgentCard() {
  const [cursor, setCursor] = useState(3);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const id = setInterval(() => setCursor((c) => c + 1), 2800);
    return () => clearInterval(id);
  }, []);

  const visible = [0, 1, 2].map((i) => feedItems[(cursor + i) % feedItems.length]);

  return (
    <div className="float-soft">
      <div
        className="w-full max-w-md ml-auto rounded-2xl overflow-hidden bg-white"
        style={{
          border: "1px solid rgba(28,27,23,0.08)",
          boxShadow: "0 24px 60px rgba(28,27,23,0.10), 0 2px 8px rgba(28,27,23,0.04)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2.5 px-5 py-4"
          style={{ borderBottom: "1px solid rgba(28,27,23,0.06)" }}
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-50 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
          </span>
          <span className="text-ink text-sm font-semibold">AI 에이전트 · 오늘의 업무 보고</span>
          <span className="ml-auto text-[11px] text-zinc-400">실시간</span>
        </div>

        {/* Feed */}
        <div className="px-5 py-4 space-y-3">
          <div className="text-[11px] text-zinc-400 tracking-wide">밤사이 자동으로 처리한 일</div>
          <div className="space-y-2.5">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item) => (
                <motion.div
                  key={item.task}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-2.5 text-[13px]"
                >
                  <span className="mt-0.5 flex w-4 h-4 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 text-[9px]">
                    ✓
                  </span>
                  <span className="flex-1 text-zinc-700">{item.task}</span>
                  <span className="text-zinc-400 text-[11px] shrink-0">{item.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Suggestion */}
        <div className="px-5 pb-5 space-y-3">
          <div
            className="rounded-xl p-4 space-y-2"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.16)" }}
          >
            <div className="text-violet-700 text-[11px] font-medium tracking-wide">
              에이전트의 제안 · 확인이 필요해요
            </div>
            <p className="text-[13px] text-zinc-700 leading-relaxed">
              광고비가 새는 캠페인을 찾았습니다. 예산을 조정하면{" "}
              <strong className="text-ink">월 약 120만원 절감</strong>이 예상됩니다.
            </p>
            <div className="flex gap-2 pt-0.5">
              <span className="px-3 py-1.5 rounded-full bg-violet-600 text-white text-[11px] font-medium">
                승인하기
              </span>
              <span
                className="px-3 py-1.5 rounded-full text-zinc-500 text-[11px]"
                style={{ border: "1px solid rgba(28,27,23,0.12)" }}
              >
                자세히 보기
              </span>
            </div>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            에이전트는 담당자의 승인 없이는 실행하지 않습니다
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Hero({
  announcement,
}: {
  announcement?: { label: string; href: string };
}) {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center pt-28 pb-20 px-6"
      style={{ borderBottom: "1px solid rgba(28,27,23,0.08)" }}
    >
      {/* Decorative background — soft gradient mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="absolute"
          style={{
            top: "-10%",
            right: "-5%",
            width: "720px",
            height: "720px",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.09) 0%, rgba(124,58,237,0.03) 45%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "-15%",
            left: "-8%",
            width: "560px",
            height: "560px",
            background:
              "radial-gradient(circle, rgba(234,179,8,0.06) 0%, rgba(234,179,8,0.02) 45%, transparent 70%)",
            filter: "blur(56px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-14 items-center relative z-10">
        {/* Left: 60% */}
        <div className="lg:col-span-3 space-y-9">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {announcement ? (
              <Link
                href={announcement.href}
                className="group inline-flex items-center gap-2.5 text-xs text-zinc-600 pl-1.5 pr-4 py-1.5 rounded-full bg-white hover:-translate-y-0.5 transition-all"
                style={{ border: "1px solid rgba(28,27,23,0.10)", boxShadow: "0 2px 10px rgba(28,27,23,0.04)" }}
              >
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-sky-700"
                  style={{ background: "rgba(2,132,199,0.09)" }}
                >
                  NEW
                </span>
                <span className="truncate max-w-[300px]">{announcement.label}</span>
                <span className="text-zinc-400 group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            ) : (
              <span
                className="inline-flex items-center gap-2 text-xs tracking-wide text-zinc-600 px-4 py-2 rounded-full bg-white"
                style={{ border: "1px solid rgba(28,27,23,0.10)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 inline-block" />
                기업을 위한 AI Agent 자동화 파트너
              </span>
            )}
          </motion.div>

          <h1 className="hero-title text-ink">
            {["반복 업무는 에이전트에게,", "판단은 사람에게."].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  custom={i}
                  variants={lineVariant}
                  initial="hidden"
                  animate="visible"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55 }}
            className="text-zinc-600 text-lg leading-relaxed max-w-xl"
          >
            뭉클랩은 <strong className="text-ink font-semibold">Sprintable</strong>과{" "}
            <strong className="text-ink font-semibold">Sellerking</strong>을 직접 개발·운영하며 검증한
            방식으로, 기업의 실제 업무 체계 안에 AI Agent 자동화를 안전하게 도입합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.55 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-full text-sm font-medium text-white bg-ink hover:opacity-85 transition-all hover:-translate-y-0.5"
                style={{ background: "#1C1B17" }}
              >
                도입 상담 신청 →
              </a>
              <a
                href="#process"
                className="px-7 py-3.5 rounded-full text-sm font-medium text-ink bg-white hover:-translate-y-0.5 transition-all"
                style={{ border: "1px solid rgba(28,27,23,0.14)" }}
              >
                도입 프로세스 보기
              </a>
            </div>
            <p className="text-xs text-zinc-500 tracking-wide">
              첫 상담 · 진단 워크숍 무료 &nbsp;·&nbsp; 보통 1영업일 이내 회신
            </p>
          </motion.div>
        </div>

        {/* Right: 40% — live agent demo */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <LiveAgentCard />
        </motion.div>
      </div>
    </section>
  );
}
