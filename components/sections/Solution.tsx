import { solution } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { SolutionHex } from "@/components/ui/SolutionHex";

export function Solution() {
  return (
    <Section id="solution" theme="dark">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{solution.kicker}</Kicker>
        <h2 className="mt-5 font-display text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.08] tracking-tight text-dark-hi">
          {solution.headline.pre}
          <span className="text-gold">{solution.headline.gold}</span>
          {solution.headline.post}
        </h2>
        <p className="mt-6 font-body text-[clamp(16px,1.5vw,19px)] leading-relaxed text-dark-mid">{solution.lede}</p>
      </div>

      {/* the capability hexagon — the section's signature visual */}
      <SolutionHex />

      {/* the 01–04 method — how a plan actually flows through the platform */}
      <div className="mt-20">
        <Reveal className="text-center">
          <Kicker>{solution.methodKicker}</Kicker>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {solution.steps.map((s, i) => (
            <Reveal
              key={s.n}
              style={{ transitionDelay: `${i * 80}ms` }}
              className="border-t border-dark-border pt-5"
            >
              <div className="font-display text-3xl font-bold leading-none tabular-nums text-gold">{s.n}</div>
              <h3 className="mt-4 font-display text-sm font-bold uppercase leading-tight tracking-wide text-dark-hi">
                {s.title}
              </h3>
              <p className="mt-3 font-body text-[13.5px] leading-relaxed text-dark-mid">{s.body}</p>
            </Reveal>
          ))}
        </div>
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
