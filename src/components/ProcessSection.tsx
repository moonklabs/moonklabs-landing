"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/app/site-config";

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      ref={ref}
      aria-labelledby="process-heading"
      className="py-28 px-6"
      style={{ borderBottom: "1px solid rgba(28,27,23,0.08)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left: sticky heading */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-32 space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-xs tracking-widest text-violet-700 font-medium px-4 py-1.5 rounded-full"
              style={{ background: "rgba(124,58,237,0.07)" }}
            >
              HOW WE WORK
            </motion.span>
            <motion.h2
              id="process-heading"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "#1C1B17" }}
            >
              작게 검증하고,
              <br />
              크게 확장합니다
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-zinc-500 text-[15px] leading-relaxed"
            >
              긴 계약보다 짧은 검증이 먼저입니다. 파일럿에서 수치로 확인된 효과가 있을 때만 다음
              단계로 갑니다.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              href="#contact"
              className="inline-block px-7 py-3.5 rounded-full text-sm font-medium text-white hover:opacity-85 hover:-translate-y-0.5 transition-all"
              style={{ background: "#1C1B17" }}
            >
              무료 진단 워크숍 신청 →
            </motion.a>
          </div>
        </div>

        {/* Right: timeline */}
        <div className="lg:col-span-2 relative">
          {/* Animated vertical line */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[19px] top-4 bottom-4 w-px origin-top"
            style={{ background: "linear-gradient(to bottom, rgba(124,58,237,0.5), rgba(124,58,237,0.08))" }}
          />
          <div className="space-y-5">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 26 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-16"
              >
                {/* Number circle */}
                <div
                  className="absolute left-0 top-6 flex w-10 h-10 items-center justify-center rounded-full bg-white font-display font-bold text-sm text-violet-700"
                  style={{ border: "1px solid rgba(124,58,237,0.25)", boxShadow: "0 4px 14px rgba(124,58,237,0.10)" }}
                >
                  {i + 1}
                </div>
                <div
                  className="bg-white rounded-2xl p-7 space-y-2 transition-all duration-300 hover:-translate-y-1"
                  style={{ border: "1px solid rgba(28,27,23,0.08)", boxShadow: "0 2px 10px rgba(28,27,23,0.03)" }}
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-xl font-bold" style={{ letterSpacing: "-0.01em", color: "#1C1B17" }}>
                      {step.title}
                    </h3>
                    <span
                      className="text-[11px] text-violet-700 font-medium px-2.5 py-0.5 rounded-full"
                      style={{ background: "rgba(124,58,237,0.07)" }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
