import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

// Team-pedigree strip shown below Careers. Logos render in their native full
// color on the dark canvas; w-auto preserves each logo's intrinsic aspect ratio
// and per-logo heights balance the wide corporate wordmarks against the dense,
// square government seals. Order is most-important-first for a defense audience:
// the U.S. government/military seals lead, then the technology pedigree.
const alumni = [
  { name: "Executive Office of the President", file: "executive-office-president.svg", h: "h-16" },
  { name: "U.S. House of Representatives", file: "house-of-representatives.svg", h: "h-16" },
  { name: "U.S. Marine Corps", file: "marine-corps.svg", h: "h-16" },
  { name: "Google", file: "google.svg", h: "h-7" },
  { name: "Oracle", file: "oracle.svg", h: "h-6" },
  { name: "Adobe", file: "adobe.svg", h: "h-9" },
  { name: "Shazam", file: "shazam.svg", h: "h-9" },
];

export function Alumni() {
  return (
    <Section id="alumni" theme="dark">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <SectionHeading>Built by patriots, veterans and technologists.</SectionHeading>
        </Reveal>

        <Reveal style={{ transitionDelay: "120ms" }}>
          <p className="mt-12 font-display text-[13px] font-bold uppercase tracking-[0.28em] text-dark-low">
            Alumni of
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-12 gap-y-9">
            {alumni.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={logo.name}
                src={`/logos/${logo.file}`}
                alt={logo.name}
                className={`${logo.h} w-auto opacity-90 transition-opacity duration-300 hover:opacity-100`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
