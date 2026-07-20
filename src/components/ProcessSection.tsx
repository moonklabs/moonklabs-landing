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
      className="py-32 px-6"
      style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: sticky heading */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-block text-xs text-violet-600 tracking-widest font-medium"
              >
                HOW WE WORK
              </motion.span>
              <motion.h2
                id="process-heading"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-black text-black"
                style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 0.98 }}
              >
                작게 검증하고,
                <br />
                크게 확장합니다.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-zinc-500 text-base leading-relaxed"
              >
                긴 계약보다 짧은 검증이 먼저입니다. 파일럿에서 수치로 확인된 효과가 있을 때만 다음
                단계로 갑니다.
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                href="#contact"
                className="inline-block px-6 py-3 text-sm font-medium tracking-wide text-white bg-black hover:bg-zinc-800 transition-colors"
              >
                무료 진단 워크숍 신청 →
              </motion.a>
            </div>
          </div>

          {/* Right: steps */}
          <div className="lg:col-span-2">
            <div className="space-y-px" style={{ background: "rgba(0,0,0,0.08)" }}>
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white p-8 lg:p-10 grid grid-cols-[auto_1fr] gap-6 lg:gap-10 items-start"
                >
                  <div
                    className="font-black text-transparent select-none"
                    style={{
                      fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                      lineHeight: 1,
                      WebkitTextStroke: "1.5px rgba(124,58,237,0.5)",
                    }}
                  >
                    {step.step}
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="text-black text-xl font-bold" style={{ letterSpacing: "-0.02em" }}>
                        {step.title}
                      </h3>
                      <span className="text-xs font-mono text-violet-600 px-2 py-0.5" style={{ border: "1px solid rgba(124,58,237,0.3)" }}>
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
      </div>
    </section>
  );
}
