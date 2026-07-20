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
const STEP = 40; // divides both VW (36) and VH (20) evenly → grid aligns to edges

const cols = VW / STEP; // 36
const rows = VH / STEP; // 20
const vLines = Array.from({ length: cols + 1 }, (_, i) => i);
const hLines = Array.from({ length: rows + 1 }, (_, i) => i);
const g = (n: number) => n * STEP; // grid unit → px

// Circles centered on a grid node, radii = whole grid units → they cross nodes.
const CIRCLE = { cx: g(5), cy: g(15), radii: [g(1), g(2), g(3), g(4)] };

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.01, delayChildren: 0.1 } },
};
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay: 1 } },
};
const wipe: Variants = {
  hidden: { width: 0 },
  visible: { width: VW, transition: { duration: 1.4, ease: EASE_OUT, delay: 0.6 } },
};

// [01/08] Hero — an animated technical-drawing plane. Everything snaps to one
// grid; the plane traces itself, then stays alive with a scan line, marching
// construction lines, blinking nodes and a coordinate crosshair on the cursor.
export function Hero() {
  const reduce = useReducedMotion();

  // Parallax (drawing floats) + crosshair (follows cursor), both spring-smoothed.
  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const cxRaw = useMotionValue(-100);
  const cyRaw = useMotionValue(-100);
  const cx = useSpring(cxRaw, { stiffness: 400, damping: 32 });
  const cy = useSpring(cyRaw, { stiffness: 400, damping: 32 });
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [titleHot, setTitleHot] = useState(false);

  function handleMove(e: React.MouseEvent) {
    if (reduce) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    px.set((e.clientX / w - 0.5) * 22);
    py.set((e.clientY / h - 0.5) * 22);
    cxRaw.set(e.clientX);
    cyRaw.set(e.clientY);
    setCoord({
      x: Math.round((e.clientX / w) * cols),
      y: Math.round((e.clientY / h) * rows),
    });
  }

  const minor = "rgba(255,255,255,0.07)";
  const major = "rgba(255,255,255,0.16)";
  const lineStrong = "rgba(255,255,255,0.28)";
  const accent = "#4d7cff";
  const start = reduce ? "visible" : "hidden";
  const loop = { repeat: Infinity, ease: "linear" as const };

  return (
    <section
      onMouseMove={handleMove}
      className="relative flex h-screen flex-col justify-end overflow-hidden bg-[#060608]"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.svg
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMid slice"
          className="h-[110%] w-[110%]"
          style={{ x: px, y: py }}
          initial={start}
          animate="visible"
          variants={container}
        >
          {/* Grid — minor + major every 5 cells */}
          <motion.g variants={container}>
            {vLines.map((i) => (
              <motion.line
                key={`v${i}`}
                x1={g(i)}
                y1={0}
                x2={g(i)}
                y2={VH}
                stroke={i % 5 === 0 ? major : minor}
                strokeWidth={1}
                variants={draw}
              />
            ))}
            {hLines.map((i) => (
              <motion.line
                key={`h${i}`}
                x1={0}
                y1={g(i)}
                x2={VW}
                y2={g(i)}
                stroke={i % 5 === 0 ? major : minor}
                strokeWidth={1}
                variants={draw}
              />
            ))}
          </motion.g>

          {/* Technical decoration — all snapped to grid nodes */}
          <motion.g variants={container} fill="none" stroke={lineStrong} strokeWidth={1.4}>
            {/* Quarter arcs centered on grid nodes */}
            <motion.path d={`M ${g(13)} 0 A ${g(13)} ${g(13)} 0 0 1 0 ${g(13)}`} variants={draw} />
            <motion.path
              d={`M ${g(21)} ${VH} A ${g(15)} ${g(15)} 0 0 1 ${VW} ${g(5)}`}
              variants={draw}
            />
            {/* True 45° diagonals (equal dx/dy in grid units) → cross every node */}
            <motion.line x1={0} y1={VH} x2={g(15)} y2={g(5)} variants={draw} />
            <motion.line x1={g(24)} y1={VH} x2={VW} y2={g(8)} variants={draw} />
            {/* Concentric circles */}
            {CIRCLE.radii.map((r) => (
              <motion.circle key={r} cx={CIRCLE.cx} cy={CIRCLE.cy} r={r} variants={draw} />
            ))}
            {/* 45° angle wedge, vertex on a node */}
            <motion.line x1={g(27)} y1={g(10)} x2={g(32)} y2={g(10)} variants={draw} />
            <motion.line x1={g(27)} y1={g(10)} x2={g(32)} y2={g(5)} variants={draw} />
          </motion.g>

          {/* Marching construction lines (constant motion, linear) */}
          {!reduce && (
            <g stroke={accent} strokeWidth={1.2} strokeDasharray="5 5" opacity={0.55}>
              <motion.line
                x1={g(5)}
                y1={g(15)}
                x2={g(5)}
                y2={g(11)}
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 1, ...loop }}
              />
              <motion.line
                x1={g(27)}
                y1={g(10)}
                x2={g(32)}
                y2={g(10)}
                stroke="rgba(255,255,255,0.35)"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 1.4, ...loop }}
              />
            </g>
          )}

          {/* Scan line sweeping down the plane */}
          {!reduce && (
            <motion.line
              x1={0}
              x2={VW}
              y1={0}
              y2={0}
              stroke="rgba(255,255,255,0.14)"
              strokeWidth={1}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: [0, VH], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 7, delay: 1.2, ...loop }}
            />
          )}

          {/* Blinking measurement nodes on grid intersections */}
          {!reduce &&
            [
              [g(15), g(5)],
              [g(24), g(20)],
              [g(32), g(10)],
            ].map(([nx, ny], i) => (
              <motion.circle
                key={i}
                cx={nx}
                cy={ny}
                r={3}
                fill="#fff"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.15, 0.9, 0.15] }}
                transition={{ duration: 2.4, delay: 1 + i * 0.4, ...loop }}
              />
            ))}

          {/* Labels */}
          <motion.g
            variants={fade}
            fill="rgba(255,255,255,0.42)"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            fontSize={15}
          >
            {Array.from({ length: 13 }, (_, i) => i + 1).map((n) => (
              <text key={n} x={g(n)} y={VH - g(0.5)} textAnchor="middle">
                {n}
              </text>
            ))}
            {[1, 2, 3, 4].map((n) => (
              <text key={`c${n}`} x={CIRCLE.cx} y={CIRCLE.cy - g(n) + 5} textAnchor="middle">
                {n}
              </text>
            ))}
            <text x={g(2)} y={g(12)}>60°</text>
            <text x={g(30)} y={g(10) - 6}>45°</text>
          </motion.g>

          {/* Blue accent dimension (cota) on grid */}
          <motion.g variants={fade} stroke={accent} strokeWidth={1.4}>
            <line x1={g(5)} y1={g(3)} x2={g(12)} y2={g(3)} />
            <line x1={g(5)} y1={g(3) - 6} x2={g(5)} y2={g(3) + 6} />
            <line x1={g(12)} y1={g(3) - 6} x2={g(12)} y2={g(3) + 6} />
            <text
              x={g(8.5)}
              y={g(3) - 12}
              textAnchor="middle"
              fill={accent}
              stroke="none"
              fontSize={15}
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              UNIT.001
            </text>
          </motion.g>

          {/* Title — UNIT as thick blueprint strokes, revealed by a wipe */}
          <defs>
            <clipPath id="unit-wipe">
              <motion.rect x={0} y={0} height={VH} variants={wipe} />
            </clipPath>
          </defs>
          <g clipPath="url(#unit-wipe)">
            <text
              x={VW / 2}
              y={g(10)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="none"
              stroke={titleHot ? "#fff" : "rgba(255,255,255,0.9)"}
              strokeWidth={titleHot ? 3.2 : 2.5}
              fontSize={300}
              fontWeight={800}
              letterSpacing={-6}
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                transition: "stroke 220ms ease, stroke-width 220ms ease",
              }}
            >
              UNIT
            </text>
            <text
              x={VW / 2}
              y={g(10) + 118}
              textAnchor="middle"
              fill="rgba(255,255,255,0.55)"
              fontSize={20}
              letterSpacing={8}
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              ELECTRÓNICA EN EDICIONES NUMERADAS
            </text>
          </g>
          {/* Invisible hit area to detect hover over the wordmark */}
          <rect
            x={VW / 2 - 620}
            y={g(10) - 120}
            width={1240}
            height={240}
            fill="transparent"
            onMouseEnter={() => setTitleHot(true)}
            onMouseLeave={() => setTitleHot(false)}
          />
        </motion.svg>
      </div>

      {/* Coordinate crosshair following the cursor */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 z-[5] hidden md:block">
          <motion.div className="absolute top-0 h-full w-px bg-white/10" style={{ x: cx }} />
          <motion.div className="absolute left-0 w-full h-px bg-white/10" style={{ y: cy }} />
          <motion.div
            className="absolute font-mono text-[10px] uppercase tracking-widest text-white/45"
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
