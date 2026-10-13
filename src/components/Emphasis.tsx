"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// 강조할 단어 밑에 손으로 그은 듯한 밑줄이 스크롤로 진입할 때 그려진다.
export default function Emphasis({ children, className = "text-violet-700" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg aria-hidden viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute left-0 right-0 -bottom-[0.12em] h-[0.28em] w-full overflow-visible">
        <motion.path
          d="M3 9C40 3 90 12 197 4"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </span>
  );
}
