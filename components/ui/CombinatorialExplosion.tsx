"use client";
import { useInView } from "@/lib/useInView";
import { KillWeb } from "@/components/ui/KillWeb";
import { CountUp } from "@/components/ui/CountUp";
import { whyNow } from "@/content/site";

const { lead, factors, resultExp, resultLabel, resultLine } = whyNow.explosion;

// Beat 2 of Why Now: the bridge from "drowning in data" (Scale) to "too many possible
// plans". On scroll-in, the inherited kill-web detonates (blooms sparse→dense), the input
// factors multiply in one-by-one, and the count races to 10^26, the decision space no
// human can hold. Sequencing is driven off a single inView trigger with staggered delays,
// mirroring the Reveal pattern used across the site. Reduced motion: inView resolves true
// immediately and CountUp jumps to its target, so the final state shows with no animation.
export function CombinatorialExplosion() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const step = 160; // ms between staggered reveals
  const resultDelay = (factors.length + 1) * step;

  return (
    <div ref={ref} className="relative mt-20 overflow-hidden py-16 sm:py-24">
      {/* detonating web, inherited from Scale, blooms from sparse+dim to dense+bright */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-all duration-[1400ms] ease-out motion-reduce:transition-none ${
          inView ? "scale-100 opacity-70" : "scale-90 opacity-20"
        }`}
      >
        <KillWeb density={3.2} />
      </div>

      {/* shockwave ring, one-shot expand + fade as the web detonates */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/40 transition-all duration-[1200ms] ease-out motion-reduce:hidden ${
          inView ? "scale-[6] opacity-0" : "scale-50 opacity-60"
        }`}
      />

      {/* radial vignette so foreground copy stays legible over the dense web */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(13,20,32,.9) 0%, rgba(13,20,32,.5) 55%, rgba(13,20,32,0) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* lead, the multiplication insight */}
        <p
          className={`mx-auto max-w-2xl text-balance font-display text-base font-medium leading-relaxed text-dark-hi transition-all duration-700 motion-reduce:transition-none sm:text-lg ${
            inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {lead.pre}
          <span className="text-gold">{lead.em}</span>
          {lead.post}
        </p>

        {/* factor row, data inputs multiply in, staggered, then "=" */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
          {factors.map((f, i) => (
            <div key={f.label} className="flex items-center gap-x-3">
              {i > 0 && (
                <span
                  className={`font-display text-xl font-bold text-dark-low transition-opacity duration-500 motion-reduce:transition-none ${
                    inView ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * step}ms` }}
                  aria-hidden="true"
                >
                  ×
                </span>
              )}
              <div
                className={`flex min-w-[84px] flex-col items-center border border-dark-border bg-dark-card/80 px-4 py-3 transition-all duration-500 motion-reduce:transition-none ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: `${i * step}ms` }}
              >
                <span className="font-display text-2xl font-bold tabular-nums text-teal-d">{f.display}</span>
                <span className="mt-1 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-dark-low">
                  {f.label}
                </span>
              </div>
            </div>
          ))}
          <span
            className={`font-display text-xl font-bold text-dark-low transition-opacity duration-500 motion-reduce:transition-none ${
              inView ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: `${factors.length * step}ms` }}
            aria-hidden="true"
          >
            =
          </span>
        </div>

        {/* detonation payoff, giant 10^26, exponent counts 0→26 */}
        <div
          className={`mt-12 transition-all duration-700 motion-reduce:transition-none ${
            inView ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
          style={{ transitionDelay: `${resultDelay}ms` }}
        >
          <div className="font-display font-extrabold leading-none text-gold">
            <span className="text-[clamp(64px,12vw,140px)] tabular-nums">10</span>
            <sup className="ml-1 align-super text-[clamp(28px,5vw,56px)] tabular-nums">
              {inView ? <CountUp target={resultExp} duration={1400} /> : 0}
            </sup>
          </div>
          <div className="mt-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-dark-low">
            {resultLabel}
          </div>
        </div>

        {/* closing line */}
        <p
          className={`mx-auto mt-8 max-w-xl text-balance font-display text-base font-medium leading-relaxed text-dark-hi transition-all duration-700 motion-reduce:transition-none sm:text-lg ${
            inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionDelay: `${resultDelay + 200}ms` }}
        >
          {resultLine.pre}
          <span className="text-gold">{resultLine.em}</span>
          {resultLine.post}
        </p>
      </div>
    </div>
  );
}
