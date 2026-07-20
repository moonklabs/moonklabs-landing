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
      className="py-14 px-6"
      style={{ background: "#FAFAFA", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
        {trustMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="space-y-2"
            style={{ borderLeft: "2px solid rgba(124,58,237,0.45)", paddingLeft: "1.25rem" }}
          >
            <div
              className="text-black font-black"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
            >
              <CountUp value={metric.value} suffix={metric.suffix} start={inView} />
            </div>
            <div className="text-sm text-zinc-700 font-medium">{metric.label}</div>
            <div className="text-xs text-zinc-500">{metric.note}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
