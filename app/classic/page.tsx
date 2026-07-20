import { Hero } from "../components/Hero";
import { Landing } from "../components/Landing";
import { ProductList } from "../components/ProductList";
import { WaitlistForm } from "../components/WaitlistForm";

export default function Classic() {
  return (
    <Landing>
      <main className="relative">
        <div className="grid-bg pointer-events-none absolute inset-0 z-0 opacity-40" />

        <Hero />

        <div className="py-16 sm:py-24">
          <ProductList />
        </div>

        {/* Waitlist */}
        <section
          id="waitlist"
          className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-start gap-8 px-6 py-24 sm:py-32"
        >
          <div>
            <p className="tnum mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
              — Lista de espera
            </p>
            <h2 className="max-w-2xl text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
              Sé de los primeros en tener una unidad.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Series cortas y numeradas. Cuando abramos, la lista entra primero.
            </p>
          </div>
          <WaitlistForm />
        </section>

        {/* Footer */}
        <footer className="relative z-10 mx-auto w-full max-w-5xl px-6 py-10">
          <div className="tnum flex flex-col gap-3 border-t border-line pt-6 text-xs uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>UNIT © MMXXVI</span>
            <span>Electrónica en ediciones numeradas</span>
          </div>
        </footer>
      </main>
    </Landing>
  );
}
