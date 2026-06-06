import { whyNow } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export function WhyNow() {
  return (
    <Section id="why-now" theme="darkAlt">
      <Kicker>{whyNow.kicker}</Kicker>
      <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(32px,4.2vw,52px)] font-bold leading-[1.1] tracking-tight text-dark-hi">
        {whyNow.title}
      </h2>
      <p className="mt-6 max-w-[62ch] font-body text-[clamp(16px,1.5vw,19px)] leading-relaxed text-dark-mid">{whyNow.lede}</p>

      {/* divided stat line w/ count-up */}
      <div className="mt-14 grid grid-cols-2 border border-dark-border bg-dark-card lg:grid-cols-4">
        {whyNow.stats.map((s, i) => (
          <div
            key={s.caption}
            className={`flex flex-col p-7 ${i % 2 !== 0 ? "border-l border-dark-border" : ""} ${i >= 2 ? "border-t border-dark-border" : ""} lg:border-t-0 ${i !== 0 ? "lg:border-l lg:border-dark-border" : ""}`}
          >
            <div className="flex items-baseline whitespace-nowrap font-display text-[clamp(26px,2.3vw,34px)] font-bold leading-none text-teal-d">
              {s.value !== null ? (
                <CountUp value={s.value} suffix={s.suffix ?? ""} />
              ) : (
                <span className="text-gold">{s.text}</span>
              )}
              {s.unit && <span className="ml-2 text-xs tracking-[0.12em] text-gold">{s.unit}</span>}
            </div>
            <div className="mt-auto pt-3 font-body text-xs leading-snug text-dark-low">{s.caption}</div>
          </div>
        ))}
      </div>

      {/* points — editorial 2-col list, NOT cards */}
      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        {whyNow.points.map((p, i) => (
          <Reveal key={p.title} style={{ transitionDelay: `${i * 70}ms` }} className="border-t border-dark-border pt-5">
            <h3 className="font-display text-base font-bold uppercase tracking-wide text-gold">{p.title}</h3>
            <p className="mt-2 max-w-[48ch] font-body text-sm leading-relaxed text-dark-mid">{p.body}</p>
          </Reveal>
        ))}
      </div>

      <p className="mt-12 max-w-[60ch] font-body text-lg text-dark-hi">{whyNow.closing}</p>
    </Section>
  );
}
