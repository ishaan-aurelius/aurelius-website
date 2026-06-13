import { solution } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { SolutionHex } from "@/components/ui/SolutionHex";

const HEX_CHIP = "25,2 75,2 98,50 75,98 25,98 2,50"; // flat-top, echoes the capability hexes

export function Solution() {
  const last = solution.steps.length - 1;
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

      {/* two columns — the capability hexagon (left) and the 01–04 method (right) */}
      <div className="mt-16 grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* LEFT — the signature hexagon */}
        <SolutionHex />

        {/* RIGHT — the method, a vertical numbered spine */}
        <div>
          <Reveal>
            <Kicker>{solution.methodKicker}</Kicker>
          </Reveal>
          <ol className="mt-7">
            {solution.steps.map((s, i) => (
              <Reveal
                key={s.n}
                style={{ transitionDelay: `${i * 80}ms` }}
                className="flex gap-5"
              >
                {/* number chip + connecting spine */}
                <div className="flex flex-col items-center">
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                      <polygon points={HEX_CHIP} fill="#141E2C" stroke="#C8A85C" strokeWidth={4} />
                    </svg>
                    <span className="relative font-display text-sm font-bold tabular-nums text-gold">{s.n}</span>
                  </span>
                  {i < last && <span className="mt-2 w-px flex-1 bg-dark-border" />}
                </div>
                {/* content */}
                <div className={`pt-1.5 ${i < last ? "pb-9" : ""}`}>
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.06em] text-dark-hi">{s.title}</h3>
                  <p className="mt-2 font-body text-[13.5px] leading-relaxed text-dark-mid">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
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
