import { RevealText } from "../RevealText";

// About — one big centered word-by-word reveal manifesto.
export function About() {
  return (
    <section className="relative bg-[#0c0c0c] px-6 py-40 sm:px-8 sm:py-56">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
          Manifiesto
        </div>
        <RevealText
          text="UNIT diseña objetos electrónicos en series cortas y numeradas. Cada unidad se produce una vez, se numera y no se repite. Cuando la serie se agota, se agota para siempre."
          className="text-[6vw] font-medium leading-[1.05] tracking-tight text-white sm:text-[3.4vw]"
        />
        <a
          href="#reserva"
          data-cursor="lista"
          className="mt-16 inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white/60"
        >
          Únete a la lista <span>↗</span>
        </a>
      </div>
    </section>
  );
}
