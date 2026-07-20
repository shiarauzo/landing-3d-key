"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

// A custom cursor: a small white ball that trails the mouse and grows a bit
// over interactive elements. Kept small so it never swallows whole words
// (mix-blend-difference just inverts the little patch underneath).
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    // No custom cursor on touch devices — there is no pointer to augment.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor]",
      );
      setHover(!!target);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  // Reduced motion: follow instantly, no springy lag.
  const px = reduce ? x : springX;
  const py = reduce ? y : springY;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden mix-blend-difference md:block"
      style={{ x: px, y: py }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: hover ? 22 : 10,
          height: hover ? 22 : 10,
          x: hover ? -11 : -5,
          y: hover ? -11 : -5,
        }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 300, damping: 25 }
        }
      />
    </motion.div>
  );
}
