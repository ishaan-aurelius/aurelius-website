import { Fragment } from "react";
import Image from "next/image";
import { solution } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const HEX_CHIP = "25,2 75,2 98,50 75,98 25,98 2,50"; // flat-top, echoes the capability hexes

// Downward connector between the vertical flow steps. Gold, thin, tactical;
// color comes from the parent.
function FlowArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 rotate-90"
      aria-hidden="true"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function Solution() {
  const last = solution.steps.length - 1;
  return (
    <Section id="solution" theme="dark">
      <div className="mx-auto max-w-5xl text-center">
        <Kicker>{solution.kicker}</Kicker>
        <SectionHeading>
          {solution.headline.pre}
          <span className="text-gold">{solution.headline.gold}</span>
          {solution.headline.post}
        </SectionHeading>
      </div>

      {/* two columns, the hexagon (left, native 483px) and the vertical method flow (right) */}
      <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-[483px_minmax(0,1fr)] lg:gap-16">
        {/* LEFT, exact screenshot, fixed 483×452 (never stretched/shrunk on desktop) */}
        <Reveal className="flex justify-center lg:justify-start">
          <Image
            src="/platform-hexagon.png"
            alt="Aurelius platform capabilities: kill-web architecture, multi-domain & scalable, inter-operable, cross-domain clarity, strategic to operational, speed of decisions"
            width={483}
            height={452}
            className="h-auto w-full max-w-[483px]"
          />
        </Reveal>

        {/* RIGHT, the connected 01→04 flow, stacked vertically */}
        <div>
          <Reveal>
            <span className="font-display block text-center text-[13px] font-bold uppercase tracking-[0.14em] text-gold">
              {solution.methodKicker}
            </span>
          </Reveal>

          <ol className="mt-6 flex flex-col items-stretch">
            {solution.steps.map((s, i) => (
              <Fragment key={s.n}>
                <Reveal style={{ transitionDelay: `${i * 80}ms` }}>
                  <li className="group relative border border-dark-border bg-dark-card px-4 py-3.5 text-left transition-colors duration-300 hover:border-gold">
                    {/* number chip + title, inline to keep the card compact */}
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                          <polygon points={HEX_CHIP} fill="#141E2C" stroke="#C8A85C" strokeWidth={4} />
                        </svg>
                        <span className="relative font-display text-[13px] font-bold tabular-nums text-gold">{s.n}</span>
                      </span>
                      <h3 className="font-display text-sm font-bold uppercase tracking-[0.06em] text-dark-hi">{s.title}</h3>
                    </div>
                    <p className="mt-1.5 font-body text-[13.5px] leading-snug text-dark-mid">{s.body}</p>
                  </li>
                </Reveal>
                {/* downward connector between steps */}
                {i < last && (
                  <Reveal
                    style={{ transitionDelay: `${i * 80 + 40}ms` }}
                    className="flex justify-center py-1 text-gold"
                  >
                    <FlowArrow />
                  </Reveal>
                )}
              </Fragment>
            ))}
          </ol>
        </div>
      </div>

      {/* gold bridge bar → hands off into Why Aurelius */}
      <Reveal style={{ transitionDelay: "120ms" }}>
        <div className="mx-auto mt-16 text-center font-display text-[clamp(16px,2vw,24px)] font-bold tracking-[0.04em] text-gold">
          {solution.bridge}
        </div>
      </Reveal>
    </Section>
  );
}
