import { SectionHeader } from "../SectionHeader";

const BEFORE = [
  {
    n: "01",
    title: "Desechable.",
    body: "Diseñada para rendirse justo después de la garantía. Plástico que amarillea, baterías que mueren, un ciclo de reemplazo que nunca termina.",
  },
  {
    n: "02",
    title: "Infinita.",
    body: "Mil versiones al año, todas casi iguales. Un modelo nuevo cada seis meses cuyo único propósito es que el tuyo se sienta viejo.",
  },
  {
    n: "03",
    title: "Anónima.",
    body: "Un número de serie escondido en la etiqueta. Un objeto más entre millones idénticos, salido de una fábrica que jamás conocerás.",
  },
];

const AFTER = [
  {
    n: "01",
    title: "Numerada.",
    body: "Cada unidad lleva su número grabado a la vista. 001, 002, 003. Sabes qué tienes y de qué serie viene. Un objeto con identidad.",
  },
  {
    n: "02",
    title: "Limitada.",
    body: "Series cortas, producidas una vez. Cuando la serie se agota, se agota. Sin restock, sin la ansiedad de que salga algo “mejor” mañana.",
  },
  {
    n: "03",
    title: "Cuidada.",
    body: "Aluminio mecanizado, materiales que envejecen bien, diseño que no cansa. Pensada para quedarse contigo, no para reemplazarse.",
  },
];

function Starfield() {
  // Deterministic star positions so SSR and client agree.
  const stars = Array.from({ length: 90 }, (_, i) => {
    const a = (i * 39.7) % 100;
    const b = (i * 71.3) % 100;
    const s = (i % 3) + 1;
    return { top: `${b}%`, left: `${a}%`, size: s };
  });
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {stars.map((st, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: st.top,
            left: st.left,
            width: st.size,
            height: st.size,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

// [05/09] Antes / Después — the starfield transition + the mass-electronics vs
// UNIT breakdown.
export function BeforeAfter() {
  return (
    <section className="relative bg-black px-6 pt-6 sm:px-8">
      <SectionHeader index="05" name="Antes / Después" />

      {/* Starfield transition band */}
      <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <Starfield />
        <h2
          className="relative text-center text-[13vw] font-black leading-[0.9] tracking-tight sm:text-[9vw]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #ffffff 0%, #9a9a9a 45%, #4a4a4a 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Antes
          <br />
          // UNIT©
        </h2>
      </div>

      {/* Before vs After columns */}
      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 py-0 md:grid-cols-2">
        <div className="bg-[#080808] p-8 sm:p-10">
          <div className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            Electrónica de siempre
          </div>
          <div className="space-y-10">
            {BEFORE.map((item) => (
              <div key={item.n} className="opacity-55">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-white/40">
                    [{item.n}]
                  </span>
                  <h3 className="text-2xl font-medium text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/45">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f0f0f] p-8 sm:p-10">
          <div className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-[#4d7cff]">
            Con UNIT
          </div>
          <div className="space-y-10">
            {AFTER.map((item) => (
              <div key={item.n}>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#4d7cff]">
                    [{item.n}]
                  </span>
                  <h3 className="text-2xl font-medium text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
