"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

// Smooth momentum scrolling, the backbone of the whole feel. Disabled entirely
// when the user prefers reduced motion — the page falls back to native scroll.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}
