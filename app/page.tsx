import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Solution } from "@/components/sections/Solution";
import { WhyNow } from "@/components/sections/WhyNow";
import { WhyUs } from "@/components/sections/WhyUs";
import { Careers } from "@/components/sections/Careers";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Solution />
        <WhyNow />
        <WhyUs />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
