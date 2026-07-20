import { RevealText } from "../RevealText";
import { SectionHeader } from "../SectionHeader";

// [07/09] Por qué numeradas — the case for limited, numbered editions.
export function Clients() {
  return (
    <section className="relative bg-[#0c0c0c] px-6 pt-6 sm:px-8">
      <SectionHeader index="05" name="Por qué numeradas" />

      <div className="mx-auto max-w-4xl py-28 sm:py-40">
        <h2 className="text-4xl font-medium leading-[1.02] tracking-tight text-white sm:text-7xl">
          Menos objetos.
          <br />
          Mejores objetos.
        </h2>

        <div className="mt-20 space-y-14 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
          <RevealText
            text="La electrónica se volvió desechable. Compramos, se rompe, tiramos, repetimos. Un objeto tras otro, todos olvidables."
            className="text-white"
          />
          <RevealText
            text="Una serie numerada cambia la relación. Sabes qué tienes, cuántos existen y que nadie va a fabricar más. El objeto vuelve a importar."
            className="text-white"
          />
          <RevealText
            text="UNIT no compite por ser lo más barato ni lo más nuevo. Compite por ser lo que quieres tener durante años. Eso empieza por producir menos, y hacerlo bien."
            className="text-white"
          />
        </div>

        <a
          href="#reserva"
          data-cursor="lista"
          className="mt-16 inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white/60"
        >
          Quiero una <span>↗</span>
        </a>
      </div>
    </section>
  );
}
