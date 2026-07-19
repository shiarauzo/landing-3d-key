"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";

const LETTERS = ["U", "N", "I", "T"];
// Letters finish revealing ~1.1s in; hold briefly, then lift away.
const REVEAL_MS = 1750;

export function Splash({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    const t = setTimeout(onDone, REVEAL_MS);
    return () => clearTimeout(t);
  }, [reduce, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex select-none items-center justify-center leading-none">
        {LETTERS.map((letter, i) => (
          <span
            key={letter + i}
            className="inline-block overflow-hidden align-bottom leading-[0.85]"
          >
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                delay: 0.1 + i * 0.09,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block text-[24vw] font-black tracking-tighter"
            >
              {letter}
            </motion.span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
