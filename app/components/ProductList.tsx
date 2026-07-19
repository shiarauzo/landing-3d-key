"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useState } from "react";
import { products } from "@/lib/products";
import { Sparkles } from "./Sparkles";

export function ProductList() {
  const [active, setActive] = useState<number | null>(null);

  // Cursor position, smoothed so the floating preview trails the mouse.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 350, damping: 30, mass: 0.5 });
  const y = useSpring(my, { stiffness: 350, damping: 30, mass: 0.5 });

  function handleMove(e: React.MouseEvent) {
    mx.set(e.clientX);
    my.set(e.clientY);
  }

  const current = active !== null ? products[active] : null;

  return (
    <section
      id="catalogo"
      onMouseMove={handleMove}
      className="relative z-10 mx-auto w-full max-w-5xl px-6"
    >
      <header className="tnum mb-2 flex items-baseline justify-between text-xs uppercase tracking-[0.2em] text-muted">
        <span>[ Catálogo ]</span>
        <span>{String(products.length).padStart(3, "0")} unidades</span>
      </header>

      <ul onMouseLeave={() => setActive(null)}>
        {products.map((p, i) => {
          const isActive = active === i;
          const dimmed = active !== null && !isActive;
          return (
            <li key={p.n}>
              <a
                href="#waitlist"
                onMouseEnter={() => setActive(i)}
                className="tnum group flex items-center gap-4 border-b border-line py-6 uppercase tracking-tight transition-all duration-300 sm:gap-8 sm:py-7"
                style={{ opacity: dimmed ? 0.35 : 1 }}
              >
                <span
                  className="text-lg font-medium transition-colors duration-300 sm:text-2xl"
                  style={{ color: isActive ? "var(--accent)" : "var(--muted)" }}
                >
                  {p.n}
                  <span style={{ color: isActive ? "var(--accent)" : "inherit" }}>
                    .
                  </span>
                </span>

                <span
                  className="flex-1 text-2xl font-medium transition-colors duration-300 sm:text-4xl"
                  style={{ color: isActive ? "var(--foreground)" : "var(--muted)" }}
                >
                  {p.name}
                  <span className="ml-3 text-sm tracking-widest text-muted sm:ml-4">
                    {p.category}
                  </span>
                </span>

                <span className="hidden shrink-0 text-xs tracking-widest text-muted sm:inline">
                  {p.status}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Floating preview that trails the cursor */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden sm:block"
      >
        <AnimatePresence>
          {current && (
            <motion.div
              key={current.n}
              initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative -ml-20 -mt-28 h-56 w-72 overflow-hidden rounded-xl border border-white/10"
              style={{
                background: `linear-gradient(150deg, ${current.tint[0]}, ${current.tint[1]})`,
                boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7)",
              }}
            >
              <Sparkles />
              <div className="tnum absolute inset-0 flex flex-col justify-between p-5">
                <span className="text-xs uppercase tracking-widest text-white/70">
                  {current.category}
                </span>
                <div>
                  <div className="text-5xl font-light text-white/90">
                    {current.n}
                  </div>
                  <div className="text-lg font-medium uppercase text-white">
                    {current.name}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
