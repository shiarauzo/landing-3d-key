"use client";

import { motion, useReducedMotion } from "motion/react";

// Infinite horizontal marquee. Duplicates its text and translates -50%
// on a loop so the seam is invisible. Holds still under reduced motion.
export function Marquee({
  text,
  className = "",
  duration = 18,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const items = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="flex shrink-0"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {items.map((i) => (
          <span key={i} className="px-6">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
