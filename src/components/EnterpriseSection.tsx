"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { enterpriseItems } from "@/app/site-config";

const principles = ["최소 권한 원칙", "휴먼 리뷰 게이트", "실행 전 승인", "전체 감사 로그", "회귀 방지 평가", "온프레미스 지원"];

export default function EnterpriseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="enterprise"
      ref={ref}
      aria-labelledby="enterprise-heading"
      className="py-28 px-6"
      style={{ borderBottom: "1px solid rgba(28,27,23,0.08)" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2.5rem] px-8 py-16 lg:px-16 lg:py-20 overflow-hidden relative"
          style={{ background: "#191714" }}
        >
          {/* subtle glow */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "-30%",
              right: "-10%",
              width: "560px",
              height: "560px",
              background: "radial-gradient(circle, rgba(124,58,237,0.16) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10">
            <div className="max-w-3xl mb-14 space-y-5">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-block text-[11px] tracking-widest text-violet-300 font-medium px-4 py-1.5 rounded-full"
                style={{ background: "rgba(124,58,237,0.14)", border: "1px solid rgba(124,58,237,0.25)" }}
              >
                ENTERPRISE READY
              </motion.span>
              <motion.h2
                id="enterprise-heading"
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-white"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
              >
                자동화보다 먼저,
                <br />
                통제 가능해야 합니다
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.26, duration: 0.5 }}
                className="text-zinc-400 text-base leading-relaxed"
              >
                기업 환경의 Agent는 잘 동작하는 것만으로 부족합니다. 뭉클랩은 권한, 가드레일, 로그,
                평가까지 통제 구조를 함께 설계합니다.
              </motion.p>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {enterpriseItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl p-7 space-y-3 transition-colors duration-300 hover:bg-white/[0.07]"
                  style={{ background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <h3 className="text-white text-lg font-semibold" style={{ letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Principle chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-2.5"
            >
              {principles.map((p) => (
                <span
                  key={p}
                  className="text-[12px] text-zinc-300 px-3.5 py-1.5 rounded-full"
                  style={{ border: "1px solid rgba(255,255,255,0.14)" }}
                >
                  {p}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
