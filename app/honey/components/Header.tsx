// Fixed top navigation, UNIT mono meta-bar.
const linkFocus =
  "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
      <div className="flex items-start justify-between px-6 py-5 font-mono text-[11px] uppercase tracking-[0.15em] text-white sm:px-8">
        <div className="leading-tight">
          <div>UNIT—</div>
          <div className="text-white/70">©MMXXVI</div>
        </div>

        <nav className="hidden items-start gap-10 md:flex">
          <a
            href="mailto:hola@unit.co"
            className={`flex gap-2 ${linkFocus}`}
          >
            <span className="text-white/60">1</span> hola@unit.co
          </a>
          <a href="#reserva" className={`leading-tight ${linkFocus}`}>
            Lista de
            <br />
            espera
          </a>
          <a
            href="https://instagram.com/unit"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex gap-2 ${linkFocus}`}
          >
            <span className="text-white/60">4</span> Instagram
          </a>
        </nav>

        <a
          href="#reserva"
          className={`rounded-full bg-[#4d7cff] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-transform hover:-translate-y-0.5 ${linkFocus}`}
        >
          Reservar
        </a>
      </div>
    </header>
  );
}
