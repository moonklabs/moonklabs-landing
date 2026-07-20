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
      className="py-32 px-6"
      style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs text-violet-600 tracking-widest font-medium"
          >
            WHO WE HELP
          </motion.span>
          <motion.h2
            id="solutions-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-black text-black"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 0.98 }}
          >
            반복 업무는 Agent에게,
            <br />
            판단은 사람에게.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-zinc-500 text-base leading-relaxed"
          >
            뭉클랩은 자사 제품을 직접 운영하며 검증한 방식으로, 조직마다 다른 업무 구조에 맞는 Agent
            자동화를 설계합니다.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: "rgba(0,0,0,0.08)" }}>
          {audienceTracks.map((track, i) => (
            <motion.a
              key={track.title}
              href={track.href}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white p-8 lg:p-10 flex flex-col gap-6 hover:bg-zinc-50 transition-colors"
            >
              <div className="space-y-3">
                <span className="text-[10px] text-violet-600 tracking-widest font-medium">{track.tag}</span>
                <h3 className="text-black text-2xl font-bold" style={{ letterSpacing: "-0.02em" }}>
                  {track.title}
                </h3>
              </div>

              <div className="space-y-4 flex-1">
                <p className="text-sm text-zinc-500 leading-relaxed">
                  <span className="text-zinc-400 text-[10px] tracking-widest block mb-1.5">PROBLEM</span>
                  {track.pain}
                </p>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  <span className="text-violet-600 text-[10px] tracking-widest block mb-1.5">OUR APPROACH</span>
                  {track.solution}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <span className="text-xs font-mono text-zinc-400">{track.product}</span>
                <span className="text-sm text-black opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
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
