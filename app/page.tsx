import type { Metadata } from "next";
import { Landing } from "./components/Landing";
import { Cursor } from "./honey/components/Cursor";
import { Header } from "./honey/components/Header";
import { SmoothScroll } from "./honey/components/SmoothScroll";
import { About } from "./honey/components/sections/About";
import { Faq } from "./honey/components/sections/Faq";
import { Hero } from "./honey/components/sections/Hero";
import { HowWeSprint } from "./honey/components/sections/HowWeSprint";
import { PoolRules } from "./honey/components/sections/PoolRules";

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
          <PoolRules />
          <HowWeSprint />
          <Faq />
        </main>
      </SmoothScroll>
    </Landing>
  );
}
