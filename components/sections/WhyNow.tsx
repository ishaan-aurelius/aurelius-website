import { whyNow } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";

export function WhyNow() {
  return (
    <Section id="why-now" theme="dark">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{whyNow.kicker}</Kicker>
        <h2 className="mt-5 font-display text-[clamp(32px,4.2vw,52px)] font-bold leading-[1.1] tracking-tight text-dark-hi">
          {whyNow.title}
        </h2>
        <p className="mt-6 font-body text-[clamp(16px,1.5vw,19px)] leading-relaxed text-dark-mid">{whyNow.lede}</p>
      </div>

      {/* points — editorial 2-col list, NOT cards */}
      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        {whyNow.points.map((p, i) => (
          <Reveal key={p.title} style={{ transitionDelay: `${i * 70}ms` }} className="border-t border-dark-border pt-5 text-center">
            <h3 className="font-display text-base font-bold uppercase tracking-wide text-gold">{p.title}</h3>
            <p className="mx-auto mt-2 max-w-[48ch] font-body text-sm leading-relaxed text-dark-mid">{p.body}</p>
          </Reveal>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-[60ch] text-center font-body text-lg text-dark-hi">{whyNow.closing}</p>
    </Section>
  );
}
