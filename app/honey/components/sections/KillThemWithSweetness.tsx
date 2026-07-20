import { RevealText } from "../RevealText";
import { SectionHeader } from "../SectionHeader";

const STORY = [
  "Empezó con una obsesión: por qué los objetos que amamos ya no se hacen así.",
  "Una cámara de los ochenta que todavía funciona. Un amplificador que pesa lo que debe pesar. Un reloj que heredaste. Objetos hechos una vez, para durar, con un número que decía exactamente cuántos existían.",
  "Luego llegó la producción infinita. Todo más barato, más rápido, más desechable. Ganamos cantidad y perdimos el objeto que valía la pena guardar.",
  "UNIT es un intento de volver. Series cortas. Cada unidad numerada. Materiales que envejecen bien. Electrónica que quieres tener dentro de diez años, no reemplazar en dos.",
  "No fabricamos millones. Fabricamos una serie, la numeramos, y la cerramos. La primera lleva un número que no se repite nunca:",
];

// [08/09] Origen — the UNIT brand story, revealed on scroll, landing on a
// giant wordmark.
export function KillThemWithSweetness() {
  return (
    <section className="relative bg-black px-6 pt-6 sm:px-8">
      <SectionHeader index="07" name="Origen" />

      <div className="mx-auto max-w-4xl py-28 sm:py-40">
        <h2 className="text-4xl font-medium leading-[1.02] tracking-tight text-white sm:text-6xl">
          Objetos hechos una vez.
        </h2>

        <div className="mt-20 space-y-14 text-xl font-medium leading-snug tracking-tight text-white sm:text-2xl">
          {STORY.map((p, i) => (
            <RevealText key={i} text={p} />
          ))}
        </div>
      </div>

      <div className="flex justify-center pb-24">
        <span className="text-[24vw] font-black leading-none tracking-tighter text-[#4d7cff]">
          UNIT
        </span>
      </div>
    </section>
  );
}
