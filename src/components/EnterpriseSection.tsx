"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { enterpriseItems } from "@/app/site-config";

export default function EnterpriseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="enterprise"
      ref={ref}
      aria-labelledby="enterprise-heading"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#000", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Background ghost text */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-black leading-none"
        style={{
          fontSize: "16rem",
          color: "rgba(255,255,255,0.03)",
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
        }}
      >
        TRUST
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs text-violet-400 tracking-widest"
          >
            ENTERPRISE READY
          </motion.span>
          <motion.h2
            id="enterprise-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-white font-black"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 0.98 }}
          >
            자동화보다 먼저,
            <br />
            통제 가능해야 합니다.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-zinc-400 text-base leading-relaxed"
          >
            기업 환경의 Agent는 잘 동작하는 것만으로 부족합니다. 뭉클랩은 권한, 가드레일, 로그,
            평가까지 통제 구조를 함께 설계합니다.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.08)" }}>
          {enterpriseItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 lg:p-10 space-y-3"
              style={{ background: "#0A0A0A" }}
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-violet-500 inline-block" />
                <h3 className="text-white text-lg font-semibold" style={{ letterSpacing: "-0.01em" }}>
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
