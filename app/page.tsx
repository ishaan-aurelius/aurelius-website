import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
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
        <Careers />
        <Alumni />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
