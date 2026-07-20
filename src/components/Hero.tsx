"use client";

import { motion } from "framer-motion";

const lineVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center pt-20 pb-16 px-6"
      style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* Decorative background — grid + violet orb */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "8%",
            left: "58%",
            width: "640px",
            height: "640px",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "-10%",
            left: "-10%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.07) 0%, rgba(56,189,248,0.03) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center relative z-10">
        {/* Left: 60% */}
        <div className="lg:col-span-3 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-2 text-xs tracking-widest text-zinc-600 px-3 py-1.5 bg-white/70"
              style={{ border: "1px solid rgba(0,0,0,0.12)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600 inline-block" />
              AI NATIVE ENGINEERING STUDIO · 2026
            </span>
          </motion.div>

          <div className="hero-title text-black overflow-hidden">
            {["에이전트가", "팀이 되는", "엔지니어링을", "설계합니다"].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  custom={i}
                  variants={lineVariant}
                  initial="hidden"
                  animate="visible"
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-1"
          >
            <p className="text-zinc-600 text-lg leading-relaxed">
              뭉클랩은 <strong className="text-black">Sprintable</strong>과{" "}
              <strong className="text-black">Sellerking</strong>을 개발·운영하며 축적한 경험을
              바탕으로, 기업이 실제 업무 체계 안에{" "}
              <strong className="text-black">AI Agent 자동화</strong>를 도입할 수 있도록 돕는 B2B
              파트너입니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="space-y-3"
          >
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="px-6 py-3 text-sm font-medium tracking-wide text-white bg-black hover:bg-zinc-800 transition-colors"
              >
                도입 상담 신청 →
              </a>
              <a
                href="#process"
                className="px-6 py-3 text-sm font-medium tracking-wide text-black border border-black/20 hover:border-black/60 transition-colors"
              >
                도입 프로세스 보기
              </a>
            </div>
            <p className="text-xs text-zinc-500 tracking-wide">
              첫 상담 · 진단 워크숍 무료 &nbsp;·&nbsp; 보통 1영업일 이내 회신
            </p>
          </motion.div>
        </div>

        {/* Right: 40% — AI Agent Mock (dark showcase card) */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="rounded-none w-full max-w-sm ml-auto"
            style={{
              background: "#0D0D0D",
              border: "1px solid rgba(0,0,0,0.9)",
              boxShadow: "0 24px 64px rgba(15,10,40,0.18)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-violet-500" />
              </span>
              <span className="text-white text-xs font-medium tracking-wide">AI 에이전트 · 오늘의 업무 보고</span>
              <span className="ml-auto text-[10px] text-zinc-500">오전 6:00</span>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4 text-xs">
              <div className="space-y-2">
                <div className="text-zinc-500 text-[10px] tracking-widest">밤사이 자동으로 처리한 일</div>
                {[
                  { time: "새벽 2:10", task: "어제 매출 · 광고 성과 정리 완료" },
                  { time: "새벽 3:40", task: "품절 위험 상품 2건 미리 발견" },
                  { time: "새벽 5:15", task: "주간 보고서 초안 작성 완료" },
                ].map((item) => (
                  <div key={item.time} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex w-3.5 h-3.5 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-400 text-[9px]">
                      ✓
                    </span>
                    <div className="flex-1 flex justify-between gap-2">
                      <span className="text-zinc-300">{item.task}</span>
                      <span className="text-zinc-600 shrink-0">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="h-px"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              <div
                className="p-3 space-y-1.5"
                style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
              >
                <div className="text-violet-400 text-[10px] tracking-widest">에이전트의 제안 · 확인이 필요해요</div>
                <p className="text-zinc-200 leading-relaxed">
                  광고비가 새는 캠페인을 찾았습니다. 예산을 조정하면{" "}
                  <strong className="text-white">월 약 120만원 절감</strong>이 예상됩니다.
                </p>
                <div className="flex gap-2 pt-1">
                  <span className="px-2.5 py-1 bg-violet-600 text-white text-[10px] font-medium">승인하기</span>
                  <span className="px-2.5 py-1 text-zinc-400 text-[10px]" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                    자세히 보기
                  </span>
                </div>
              </div>

              <p className="text-zinc-600 text-[10px] leading-relaxed">
                에이전트는 담당자의 승인 없이는 실행하지 않습니다 · 다음 점검 오전 9:00
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
