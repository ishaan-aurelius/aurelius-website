"use client";
import { whyNow } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

const accentClass: Record<string, string> = {
  teal: "text-teal-d",
  hi: "text-dark-hi",
  red: "text-alert-d",
  gold: "text-gold",
};

const withCommas = (n: number) => n.toLocaleString("en-US");

export function WhyNow() {
  return (
    <Section id="why-now" theme="dark">
      <div className="text-center">
        {/* ===== ACT 1 — WHY NOW: the network problem + its drivers ===== */}
        <Reveal>
          <Kicker>{whyNow.whyKicker}</Kicker>
        </Reveal>
        <Reveal style={{ transitionDelay: "80ms" }}>
          <h2 className="mx-auto mt-5 max-w-[16ch] font-display text-[clamp(40px,6vw,68px)] font-bold leading-[1.03] tracking-tight text-dark-hi">
            {whyNow.headline.pre}
            <span className="text-gold">{whyNow.headline.em}</span>
            {whyNow.headline.post}
          </h2>
        </Reveal>

        {/* four tactical headline boxes (titles only) */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {whyNow.drivers.map((d, i) => (
            <Reveal key={d.n} style={{ transitionDelay: `${i * 80}ms` }} className="h-full">
              <div className="group relative flex h-full min-h-[152px] flex-col border border-dark-border bg-dark-card p-5 text-left transition-colors duration-300 hover:border-gold">
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

        {/* ===== beat break ===== */}
        <div className="mx-auto mt-20 h-px max-w-5xl bg-dark-border" />

        {/* ===== ACT 2 — THE SCALE: the data deluge behind the problem ===== */}
        <Reveal>
          <div className="mt-16">
            <Kicker>{whyNow.scaleKicker}</Kicker>
          </div>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 border-y border-dark-border md:grid-cols-4">
          {whyNow.stats.map((s, i) => (
            <Reveal
              key={s.unit}
              style={{ transitionDelay: `${i * 80}ms` }}
              className="border-r border-dark-border px-4 py-9 text-center [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(4n)]:border-r-0"
            >
              <div
                className={`font-display text-[clamp(28px,3.6vw,44px)] font-bold leading-none tabular-nums ${accentClass[s.accent]}`}
              >
                <CountUp target={s.value} format={s.comma ? withCommas : undefined} />
              </div>
              <div className="font-display mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-dark-hi">
                {s.unit}
              </div>
              <div className="mt-1.5 font-body text-[12px] leading-snug text-dark-low">{s.caption}</div>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ transitionDelay: "120ms" }}>
          <p className="mx-auto mt-10 max-w-[34ch] font-display text-[clamp(19px,2.4vw,28px)] font-bold leading-snug tracking-tight text-dark-hi">
            {whyNow.punch1.pre}
            <span className="text-alert-d">{whyNow.punch1.em}</span>
            {whyNow.punch1.post} {whyNow.punch2.pre}
            {whyNow.punch2.em}
            {whyNow.punch2.post}
          </p>
        </Reveal>

        {/* gold bridge bar → hands off into the Solution section */}
        <Reveal style={{ transitionDelay: "120ms" }}>
          <div className="mx-auto mt-16 max-w-5xl bg-gold px-6 py-4 text-center font-display text-sm font-bold uppercase tracking-wide text-[#0D1420] sm:text-[15px]">
            {whyNow.bridge}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
