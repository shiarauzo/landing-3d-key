// Minimal fixed header — wordmark + a single Reservar action.
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
      <div className="flex items-start justify-between px-6 py-5 font-mono text-[11px] uppercase tracking-[0.15em] text-white sm:px-8">
        <div className="leading-tight">
          <div>UNIT—</div>
          <div className="text-white/60">©MMXXVI</div>
        </div>

        <a
          href="#reserva"
          className="group relative overflow-hidden rounded-md border border-white/30 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full bg-white transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0"
          />
          <span className="relative text-white transition-colors duration-300 group-hover:text-black">
            Reservar
          </span>
        </a>
      </div>
    </header>
  );
}
