"use client";
import { whyNow } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function WhyNow() {
  return (
    <Section id="why-now" theme="dark">
      <div className="text-center">
        {/* ===== ACT 1 — WHY NOW: the network problem + its drivers ===== */}
        <Reveal>
          <Kicker>{whyNow.whyKicker}</Kicker>
        </Reveal>
        <Reveal style={{ transitionDelay: "80ms" }}>
          <SectionHeading className="mx-auto">
            {whyNow.headline.pre}
            <span className="text-gold">{whyNow.headline.em}</span>
            {whyNow.headline.post}
          </SectionHeading>
        </Reveal>

        {/* four tactical headline boxes (titles only) */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {whyNow.drivers.map((d, i) => (
            <Reveal key={d.n} style={{ transitionDelay: `${i * 80}ms` }} className="h-full">
              <div className="group relative flex h-full min-h-[112px] flex-col border border-dark-border bg-dark-card p-5 text-left transition-colors duration-300 hover:border-gold sm:min-h-[152px]">
                {/* HUD corner brackets — inset so they read as a deliberate reticle accent */}
                <span className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-gold transition-all duration-300 group-hover:h-5 group-hover:w-5" />
                <span className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-gold transition-all duration-300 group-hover:h-5 group-hover:w-5" />
                <div className="font-display text-xs font-bold tabular-nums text-gold">{d.n}</div>
                <h3 className="mt-auto pt-6 font-display text-[15px] font-bold uppercase leading-tight tracking-[0.04em] text-dark-hi">
                  {d.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>

        {/* combinatorial problem space no human can hold */}
        <Reveal>
          <p className="mx-auto mt-16 max-w-2xl text-balance font-display text-base font-medium leading-relaxed tracking-[0.01em] text-dark-hi sm:text-lg">
            {whyNow.network.caption.pre}
            <span className="text-gold">{whyNow.network.caption.em}</span>
            {whyNow.network.caption.mid}
            <sup className="text-[0.65em] font-bold tabular-nums">{whyNow.network.caption.exp}</sup>
            {whyNow.network.caption.post}
          </p>
        </Reveal>

      </div>
    </Section>
  );
}
