"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";

const Experience = dynamic(() => import("../hero3d/Experience"), { ssr: false });

const EASE = [0.23, 1, 0.32, 1] as const;
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// [01] Hero — a 3D white wireframe hand that follows the cursor, with the
// title, description and a single Reservar CTA revealing after the splash.
export function Hero() {
  return (
    <section className="relative flex h-screen flex-col overflow-hidden bg-[#050505]">
      {/* center light lift behind the hand */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(circle at 50% 40%, #0d0d0f 0%, #050505 58%)" }}
      />

      {/* 3D scene */}
      <motion.div
        className="absolute inset-0 z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.6, ease: EASE }}
      >
        <Experience />
      </motion.div>

      {/* vignette + grain for material/depth */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: "radial-gradient(ellipse 72% 62% at 50% 44%, transparent 45%, rgba(0,0,0,0.55) 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.045] mix-blend-soft-light"
        style={{ backgroundImage: NOISE }}
      />

      {/* Content */}
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-end px-6 pb-[13vh] text-center">
        <span className="block overflow-hidden">
          <motion.h1
            className="text-6xl font-medium tracking-tight text-[#f2f2f0] sm:text-8xl"
            initial={{ y: "110%", filter: "blur(10px)" }}
            animate={{ y: "0%", filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 2.0, ease: EASE }}
          >
            UNIT
          </motion.h1>
        </span>

        <motion.p
          className="mt-5 max-w-sm text-sm leading-relaxed text-[#f2f2f0]/55"
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 2.5, ease: EASE }}
        >
          Electrónica en ediciones numeradas. Series cortas, cada unidad hecha
          una vez y numerada.
        </motion.p>

        <motion.a
          href="#reserva"
          className="group pointer-events-auto relative mt-9 overflow-hidden rounded-md border border-[#f2f2f0]/25 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.16em]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.9, ease: [0.32, 0.72, 0, 1] }}
        >
          <span
            className="absolute inset-0 translate-y-full bg-[#f2f2f0] transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0"
            aria-hidden
          />
          <span className="relative text-[#f2f2f0] transition-colors duration-300 group-hover:text-[#050505]">
            Reservar
          </span>
        </motion.a>
      </div>
    </section>
  );
}
