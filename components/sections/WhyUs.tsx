import { whyUs } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";

const MOAT_COLOR = { platform: "#4AAFB8", operational: "#C8A85C" } as const;

// Render any "10^26" in a string as a properly typeset 10²⁶ with a real superscript.
function withExponents(text: string): React.ReactNode {
  const parts = text.split("10^26");
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <span key={i} className="whitespace-nowrap">
            10<sup className="align-super text-[0.7em]">26</sup>
          </span>,
          part,
        ],
  );
}

export function WhyUs() {
  return (
    <Section id="why-us" theme="dark">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{whyUs.kicker}</Kicker>
        <h2 className="mt-5 font-display text-[clamp(30px,4vw,50px)] font-bold leading-[1.1] tracking-tight text-dark-hi">
          {whyUs.headline.pre}
          <span className="text-gold">{whyUs.headline.gold}</span>
          {whyUs.headline.post}
        </h2>
        <p className="mt-6 font-body text-[clamp(15px,1.4vw,18px)] leading-relaxed text-dark-mid">{whyUs.lede}</p>
      </div>

      {/* the moat — four structural advantages (teal = platform, gold = operational) */}
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.moat.map((m, i) => {
          const color = MOAT_COLOR[m.group];
          return (
            <Reveal
              key={m.title}
              style={{ transitionDelay: `${i * 80}ms`, borderTopColor: color }}
              className="border border-t-2 border-dark-border bg-dark-card p-6"
            >
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color }}>
                {m.tag}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-dark-hi">{m.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {m.points.map((p, j) => (
                  <li key={j} className="flex gap-2.5 font-body text-[13px] leading-relaxed text-dark-mid">
                    <span aria-hidden="true" className="mt-[7px] h-px w-2.5 flex-none" style={{ background: color }} />
                    <span>{withExponents(p)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>

      {/* proof strip — the scale claim */}
      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-dark-border bg-dark-border sm:grid-cols-3">
        {whyUs.proof.map((p) => {
          const numeric = /^\d/.test(p.big);
          const color = p.gold ? "text-gold" : numeric ? "text-teal-d" : "text-dark-hi";
          return (
            <Reveal key={p.label} className="bg-dark-card px-6 py-9 text-center">
              <div className={`font-display text-[clamp(38px,5vw,60px)] font-bold leading-none tabular-nums ${color}`}>
                {p.big}
                {p.exp ? <sup className="align-super text-[0.42em]">{p.exp}</sup> : null}
              </div>
              <div className="mt-4 font-display text-[12px] font-bold uppercase tracking-[0.16em] text-dark-hi">
                {p.label}
              </div>
              <div className="mt-1.5 font-body text-[12.5px] leading-snug text-dark-low">{p.note}</div>
            </Reveal>
          );
        })}
      </div>

      {/* closing statement */}
      <Reveal>
        <p className="mx-auto mt-14 max-w-2xl text-center font-display text-[clamp(20px,2.6vw,30px)] font-bold leading-snug tracking-tight text-gold">
          {whyUs.closing}
        </p>
      </Reveal>

      {/* credentials — who the team is */}
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {whyUs.credentials.map((c, i) => (
          <Reveal
            key={c.title}
            style={{ transitionDelay: `${i * 80}ms` }}
            className="border border-t-2 border-dark-border border-t-gold bg-dark-card p-7 text-center"
          >
            <span className="font-display text-xs font-bold tracking-[0.2em] text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-base font-bold tracking-wide text-dark-hi">{c.title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-dark-mid">{c.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
