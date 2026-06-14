import { solution } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SolutionHex } from "@/components/ui/SolutionHex";

const HEX_CHIP = "25,2 75,2 98,50 75,98 25,98 2,50"; // flat-top, echoes the capability hexes

export function Solution() {
  return (
    <Section id="solution" theme="dark">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{solution.kicker}</Kicker>
        <SectionHeading>
          {solution.headline.pre}
          <span className="text-gold">{solution.headline.gold}</span>
          {solution.headline.post}
        </SectionHeading>
        <p className="mt-6 font-body text-[clamp(16px,1.5vw,19px)] leading-relaxed text-dark-mid">{solution.lede}</p>
      </div>

      {/* the signature hexagon — centered on its own */}
      <div className="mx-auto mt-16 max-w-[460px]">
        <SolutionHex />
      </div>

      {/* the method — horizontal 01–04 row, below the hexagon */}
      <div className="mt-20 text-center">
        <Reveal>
          <Kicker>{solution.methodKicker}</Kicker>
        </Reveal>
        <ol className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {solution.steps.map((s, i) => (
            <Reveal key={s.n} style={{ transitionDelay: `${i * 80}ms` }} className="text-center">
              {/* number chip */}
              <span className="relative mx-auto flex h-10 w-10 items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <polygon points={HEX_CHIP} fill="#141E2C" stroke="#C8A85C" strokeWidth={4} />
                </svg>
                <span className="relative font-display text-sm font-bold tabular-nums text-gold">{s.n}</span>
              </span>
              <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-[0.06em] text-dark-hi">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[28ch] font-body text-[13.5px] leading-relaxed text-dark-mid">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* gold bridge bar → hands off into Why Aurelius */}
      <Reveal style={{ transitionDelay: "120ms" }}>
        <div className="mx-auto mt-16 max-w-5xl bg-gold px-6 py-4 text-center font-display text-sm font-bold uppercase tracking-wide text-[#0D1420] sm:text-[15px]">
          {solution.bridge}
        </div>
      </Reveal>
    </Section>
  );
}
