import { SectionHeader } from "../SectionHeader";

const PHASES = [
  {
    n: "01",
    title: "Reserva",
    body: "Dejas tu correo. Quedas en la lista, en orden de llegada. Sin pagar nada todavía.",
  },
  {
    n: "02",
    title: "Aviso",
    body: "Cuando la serie está lista, la lista se entera primero. Te escribimos antes que a nadie.",
  },
  {
    n: "03",
    title: "Producción",
    body: "Fabricamos la serie corta y numeramos cada unidad a mano, una por una.",
  },
  {
    n: "04",
    title: "Envío",
    body: "Tu unidad llega con su número. La serie se cierra. Nunca se vuelve a producir.",
  },
];

// [06/09] El drop — the four phases of a UNIT release + a giant marquee.
export function HowWeSprint() {
  return (
    <section className="relative bg-[#0c0c0c] px-6 pt-6 sm:px-8">
      <SectionHeader index="04" name="El drop" />

      <div className="py-20">
        <h2 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl">
          Cómo llega tu unidad.
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55">
          De la lista de espera a tu escritorio en cuatro pasos. Sin letra
          pequeña, sin sorpresas. Reservas, te avisamos, producimos y envías.
        </p>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
          {PHASES.map((p) => (
            <div
              key={p.n}
              className="group bg-[#0c0c0c] p-7 transition-colors hover:bg-[#151515]"
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#ffffff]">
                Fase {p.n}
              </div>
              <h3 className="mt-6 text-xl font-medium text-white">{p.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-white/50">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
