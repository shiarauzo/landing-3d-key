export function Hero() {
  return (
    <section className="relative z-10 mx-auto flex min-h-[88vh] w-full max-w-5xl flex-col justify-between px-6 pt-10 pb-16">
      {/* Top meta bar */}
      <div className="tnum flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
        <span>UNIT</span>
        <span className="hidden sm:inline">Electrónica · ediciones numeradas</span>
        <span>MMXXVI</span>
      </div>

      {/* Center statement */}
      <div className="flex flex-col items-start">
        <p className="tnum mb-6 text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
          — Prelanzamiento
        </p>
        <h1 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          Electrónica que llega
          <br />
          en unidades numeradas.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
          Diseñamos objetos electrónicos en series cortas. Deja tu correo y
          entra a la lista antes de que la unidad 001 salga a la luz.
        </p>

        <a
          href="#waitlist"
          className="tnum group mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5"
        >
          Únete a la lista
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      {/* Bottom cue */}
      <div className="tnum flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[color:var(--accent)]" />
        Desliza para ver el catálogo
      </div>
    </section>
  );
}
