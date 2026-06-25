import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Scale } from "@/components/sections/Scale";
import { Solution } from "@/components/sections/Solution";
import { WhyNow } from "@/components/sections/WhyNow";
import { Careers } from "@/components/sections/Careers";
import { Alumni } from "@/components/sections/Alumni";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Scale />
        <WhyNow />
        <Solution />
        <Careers />
        <Alumni />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
