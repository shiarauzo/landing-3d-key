"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import { useState } from "react";
import { Marquee } from "../Marquee";

const VW = 1440;
const VH = 800;
const STEP = 40;
const cols = VW / STEP;
const rows = VH / STEP;

// Wordmark on the grid — every edge lands on a 40px grid line, letters are
// outlined (hollow) so the grid reads straight through them.
const CAP = 270;
const BASE = 630;

// Geometric letters as grid-aligned primitives (rects + one diagonal per N).
const LETTERS: Array<
  | { t: "rect"; x: number; y: number; w: number; h: number }
  | { t: "poly"; pts: number[][] }
> = [
  // U (squared staple)
  {
    t: "poly",
    pts: [
      [400, 270], [400, 630], [560, 630], [560, 270],
      [520, 270], [520, 590], [440, 590], [440, 270],
    ],
  },
  // N (single contour — left bar, diagonal, right bar)
  {
    t: "poly",
    pts: [
      [600, 630], [600, 270], [640, 270], [760, 630],
      [760, 270], [720, 270], [640, 630],
    ],
  },
  // I
  { t: "rect", x: 800, y: 270, w: 40, h: 360 },
  // T (single contour — bar + stem)
  {
    t: "poly",
    pts: [
      [880, 270], [1000, 270], [1000, 310], [960, 310],
      [960, 630], [920, 630], [920, 310], [880, 310],
    ],
  },
];
const WM_L = 400;
const WM_R = 1000;
const stemGuides = [400, 560, 600, 760, 800, 840, 880, 1000];

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = { hidden: {}, visible: {} };
const gridWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.008, delayChildren: 0.05 } },
};
const gridLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};
const guide: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: EASE_OUT, delay: 0.6 } },
};
const letter: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.3, ease: EASE_OUT, delay: 1.2 },
  },
};
const late: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, delay: 2.1 } },
};

// [01/08] Hero — a construction plane. The UNIT wordmark is a geometric outline
// snapped to the grid: hollow letters with square joins, the grid reads through.
export function Hero() {
  const reduce = useReducedMotion();

  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const cxRaw = useMotionValue(-100);
  const cyRaw = useMotionValue(-100);
  const cx = useSpring(cxRaw, { stiffness: 400, damping: 34 });
  const cy = useSpring(cyRaw, { stiffness: 400, damping: 34 });
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [hot, setHot] = useState(false);

  function handleMove(e: React.MouseEvent) {
    if (reduce) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    px.set((e.clientX / w - 0.5) * 18);
    py.set((e.clientY / h - 0.5) * 18);
    cxRaw.set(e.clientX);
    cyRaw.set(e.clientY);
    setCoord({
      x: Math.round((e.clientX / w) * cols),
      y: Math.round((e.clientY / h) * rows),
    });
  }

  const minor = "rgba(255,255,255,0.05)";
  const major = "rgba(255,255,255,0.12)";
  const guideCol = "rgba(255,255,255,0.2)";
  const accent = "rgba(255,255,255,0.5)";
  const start = reduce ? "visible" : "hidden";
  const strokeCol = hot ? "#fff" : "rgba(255,255,255,0.9)";

  return (
    <section
      onMouseMove={handleMove}
      className="relative flex h-screen flex-col justify-end overflow-hidden bg-[#060608]"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.svg
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMid slice"
          className="h-[108%] w-[108%]"
          style={{ x: px, y: py }}
          initial={start}
          animate="visible"
          variants={container}
        >
          {/* Grid */}
          <motion.g variants={gridWrap}>
            {Array.from({ length: cols + 1 }, (_, i) => (
              <motion.line
                key={`v${i}`}
                x1={i * STEP}
                y1={0}
                x2={i * STEP}
                y2={VH}
                stroke={i % 5 === 0 ? major : minor}
                variants={gridLine}
              />
            ))}
            {Array.from({ length: rows + 1 }, (_, i) => (
              <motion.line
                key={`h${i}`}
                x1={0}
                y1={i * STEP}
                x2={VW}
                y2={i * STEP}
                stroke={i % 5 === 0 ? major : minor}
                variants={gridLine}
              />
            ))}
          </motion.g>

          {/* Construction guides */}
          <motion.g variants={container} fill="none" stroke={guideCol} strokeWidth={1}>
            <motion.line x1={340} y1={CAP} x2={1060} y2={CAP} variants={guide} />
            <motion.line x1={340} y1={BASE} x2={1060} y2={BASE} variants={guide} />
            {stemGuides.map((x) => (
              <motion.line
                key={x}
                x1={x}
                y1={CAP - 60}
                x2={x}
                y2={BASE + 60}
                strokeDasharray="3 6"
                variants={guide}
              />
            ))}
          </motion.g>

          {/* The wordmark — geometric outline, hollow, grid reads through */}
          <motion.g
            variants={container}
            fill="none"
            stroke={strokeCol}
            strokeWidth={3}
            strokeLinejoin="miter"
            strokeLinecap="butt"
            style={{ transition: "stroke 240ms ease" }}
          >
            {LETTERS.map((s, i) =>
              s.t === "rect" ? (
                <motion.rect
                  key={i}
                  x={s.x}
                  y={s.y}
                  width={s.w}
                  height={s.h}
                  variants={letter}
                />
              ) : (
                <motion.polygon
                  key={i}
                  points={s.pts.map((p) => p.join(",")).join(" ")}
                  variants={letter}
                />
              ),
            )}
          </motion.g>

          {/* Dimension = edition + tagline */}
          <motion.g variants={late}>
            <g stroke={accent} strokeWidth={1.2}>
              <line x1={WM_L} y1={CAP - 60} x2={WM_R} y2={CAP - 60} />
              <line x1={WM_L} y1={CAP - 66} x2={WM_L} y2={CAP - 54} />
              <line x1={WM_R} y1={CAP - 66} x2={WM_R} y2={CAP - 54} />
            </g>
            <text
              x={(WM_L + WM_R) / 2}
              y={CAP - 72}
              textAnchor="middle"
              fill={accent}
              fontSize={14}
              letterSpacing={2}
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              UNIT · 001
            </text>
            <text
              x={(WM_L + WM_R) / 2}
              y={BASE + 64}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize={19}
              letterSpacing={7}
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              ELECTRÓNICA EN EDICIONES NUMERADAS
            </text>
          </motion.g>

          {/* Hover hit area */}
          <rect
            x={WM_L - 40}
            y={CAP - 40}
            width={WM_R - WM_L + 80}
            height={BASE - CAP + 80}
            fill="transparent"
            onMouseEnter={() => setHot(true)}
            onMouseLeave={() => setHot(false)}
          />
        </motion.svg>
      </div>

      {/* Grain + vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 45%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Coordinate crosshair */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 z-[5] hidden md:block">
          <motion.div className="absolute top-0 h-full w-px bg-white/10" style={{ x: cx }} />
          <motion.div className="absolute left-0 h-px w-full bg-white/10" style={{ y: cy }} />
          <motion.div
            className="absolute font-mono text-[10px] uppercase tracking-widest text-white/40"
            style={{ x: cx, y: cy }}
          >
            <span className="ml-3 mt-2 inline-block">
              X{String(coord.x).padStart(2, "0")} · Y{String(coord.y).padStart(2, "0")}
            </span>
          </motion.div>
        </div>
      )}

      {/* Bottom marquee */}
      <div className="relative z-10 border-y border-white/15 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
        <Marquee text="UNIT 001  ✦  Próximamente  ✦  Serie corta  ✦  " duration={22} />
      </div>
    </section>
  );
}
