import { SectionHeader } from "../SectionHeader";

const STEPS = [
  {
    n: "01",
    title: "Serie corta",
    body: "No fabricamos por millones. Cada unidad sale en una tirada limitada, pensada para durar. Menos stock, más cuidado en cada pieza.",
  },
  {
    n: "02",
    title: "Numerada",
    body: "Cada objeto lleva su número grabado. 001, 002, 003. Sabes exactamente qué unidad tienes y de qué serie viene. No hay dos iguales.",
  },
  {
    n: "03",
    title: "La lista primero",
    body: "Cuando abrimos la reserva, la lista de espera entra antes que nadie. En orden de llegada. Sin sorpresas, sin colas eternas.",
  },
];

// [04/09] Cómo funciona — the three principles behind UNIT.
export function HowWeWork() {
  return (
    <section className="relative bg-black px-6 pt-6 sm:px-8">
      <SectionHeader index="04" name="Cómo funciona" />

      <div className="py-20">
        <h2 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl">
          Simple. Como debería ser.
        </h2>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/45">
          (Tres reglas. Ni una más.)
        </p>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="group flex flex-col justify-between bg-[#0c0c0c] p-8 transition-colors hover:bg-[#141414]"
            >
              <div className="font-mono text-6xl font-light text-white/25 transition-colors group-hover:text-[#4d7cff]">
                {s.n}
              </div>
              <div className="mt-24">
                <h3 className="text-2xl font-medium text-white">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
