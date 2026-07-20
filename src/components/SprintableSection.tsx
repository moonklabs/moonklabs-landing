"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  "역할별 AI Agent 생성 및 조율",
  "스프린트 계획 · 실행 · 검증 · 문서화 자동화",
  "MCP 기반 도구 연결과 실행 흐름 통합",
  "평가 하네스 · 회귀 방지 · 휴먼 리뷰 가드레일",
  "개발 조직에서 먼저 검증 후 다른 기능 조직으로 확장",
  "엔터프라이즈 환경에 맞는 운영 구조 설계",
];

const codeLines = [
  { type: "comment", text: "// sprintable_workflow.ts" },
  { type: "blank", text: "" },
  { type: "code", text: "const agent = defineAgent({" },
  { type: "code", text: "  model: routeLLM('sonnet'|'opus')," },
  { type: "code", text: "  tools: mcp.catalog(60)," },
  { type: "code", text: "  evals: regressionSuite," },
  { type: "code", text: "});" },
  { type: "blank", text: "" },
  { type: "code", text: "await agent.run(" },
  { type: "string", text: '  "스펙 리뷰 및 PR 생성"' },
  { type: "code", text: ");" },
  { type: "blank", text: "" },
  { type: "output", text: "> 스펙 검증 통과" },
  { type: "output", text: "> PR #482 초안 생성" },
  { type: "output", text: "> 리뷰어 배정 완료" },
];

const typeColors: Record<string, string> = {
  comment: "#6b7280",
  blank: "transparent",
  code: "#e2e8f0",
  string: "#86efac",
  output: "#a78bfa",
};

export default function SprintableSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="products"
      ref={ref}
      className="py-28 px-6"
      style={{ borderBottom: "1px solid rgba(28,27,23,0.08)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left: tinted panel with code editor */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1 rounded-3xl p-6 lg:p-10"
          style={{ background: "rgba(124,58,237,0.06)" }}
        >
          <div
            className="font-mono text-xs rounded-2xl overflow-hidden"
            style={{
              background: "#141317",
              boxShadow: "0 24px 56px rgba(28,27,23,0.18)",
            }}
          >
            {/* Editor header */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="ml-2 text-zinc-500 text-[10px] tracking-wide">engineering_agent.ts</span>
            </div>

            {/* Code */}
            <div className="p-5 space-y-0.5">
              {codeLines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-6 text-zinc-600 text-[10px] select-none shrink-0 pt-0.5">
                    {line.type !== "blank" ? i + 1 : ""}
                  </span>
                  <span style={{ color: typeColors[line.type] }} className="leading-relaxed">
                    {line.text || " "}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: description */}
        <div className="order-1 lg:order-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span
              className="inline-block text-[11px] tracking-widest text-violet-700 font-medium px-3.5 py-1.5 rounded-full"
              style={{ background: "rgba(124,58,237,0.07)" }}
            >
              SPRINTABLE · 개발 조직용
            </span>
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(2.1rem, 4vw, 3.2rem)", letterSpacing: "-0.02em", lineHeight: 1.18, color: "#1C1B17" }}
            >
              엔지니어링 팀을
              <br />
              증폭시키는 에이전트
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-zinc-600 text-[15px] leading-relaxed"
          >
            Sprintable은 역할별 AI Agent를 생성·조율해 스프린트 계획, 실행, 검증, 문서화 같은 개발
            조직의 반복 업무를 구조적으로 자동화하는 시스템입니다. 개발팀 내부 사용 경험을 바탕으로
            마케팅, 운영, PM 등 다른 기능 조직으로 확장할 준비를 하고 있습니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-2.5"
          >
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                <span className="mt-0.5 flex w-4 h-4 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 text-[9px]">
                  ✓
                </span>
                {feature}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
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
      </div>
    </section>
  );
}
