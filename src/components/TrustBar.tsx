"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { trustMetrics } from "@/app/site-config";

function CountUp({ value, suffix, start }: { value: number; suffix: string; start: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("ko-KR"));

  useEffect(() => {
    if (!start) return;
    const controls = animate(count, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [start, count, value]);

  return (
    <span className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      <span className="text-violet-600">{suffix}</span>
    </span>
  );
}

export default function TrustBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="뭉클랩 운영 지표"
      className="py-20 px-6"
      style={{ borderBottom: "1px solid rgba(28,27,23,0.08)" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-xs text-zinc-400 tracking-widest mb-12"
        >
          자사 제품을 직접 운영하며 검증한 숫자입니다
        </motion.p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {trustMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-center space-y-2"
            >
              <div
                className="font-display text-ink font-bold"
                style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)", letterSpacing: "-0.02em", lineHeight: 1, color: "#1C1B17" }}
              >
                <CountUp value={metric.value} suffix={metric.suffix} start={inView} />
              </div>
              <div className="text-sm text-zinc-700 font-medium">{metric.label}</div>
              <div className="text-xs text-zinc-400">{metric.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
