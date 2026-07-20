"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { WaitlistForm } from "@/app/components/WaitlistForm";
import { SectionHeader } from "../SectionHeader";

const FAQS = [
  {
    n: "001",
    q: "¿Cuánto cuesta?",
    a: "Los precios se anuncian con cada serie. La lista de espera los conoce primero, sin compromiso de compra.",
  },
  {
    n: "002",
    q: "¿Pago algo al reservar?",
    a: "No. Reservar solo guarda tu lugar en la lista, en orden de llegada. Pagas cuando decides comprar — si decides comprar.",
  },
  {
    n: "003",
    q: "¿Qué pasa cuando se agota una serie?",
    a: "Se cierra. No hacemos restock. La siguiente unidad será una serie nueva, con su propio número. Lo que compras es lo que existe.",
  },
  {
    n: "004",
    q: "¿Cuándo lanzan?",
    a: "Estamos en prelanzamiento. La lista de espera se entera de la fecha antes que nadie, y entra primero cuando abrimos.",
  },
];

// [09/09] Reserva — the waitlist form, the FAQ accordion and the closing CTA.
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="reserva" className="relative bg-[#0c0c0c] px-6 pt-6 sm:px-8">
      <SectionHeader index="05" name="Reserva" />

      {/* Waitlist */}
      <div className="grid gap-12 py-24 md:grid-cols-2">
        <div>
          <h2 className="max-w-xl text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl">
            Sé de los primeros en tener una unidad.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
            Series cortas y numeradas. Cuando abramos la reserva, la lista entra
            primero — en orden de llegada. Sin spam, solo el lanzamiento.
          </p>
        </div>
        <div className="flex items-start md:justify-end">
          <WaitlistForm />
        </div>
      </div>

      {/* FAQ */}
      <div className="pb-24">
        <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
          Preguntas
        </div>
        <div className="border-t border-white/15">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.n} className="border-b border-white/15">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.n}`}
                  className="flex w-full items-center gap-6 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="font-mono text-xs text-white/40">
                    {item.n}
                  </span>
                  <span className="flex-1 text-xl font-medium text-white sm:text-2xl">
                    {item.q}
                  </span>
                  <span className="font-mono text-2xl text-white/60">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${item.n}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 pl-14 text-sm leading-relaxed text-white/55">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Closing CTA */}
      <div className="flex flex-col items-center gap-8 pb-32 pt-8 text-center">
        <a
          href="#reserva"
          data-cursor="reservar"
          className="group text-[16vw] font-black leading-none tracking-tighter text-white transition-colors hover:text-white/50 sm:text-[12vw]"
        >
          ¿Reservas la 001?
        </a>
      </div>

      <footer className="border-t border-white/15 py-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
        <div className="flex justify-between">
          <span>UNIT — ©MMXXVI</span>
          <span>Electrónica en ediciones numeradas</span>
        </div>
      </footer>
    </section>
  );
}
