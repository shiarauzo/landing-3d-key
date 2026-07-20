import { Marquee } from "../Marquee";

// [01/09] Hero — abstract tech visual with the headline anchored bottom-left
// and a marquee across the base.
export function Hero() {
  return (
    <section className="relative flex h-screen flex-col justify-end overflow-hidden bg-black">
      {/* Abstract wireframe visual */}
      <div className="pointer-events-none absolute inset-0">
        <video
          src="https://framerusercontent.com/assets/yLuVmQngCSXfd0UdaLuBOt4SabU.webm"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      </div>

      {/* Headline */}
      <div className="relative z-10 px-6 pb-20 sm:px-8">
        <h1 className="max-w-4xl text-[10vw] font-medium leading-[0.95] tracking-tight text-white sm:text-[6.5vw]">
          Electrónica en
          <br />
          ediciones numeradas.
        </h1>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-10 border-y border-white/15 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
        <Marquee text="UNIT 001  ✦  Próximamente  ✦  Serie corta  ✦  " duration={22} />
      </div>
    </section>
  );
}
