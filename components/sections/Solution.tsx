import { solution } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { pillarIcons } from "@/components/ui/PillarIcons";

export function Solution() {
  return (
    <Section id="solution" theme="dark">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{solution.kicker}</Kicker>
        <h2 className="mt-5 font-display text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.08] tracking-tight text-dark-hi">
          {solution.title}
        </h2>
        <p className="mt-6 font-body text-[clamp(16px,1.5vw,19px)] leading-relaxed text-dark-mid">{solution.lede}</p>
      </div>

      {/* 01–04 steps — alternating image/text rows (Ethos style) */}
      <div className="mt-12 space-y-10 md:space-y-12">
        {solution.steps.map((s, i) => (
          <Reveal
            key={s.n}
            className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8"
          >
            {/* TODO: real image per step — product screenshot / dashboard */}
            <div
              className={`flex aspect-[16/9] items-center justify-center overflow-hidden rounded border border-dashed border-dark-border bg-dark-card text-dark-low ${i % 2 === 1 ? "md:order-2" : ""}`}
              aria-hidden="true"
            >
              <span className="font-body text-sm">Image placeholder</span>
            </div>
            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <div className="font-display text-3xl font-bold leading-none text-gold">{s.n}</div>
              <h3 className="mt-4 font-display text-xl font-bold uppercase leading-tight tracking-wide text-dark-hi">{s.title}</h3>
              <p className="mt-3 font-body text-[15.5px] leading-relaxed text-dark-mid">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* capability pillars — distinct: bordered cards w/ gold top rule + per-pillar icon */}
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {solution.pillars.map((p, i) => {
          const Icon = pillarIcons[i] ?? pillarIcons[0];
          return (
            <Reveal
              key={p.title}
              style={{ transitionDelay: `${i * 80}ms` }}
              className="border border-t-2 border-dark-border border-t-gold bg-dark-card p-7 text-center"
            >
              <Icon className="mx-auto h-7 w-7 text-gold" />
              <h3 className="mt-5 font-display text-base font-bold tracking-wide text-dark-hi">{p.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-dark-mid">{p.body}</p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
