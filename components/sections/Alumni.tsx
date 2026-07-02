import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

// Team-pedigree strip shown below Careers. Logos render in their native full
// color on the dark canvas; w-auto preserves each logo's intrinsic aspect ratio
// and per-logo heights balance the wide corporate wordmarks against the dense,
// square government seals. Order is most-important-first for a defense audience:
// the U.S. government/military seals lead, then the technology pedigree.
const alumni = [
  { name: "The White House", file: "white-house.svg", h: "h-14" },
  { name: "U.S. House of Representatives", file: "house-of-representatives.svg", h: "h-14" },
  { name: "U.S. Marine Corps", file: "marine-corps.svg", h: "h-14" },
  { name: "Google", file: "google.svg", h: "h-14", nudge: "translate-y-[6px]" },
  { name: "Sabre", file: "sabre.svg", h: "h-10", nudge: "translate-y-[3px]" },
  { name: "Shazam", file: "shazam.svg", h: "h-12", nudge: "translate-y-[3px]" },
  { name: "Oracle", file: "oracle.svg", h: "h-6", nudge: "translate-y-[5px]" },
  { name: "Adobe", file: "adobe.svg", h: "h-12", nudge: "translate-y-[3px]" },
];

export function Alumni() {
  return (
    <Section id="alumni" theme="dark" fullHeight>
      <div className="text-center">
        <Reveal>
          <Kicker>Team</Kicker>
          <SectionHeading className="mx-auto max-w-4xl">Built by patriots, veterans and technologists</SectionHeading>
        </Reveal>

        <Reveal style={{ transitionDelay: "120ms" }}>
          <p className="mt-12 font-display text-[13px] font-bold uppercase tracking-[0.28em] text-dark-low">
            Alumni of
          </p>

          {/* Single row on desktop (full section width); wraps only on narrow viewports. */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-9 md:flex-nowrap lg:gap-x-10">
            {alumni.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={logo.name}
                src={`/logos/${logo.file}`}
                alt={logo.name}
                className={`${logo.h} ${logo.nudge ?? ""} w-auto shrink-0 opacity-90 transition-opacity duration-300 hover:opacity-100`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
