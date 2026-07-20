import { Marquee } from "../Marquee";
import { products } from "@/lib/products";
import { SectionHeader } from "../SectionHeader";

// [02/09] Catálogo (intro) — headline + copy on the left, wireframe mesh video
// on the right, product names marqueeing across the bottom.
export function Services() {
  return (
    <section className="relative bg-[#0e0e0e] px-6 pt-6 sm:px-8">
      <SectionHeader index="02" name="Catálogo" />

      <div className="relative grid gap-10 py-16 md:grid-cols-2">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl">
            Cuatro unidades. Cada una, una serie.
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-white/55">
            Audio que desaparece en tus oídos. Sonido tallado en aluminio. Luz
            que obedece. Energía del tamaño de una baraja. Cada objeto se piensa
            entero, se produce en serie corta y lleva su número. Sin restock, sin
            versiones infinitas. La unidad que compras es la unidad que existe.
          </p>
          <a
            href="#reserva"
            data-cursor="reservar"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white/60"
          >
            Reserva la tuya <span>↗</span>
          </a>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 items-center md:flex">
          <video
            src="https://framerusercontent.com/assets/yLuVmQngCSXfd0UdaLuBOt4SabU.webm"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-50"
          />
        </div>
      </div>

      <div className="border-y border-white/15 py-4 font-mono text-lg uppercase tracking-tight text-white/70">
        <Marquee
          text={products.map((p) => `${p.n} ${p.name}`).join("  /  ") + "  /  "}
          duration={20}
        />
      </div>
    </section>
  );
}
