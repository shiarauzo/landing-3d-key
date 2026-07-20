"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

const TEXT =
  "UNIT es una startup de electrónica. Diseñamos objetos en series cortas y numeradas —un teclado con IA, un sable de luz, un auto, un robot— pensados para durar. Cada unidad se produce una vez, lleva su número y no se repite.";

// About — a scroll-driven manifesto. The section is tall; its text is pinned
// in the center while scroll progress lights the words from grey to white.
export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const reduce = useReducedMotion();
  const words = TEXT.split(" ");
  return (
    <section ref={ref} className="relative h-[260vh] bg-[#0c0c0c]">
      <div className="sticky top-0 flex h-screen items-center px-6 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <span className="mb-10 inline-block rounded-md bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-black">
            Manifiesto
          </span>
          <p className="flex flex-wrap text-[6.5vw] font-medium leading-[1.12] tracking-tight text-white sm:text-[3.2vw]">
            {words.map((word, i) => {
              // Reveal all words within the first 82% of scroll, then hold
              // fully-white for the remaining scroll before the section leaves.
              const span = 0.82;
              const start = (i / words.length) * span;
              const end = start + (1 / words.length) * span + 0.06;
              return (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[start, end]}
                  reduce={!!reduce}
                >
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const blur = useTransform(progress, range, [10, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  return (
    <span className="mr-[0.28em] mt-[0.12em]">
      <motion.span
        style={{
          opacity: reduce ? 1 : opacity,
          filter: reduce ? "none" : filter,
          willChange: "filter, opacity",
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
