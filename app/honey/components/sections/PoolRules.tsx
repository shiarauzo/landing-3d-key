import { products } from "@/lib/products";
import { SectionHeader } from "../SectionHeader";

// [03/07] Unidades — the product index as big, bold links. Scroll through them;
// each is a link that turns yellow on hover. Only the available unit ships now.
export function PoolRules() {
  return (
    <section id="catalogo" className="relative bg-[#060608] px-6 pt-6 sm:px-8">
      <SectionHeader index="02" name="Unidades" />

      <ul className="mt-6">
        {products.map((p) => {
          const available = p.status === "disponible";
          return (
            <li key={p.n}>
              <a
                href="#reserva"
                className="group flex items-center gap-5 border-b border-white/12 py-8 transition-colors duration-200 sm:gap-8 sm:py-11"
              >
                <span className="font-mono text-sm text-white/40 transition-colors duration-200 group-hover:text-[#ffe000]">
                  {p.n}
                </span>
                <span className="flex-1 text-4xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#ffe000] sm:text-7xl">
                  {p.name}
                </span>
                <span className="hidden font-mono text-xs uppercase tracking-widest text-white/40 transition-colors duration-200 group-hover:text-[#ffe000] sm:inline">
                  {p.category}
                </span>
                <span
                  className={`hidden items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 group-hover:text-[#ffe000] sm:inline-flex ${
                    available ? "text-white/80" : "text-white/30"
                  }`}
                >
                  {available && (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                  {available ? "Disponible" : "Próximamente"}
                </span>
                <span className="text-2xl text-white/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#ffe000] sm:text-4xl">
                  ↗
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
