"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function JangsawangSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="work"
      ref={ref}
      className="py-28 px-6"
      style={{ borderBottom: "1px solid rgba(28,27,23,0.08)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left: description */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span
              className="inline-block text-[11px] tracking-widest text-amber-700 font-medium px-3.5 py-1.5 rounded-full"
              style={{ background: "rgba(217,119,6,0.08)" }}
            >
              SELLERKING · 커머스 운영용
            </span>
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(2.1rem, 4vw, 3.2rem)", letterSpacing: "-0.02em", lineHeight: 1.18, color: "#1C1B17" }}
            >
              커머스 운영을
              <br />
              지켜보는 에이전트
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-zinc-600 text-[15px] leading-relaxed max-w-xl"
          >
            Sellerking은 광고와 재고 운영처럼 숫자를 놓치면 바로 손실로 이어지는 업무를 위해 만든
            Agent 제품군입니다. 뭉클랩은 이커머스 현장에서 Agent가 실제 운영 신호를 어떻게 읽고 어떤
            타이밍에 사람에게 판단을 넘겨야 하는지 직접 설계해왔습니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full bg-white hover:-translate-y-0.5 transition-all"
              style={{ border: "1px solid rgba(28,27,23,0.14)", color: "#1C1B17" }}
            >
              자세히 이야기하기 →
            </a>
          </motion.div>
        </div>

        {/* Right: tinted panel with light agent card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl p-6 lg:p-10"
          style={{ background: "rgba(217,119,6,0.06)" }}
        >
          <div
            className="w-full rounded-2xl overflow-hidden bg-white"
            style={{
              border: "1px solid rgba(28,27,23,0.08)",
              boxShadow: "0 24px 56px rgba(28,27,23,0.12)",
            }}
          >
            <div
              className="flex items-center gap-2.5 px-5 py-4"
              style={{ borderBottom: "1px solid rgba(28,27,23,0.06)" }}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-50 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-amber-500" />
              </span>
              <span className="text-sm font-semibold" style={{ color: "#1C1B17" }}>
                커머스 에이전트 · 오늘 하루
              </span>
              <span className="ml-auto text-[11px] text-zinc-400">24시간 감시 중</span>
            </div>
            <div className="p-5 space-y-4 text-[13px]">
              <div className="space-y-2.5">
                <div className="text-[11px] text-zinc-400 tracking-wide">지금까지 확인한 것</div>
                {[
                  { task: "쇼핑몰 정산 데이터 정리", state: "완료", tone: "text-green-600 bg-green-50" },
                  { task: "광고 성과 9,412건 점검", state: "완료", tone: "text-green-600 bg-green-50" },
                  { task: "광고 예산 최적화", state: "진행 중", tone: "text-amber-700 bg-amber-50" },
                ].map((item) => (
                  <div key={item.task} className="flex items-center justify-between gap-3">
                    <span className="text-zinc-700">{item.task}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${item.tone}`}>
                      {item.state}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px" style={{ background: "rgba(28,27,23,0.06)" }} />

              <div
                className="rounded-xl p-4 space-y-2"
                style={{ background: "rgba(217,119,6,0.06)", border: "1px solid rgba(217,119,6,0.18)" }}
              >
                <div className="text-amber-700 text-[11px] font-medium tracking-wide">
                  에이전트의 발견 · 확인이 필요해요
                </div>
                <p className="text-zinc-700 leading-relaxed">
                  다음 주 <strong style={{ color: "#1C1B17" }}>품절 예상 상품 2건</strong>을 발견했습니다.
                  지금 발주하면 품절 없이 넘어갈 수 있어요.
                </p>
                <div className="flex gap-2 pt-0.5">
                  <span className="px-3 py-1.5 rounded-full text-white text-[11px] font-medium" style={{ background: "#B45309" }}>
                    발주 검토하기
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-full text-zinc-500 text-[11px]"
                    style={{ border: "1px solid rgba(28,27,23,0.12)" }}
                  >
                    나중에
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400">품절 · 과재고 · 광고 비효율을 사람보다 먼저 발견합니다</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
