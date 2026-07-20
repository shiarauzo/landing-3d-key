"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

// A custom cursor: a small dot that trails the mouse and expands into a hollow
// ring over interactive elements. The ring is transparent so it never covers
// or inverts the content underneath.
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
        className="rounded-full border border-white"
        animate={{
          width: hover ? 44 : 10,
          height: hover ? 44 : 10,
          x: hover ? -22 : -5,
          y: hover ? -22 : -5,
          backgroundColor: hover ? "rgba(255,255,255,0)" : "rgb(255,255,255)",
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
