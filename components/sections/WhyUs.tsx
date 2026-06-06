import { whyUs } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";

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
    <Section id="why-us" theme="light">
      <Kicker onLight>{whyUs.kicker}</Kicker>
      <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(32px,4.2vw,52px)] font-bold leading-[1.1] tracking-tight text-light-hi">
        {whyUs.title}
      </h2>

      {/* narrative + number-strip proof */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          {whyUs.narrative.map((para, i) => (
            <p key={i} className="font-body text-[15.5px] leading-relaxed text-light-mid">
              {withExponents(para)}
            </p>
          ))}
        </div>
        <div className="self-start border border-light-border bg-light-card p-7 shadow-sm">
          {whyUs.proof.map((p, i) => (
            <div key={p.label} className={`py-5 ${i !== whyUs.proof.length - 1 ? "border-b border-light-border" : ""}`}>
              <div className={`font-display text-3xl font-bold leading-tight ${p.gold ? "text-gold-textL" : "text-teal-l"}`}>
                {p.big}
                {p.exp && <sup className="align-super text-[0.55em]">{p.exp}</sup>}
              </div>
              <div className="mt-1 font-display text-xs uppercase tracking-[0.15em] text-gold-textL">{p.label}</div>
              <div className="mt-1 font-body text-xs text-light-low">{p.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* credentials — distinct treatment from Solution pillars: left gold rule, indexed, no glyph */}
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {whyUs.credentials.map((c, i) => (
          <Reveal
            key={c.title}
            style={{ transitionDelay: `${i * 80}ms` }}
            className="border-l-2 border-light-border border-l-gold bg-light-card p-8 shadow-sm"
          >
            <span className="font-display text-xs font-bold tracking-[0.2em] text-gold-textL">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-base font-bold tracking-wide text-light-hi">{c.title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-light-mid">{c.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
