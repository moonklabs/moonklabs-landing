"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  margin = "-80px",
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** Shrinks (negative) or grows the viewport used to decide when to reveal. Use "0px" for rows that peek in from the side. */
  margin?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
