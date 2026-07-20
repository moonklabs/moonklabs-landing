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
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-white text-xs font-medium tracking-wide">MOONKLABS AGENT</span>
              <div className="ml-auto flex gap-1">
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4 text-xs font-mono">
              <div className="space-y-2">
                <div className="text-zinc-500 text-[10px] tracking-widest">2026.04.06 · AGENT RUN</div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Pipeline status</span>
                  <span className="text-green-400 font-semibold">+ 12 runs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Latency p95</span>
                  <span className="text-zinc-300">148ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Incidents</span>
                  <span className="text-zinc-400">0</span>
                </div>
              </div>

              <div
                className="h-px"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              <div
                className="p-3 space-y-1"
                style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
              >
                <div className="text-violet-400 text-[10px] tracking-widest font-sans">◆ AGENT DIAGNOSIS</div>
                <p className="text-zinc-300 leading-relaxed">
                  데이터 파이프라인 정상. 추가 조치 불필요.
                </p>
                <p className="text-zinc-500">다음 실행: 05:00 KST</p>
              </div>

              <div className="space-y-1.5">
                <div className="text-zinc-600 text-[10px] tracking-widest">실행 대기</div>
                {["벡터 인덱스 재구축", "주간 리포트 합성", "MCP 툴 상태 점검"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-zinc-500">
                    <div className="w-1 h-1 rounded-full bg-zinc-700" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
