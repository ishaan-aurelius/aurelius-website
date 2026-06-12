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
    <Section id="why-us" theme="dark">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{whyUs.kicker}</Kicker>
        <h2 className="mt-5 font-display text-[clamp(32px,4.2vw,52px)] font-bold leading-[1.1] tracking-tight text-dark-hi">
          {whyUs.title}
        </h2>
      </div>

      {/* narrative + supporting image */}
      <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          {whyUs.narrative.map((para, i) => (
            <p key={i} className="font-body text-[15.5px] leading-relaxed text-dark-mid">
              {withExponents(para)}
            </p>
          ))}
        </div>
        {/* TODO: real image — command-center / mission-planning photo */}
        <div
          className="flex aspect-[4/3] items-center justify-center self-start overflow-hidden rounded border border-dashed border-dark-border bg-dark-card text-dark-low"
          aria-hidden="true"
        >
          <span className="font-body text-sm">Image placeholder</span>
        </div>
      </div>

      {/* credentials */}
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {whyUs.credentials.map((c, i) => (
          <Reveal
            key={c.title}
            style={{ transitionDelay: `${i * 80}ms` }}
            className="border border-t-2 border-dark-border border-t-gold bg-dark-card p-8 text-center"
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
