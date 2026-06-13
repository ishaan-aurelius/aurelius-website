"use client";
import { whyNow } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { KillWeb } from "@/components/ui/KillWeb";

const accentClass: Record<string, string> = {
  teal: "text-teal-d",
  hi: "text-dark-hi",
  red: "text-alert-d",
  gold: "text-gold",
};

const withCommas = (n: number) => n.toLocaleString("en-US");

export function WhyNow() {
  return (
    <Section id="why-now" theme="dark" className="relative overflow-hidden">
      {/* ONE continuous kill-web behind the whole section — ties the scale + why-now
          beats into a single argument. The headline sits in the calm "eye" of the web. */}
      <KillWeb className="opacity-90" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_75%_at_50%_46%,rgba(14,20,31,0.42)_0%,rgba(14,20,31,0.80)_55%,rgba(14,20,31,0.96)_100%)]"
      />

      <div className="relative text-center">
        {/* --- the scale --- */}
        <Reveal>
          <Kicker>{whyNow.scaleKicker}</Kicker>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 border-t border-dark-border md:grid-cols-4">
          {whyNow.stats.map((s, i) => (
            <Reveal
              key={s.unit}
              style={{ transitionDelay: `${i * 80}ms` }}
              className="border-b border-r border-dark-border px-4 py-7 text-center [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(4n)]:border-r-0"
            >
              <div
                className={`font-display text-[clamp(26px,3.4vw,42px)] font-bold leading-none tabular-nums ${accentClass[s.accent]}`}
              >
                <CountUp target={s.value} format={s.comma ? withCommas : undefined} />
              </div>
              <div className="font-display mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-dark-hi">
                {s.unit}
              </div>
              <div className="mt-1.5 font-body text-[11.5px] leading-snug text-dark-low">{s.caption}</div>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ transitionDelay: "120ms" }}>
          <p className="mx-auto mt-10 max-w-[34ch] font-display text-[clamp(19px,2.4vw,28px)] font-bold leading-snug tracking-tight text-dark-hi">
            {whyNow.punch1.pre}
            <span className="text-alert-d">{whyNow.punch1.em}</span>
            {whyNow.punch1.post}{" "}
            {whyNow.punch2.pre}
            <span className="text-gold">{whyNow.punch2.em}</span>
            {whyNow.punch2.post}
          </p>
        </Reveal>

        {/* --- the network problem: the section's centerpiece, in the eye of the web --- */}
        <Reveal style={{ transitionDelay: "80ms" }}>
          <h2 className="mx-auto mt-24 max-w-[15ch] font-display text-[clamp(34px,5.2vw,64px)] font-bold leading-[1.04] tracking-tight text-dark-hi">
            {whyNow.headline.pre}
            <span className="text-gold">{whyNow.headline.em}</span>
            {whyNow.headline.post}
          </h2>
        </Reveal>

        {/* --- why now: four tactical headline boxes (titles only) --- */}
        <Reveal style={{ transitionDelay: "120ms" }}>
          <div className="mt-10">
            <Kicker>{whyNow.whyKicker}</Kicker>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {whyNow.drivers.map((d, i) => (
            <Reveal key={d.n} style={{ transitionDelay: `${i * 80}ms` }} className="h-full">
              <div className="group relative flex h-full flex-col justify-between border border-dark-border bg-dark-canvas/50 p-5 text-left backdrop-blur-sm transition-colors duration-300 hover:border-gold">
                {/* HUD corner brackets — the "cool" tactical reticle accent */}
                <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-gold transition-all duration-300 group-hover:h-4 group-hover:w-4" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-gold transition-all duration-300 group-hover:h-4 group-hover:w-4" />
                <div className="font-display text-xs font-bold tabular-nums text-gold">{d.n}</div>
                <h3 className="mt-8 font-display text-[15px] font-bold uppercase leading-tight tracking-wide text-dark-hi">
                  {d.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>

        {/* gold bridge bar → hands off into the Solution section */}
        <Reveal style={{ transitionDelay: "120ms" }}>
          <div className="mx-auto mt-12 max-w-5xl bg-gold px-6 py-4 text-center font-display text-sm font-bold uppercase tracking-wide text-[#0D1420] sm:text-[15px]">
            {whyNow.bridge}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
