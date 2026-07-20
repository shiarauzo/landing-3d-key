"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useState } from "react";
import { products } from "@/lib/products";
import { SectionHeader } from "../SectionHeader";

// [03/09] Unidades — the numbered product index. Hovering a unit lights it up
// and floats its preview card next to the cursor.
export function PoolRules() {
  const [active, setActive] = useState<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 28, mass: 0.6 });
  const y = useSpring(my, { stiffness: 300, damping: 28, mass: 0.6 });

  const current = active !== null ? products[active] : null;

  return (
    <section
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      className="relative bg-[#0c0c0c] px-6 pt-6 sm:px-8"
    >
      {/* Intro */}
      <p className="mx-auto max-w-2xl py-24 text-center text-lg leading-relaxed text-white/45">
        Este es el índice completo de UNIT. Cuatro unidades, cada una con su
        número y su serie. Pasa el cursor por encima para verlas. Cuando abramos
        la reserva, la lista de espera entra primero — en orden de llegada.
      </p>

      <SectionHeader index="03" name="Unidades" />

      <ul
        onMouseLeave={() => setActive(null)}
        className="mt-8 rounded-t-[2rem] bg-[#161616] px-6 py-4 sm:px-10"
      >
        {products.map((p, i) => {
          const isActive = active === i;
          const dimmed = active !== null && !isActive;
          return (
            <li key={p.n}>
              <a
                href="#reserva"
                onMouseEnter={() => setActive(i)}
                data-cursor="reservar"
                className="flex items-baseline gap-4 border-b border-white/10 py-5 font-mono uppercase tracking-tight transition-all duration-300 sm:gap-8 sm:py-6"
                style={{ opacity: dimmed ? 0.3 : 1 }}
              >
                <span
                  className="text-base transition-colors duration-300 sm:text-2xl"
                  style={{ color: isActive ? "#4d7cff" : "rgba(255,255,255,0.4)" }}
                >
                  {p.n}.
                </span>
                <span
                  className="flex-1 text-2xl transition-colors duration-300 sm:text-4xl"
                  style={{
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {p.name}
                  <span className="ml-4 text-sm tracking-widest text-white/30">
                    {p.category}
                  </span>
                </span>
                <span className="hidden shrink-0 text-xs tracking-widest text-white/35 sm:inline">
                  {p.status}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Floating product card that trails the cursor */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden sm:block"
      >
        <AnimatePresence>
          {current && (
            <motion.div
              key={current.n}
              initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -5 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative -ml-24 -mt-32 h-64 w-52 overflow-hidden rounded-xl border border-white/10 shadow-2xl"
              style={{
                background: `linear-gradient(150deg, ${current.tint[0]}, ${current.tint[1]})`,
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-between p-5 font-mono">
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
