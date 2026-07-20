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

// Wordmark geometry — a monoline UNIT literally constructed from these values.
const CAP = 240; // cap line
const BASE = 560; // baseline
const W = 40; // stem weight
// U is defined by a real circle: its bowl is the lower half of this circle.
const U = { xL: 330, xR: 490, r: 80, cy: 480, cx: 410 };
const N = { xL: 590, xR: 750 };
const I = { x: 850 };
const T = { xL: 950, xR: 1110, cx: 1030 };
const stemX = [U.xL, U.xR, N.xL, N.xR, I.x, T.xL, T.cx, T.xR];

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
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: EASE_OUT, delay: 1.25 } },
};
const late: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, delay: 2.1 } },
};

// [01/08] Hero — a construction plane that actually builds the UNIT wordmark:
// a guide circle defines the U's bowl, cap/baseline and stem guides define the
// rest, and the monoline letters trace themselves along that construction.
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
  const guideCol = "rgba(255,255,255,0.22)";
  const accent = "#4d7cff";
  const start = reduce ? "visible" : "hidden";

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

          {/* Construction guides that DEFINE the wordmark */}
          <motion.g variants={container} fill="none" stroke={guideCol} strokeWidth={1}>
            {/* cap line + baseline */}
            <motion.line x1={200} y1={CAP} x2={1240} y2={CAP} variants={guide} />
            <motion.line x1={200} y1={BASE} x2={1240} y2={BASE} variants={guide} />
            {/* stem edge guides */}
            {stemX.map((x) => (
              <motion.line key={x} x1={x} y1={180} x2={x} y2={620} variants={guide} strokeDasharray="3 5" />
            ))}
            {/* the circle that defines the U bowl */}
            <motion.circle cx={U.cx} cy={U.cy} r={U.r} variants={guide} />
          </motion.g>

          {/* The monoline UNIT, traced along the construction */}
          <motion.g
            variants={container}
            fill="none"
            stroke={hot ? "#fff" : "rgba(255,255,255,0.92)"}
            strokeWidth={W}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "stroke 240ms ease" }}
          >
            <motion.path
              d={`M ${U.xL} ${CAP} L ${U.xL} ${U.cy} A ${U.r} ${U.r} 0 0 0 ${U.xR} ${U.cy} L ${U.xR} ${CAP}`}
              variants={letter}
            />
            <motion.path
              d={`M ${N.xL} ${BASE} L ${N.xL} ${CAP} L ${N.xR} ${BASE} L ${N.xR} ${CAP}`}
              variants={letter}
            />
            <motion.path d={`M ${I.x} ${CAP} L ${I.x} ${BASE}`} variants={letter} />
            <motion.path d={`M ${T.xL} ${CAP} L ${T.xR} ${CAP}`} variants={letter} />
            <motion.path d={`M ${T.cx} ${CAP} L ${T.cx} ${BASE}`} variants={letter} />
          </motion.g>

          {/* Tangent + center marks, radius, dimension, tagline (fade last) */}
          <motion.g variants={late}>
            {/* U circle center + radius, annotated */}
            <circle cx={U.cx} cy={U.cy} r={3.5} fill={accent} />
            <line x1={U.cx} y1={U.cy} x2={U.cx} y2={BASE} stroke={accent} strokeWidth={1} />
            <text
              x={U.cx + 10}
              y={U.cy + 46}
              fill={accent}
              fontSize={14}
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              R{U.r}
            </text>
            {/* tangent points */}
            {[[U.xL, U.cy], [U.xR, U.cy], [U.cx, BASE]].map(([tx, ty], i) => (
              <circle key={i} cx={tx} cy={ty} r={3} fill="none" stroke="#fff" strokeWidth={1.2} />
            ))}
            {/* width dimension = edition */}
            <g stroke={accent} strokeWidth={1.2}>
              <line x1={U.xL} y1={CAP - 60} x2={T.xR} y2={CAP - 60} />
              <line x1={U.xL} y1={CAP - 66} x2={U.xL} y2={CAP - 54} />
              <line x1={T.xR} y1={CAP - 66} x2={T.xR} y2={CAP - 54} />
            </g>
            <text
              x={(U.xL + T.xR) / 2}
              y={CAP - 72}
              textAnchor="middle"
              fill={accent}
              fontSize={14}
              letterSpacing={2}
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              UNIT · 001
            </text>
            {/* tagline */}
            <text
              x={(U.xL + T.xR) / 2}
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

          {/* Hover hit area over the wordmark */}
          <rect
            x={U.xL - 40}
            y={CAP - 40}
            width={T.xR - U.xL + 80}
            height={BASE - CAP + 80}
            fill="transparent"
            onMouseEnter={() => setHot(true)}
            onMouseLeave={() => setHot(false)}
          />
        </motion.svg>
      </div>

      {/* Grain + vignette for material/depth */}
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
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Coordinate crosshair on the cursor */}
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
