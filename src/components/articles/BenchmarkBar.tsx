"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BenchmarkBarProps {
  label: string;
  score: number;
  maxScore: number;
  color?: string;
  accentColor: string;
}

export default function BenchmarkBar({ label, score, maxScore, color, accentColor }: BenchmarkBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));

  return (
    <div className="mb-4 last:mb-0 w-full" ref={ref}>
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-semibold text-slate-800 font-sans tracking-wide">{label}</span>
        <span className="text-sm font-bold font-sans tracking-tight" style={{ color: color || accentColor }}>{score}</span>
      </div>
      <div className="h-2.5 w-full bg-slate-100/80 rounded-full overflow-hidden flex relative shadow-inner">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: percentage / 100 } : { scaleX: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="h-full rounded-full origin-left transform-gpu"
          style={{ backgroundColor: color || accentColor }}
        />
      </div>
    </div>
  );
}
