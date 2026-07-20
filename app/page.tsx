import type { Metadata } from "next";
import { Landing } from "./components/Landing";
import { Cursor } from "./honey/components/Cursor";
import { Header } from "./honey/components/Header";
import { SmoothScroll } from "./honey/components/SmoothScroll";
import { About } from "./honey/components/sections/About";
import { BeforeAfter } from "./honey/components/sections/BeforeAfter";
import { Clients } from "./honey/components/sections/Clients";
import { Faq } from "./honey/components/sections/Faq";
import { Hero } from "./honey/components/sections/Hero";
import { HowWeSprint } from "./honey/components/sections/HowWeSprint";
import { KillThemWithSweetness } from "./honey/components/sections/KillThemWithSweetness";
import { PoolRules } from "./honey/components/sections/PoolRules";
import { Services } from "./honey/components/sections/Services";

export const metadata: Metadata = {
  title: "UNIT — electrónica en ediciones numeradas",
  description:
    "UNIT diseña electrónica en series cortas y numeradas. Únete a la lista antes del lanzamiento.",
};

export default function Home() {
  return (
    <Landing>
      <Cursor />
      <Header />
      <SmoothScroll>
        <main className="bg-black text-white md:cursor-none">
          <Hero />
          <About />
          <Services />
          <PoolRules />
          <BeforeAfter />
          <HowWeSprint />
          <Clients />
          <KillThemWithSweetness />
          <Faq />
        </main>
      </SmoothScroll>
    </Landing>
  );
}
