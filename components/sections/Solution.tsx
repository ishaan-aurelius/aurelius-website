import { solution } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { BrandMark } from "@/components/ui/BrandMark";

export function Solution() {
  return (
    <Section id="solution" theme="light">
      <Kicker onLight>{solution.kicker}</Kicker>
      <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.08] tracking-tight text-light-hi">
        {solution.title}
      </h2>
      <p className="mt-6 max-w-[62ch] font-body text-[clamp(16px,1.5vw,19px)] leading-relaxed text-light-mid">{solution.lede}</p>

      {/* 01–04 divided steps */}
      <div className="mt-16 grid grid-cols-1 border-t border-light-border sm:grid-cols-2 lg:grid-cols-4">
        {solution.steps.map((s, i) => (
          <Reveal
            key={s.n}
            style={{ transitionDelay: `${i * 80}ms` }}
            className={`border-b border-light-border p-8 lg:border-b-0 ${i === 0 ? "lg:pl-0" : "lg:border-l lg:border-light-border"}`}
          >
            <div className="font-display text-sm font-bold tracking-[0.2em] text-gold-textL">{s.n}</div>
            <h3 className="mt-10 font-display text-lg font-bold uppercase leading-tight tracking-wide text-light-hi">{s.title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-light-mid">{s.body}</p>
          </Reveal>
        ))}
      </div>

      {/* capability pillars — distinct: bordered cards w/ gold top rule + peak mark */}
      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {solution.pillars.map((p, i) => (
          <Reveal
            key={p.title}
            style={{ transitionDelay: `${i * 80}ms` }}
            className="border border-t-2 border-light-border border-t-gold bg-light-card p-7 shadow-sm"
          >
            <BrandMark className="h-6 w-6 text-gold-textL" />
            <h3 className="mt-5 font-display text-base font-bold tracking-wide text-light-hi">{p.title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-light-mid">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
