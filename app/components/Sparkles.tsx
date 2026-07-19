// Deterministic positions so server and client render identically (no
// hydration mismatch). Pure CSS twinkle — no JS, safe in a server component.
const SPOTS = [
  { top: "12%", left: "18%", size: 3, delay: "0s", dur: "2.6s" },
  { top: "28%", left: "72%", size: 2, delay: "0.5s", dur: "3.1s" },
  { top: "55%", left: "34%", size: 4, delay: "1.1s", dur: "2.2s" },
  { top: "68%", left: "82%", size: 2, delay: "0.3s", dur: "2.9s" },
  { top: "40%", left: "56%", size: 3, delay: "1.6s", dur: "3.4s" },
  { top: "80%", left: "22%", size: 2, delay: "0.9s", dur: "2.4s" },
  { top: "18%", left: "46%", size: 2, delay: "2.0s", dur: "3.0s" },
  { top: "62%", left: "62%", size: 3, delay: "1.3s", dur: "2.7s" },
];

export function Sparkles({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {SPOTS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 6px 1px rgba(255,255,255,0.8)",
            animation: `twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
