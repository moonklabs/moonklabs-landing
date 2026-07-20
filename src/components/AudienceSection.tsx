"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { audienceTracks } from "@/app/site-config";

export default function AudienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="solutions"
      ref={ref}
      aria-labelledby="solutions-heading"
      className="py-28 px-6"
      style={{ borderBottom: "1px solid rgba(28,27,23,0.08)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs tracking-widest text-violet-700 font-medium px-4 py-1.5 rounded-full"
            style={{ background: "rgba(124,58,237,0.07)" }}
          >
            WHO WE HELP
          </motion.span>
          <motion.h2
            id="solutions-heading"
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold"
            style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "#1C1B17" }}
          >
            조직마다 다른 업무 구조에
            <br />
            맞는 자동화를 설계합니다
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-zinc-500 text-base leading-relaxed"
          >
            뭉클랩은 자사 제품을 직접 운영하며 검증한 방식으로 시작합니다.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {audienceTracks.map((track, i) => (
            <motion.a
              key={track.title}
              href={track.href}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1.5"
              style={{
                border: "1px solid rgba(28,27,23,0.08)",
                boxShadow: "0 2px 10px rgba(28,27,23,0.03)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px rgba(28,27,23,0.10)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(28,27,23,0.03)";
              }}
            >
              <div className="space-y-3">
                <span
                  className="inline-block text-[10px] tracking-widest text-violet-700 font-medium px-3 py-1 rounded-full"
                  style={{ background: "rgba(124,58,237,0.07)" }}
                >
                  {track.tag}
                </span>
                <h3 className="font-display text-2xl font-bold" style={{ letterSpacing: "-0.01em", color: "#1C1B17" }}>
                  {track.title}
                </h3>
              </div>

              <div className="space-y-4 flex-1">
                <p className="text-sm text-zinc-500 leading-relaxed">
                  <span className="text-zinc-400 text-[10px] tracking-widest block mb-1.5">이런 문제가 있다면</span>
                  {track.pain}
                </p>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  <span className="text-violet-700 text-[10px] tracking-widest block mb-1.5">뭉클랩의 방식</span>
                  {track.solution}
                </p>
              </div>

              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid rgba(28,27,23,0.06)" }}
              >
                <span className="text-xs text-zinc-400 font-medium">{track.product}</span>
                <span className="text-sm text-ink opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{ color: "#1C1B17" }}>
                  →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
