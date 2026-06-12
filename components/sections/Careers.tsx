import { careers } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Careers() {
  return (
    <Section id="careers" theme="dark">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{careers.kicker}</Kicker>
        <h2 className="mt-5 font-display text-[clamp(32px,4.2vw,52px)] font-bold leading-[1.1] tracking-tight text-dark-hi">
          {careers.title}
        </h2>
        <p className="mt-6 font-body text-[clamp(16px,1.5vw,19px)] leading-relaxed text-dark-mid">{careers.lede}</p>
      </div>

      {/* uniform 4-up cards — the one intentionally consistent grid */}
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {careers.pillars.map((p, i) => (
          <Reveal
            key={p.title}
            style={{ transitionDelay: `${i * 80}ms` }}
            className="border border-t-2 border-dark-border border-t-gold bg-dark-card p-7 text-center"
          >
            <h3 className="font-display text-base font-bold tracking-wide text-gold">{p.title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-dark-mid">{p.body}</p>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 text-center font-body text-base text-dark-hi">{careers.closing}</p>
      <div className="mt-6 text-center">
        <Button href={careers.cta.href} variant="primary">
          {careers.cta.label}
        </Button>
      </div>
    </Section>
  );
}
