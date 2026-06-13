"use client";
import { useEffect, useState } from "react";
import { problem } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { useInView } from "@/lib/useInView";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const toSecs = (hms: string) => {
  const [h, m, s] = hms.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};
const fmt = (secs: number) => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
};

// Live countdown: ticks every second once in view (the clock is running).
function Countdown({ start, label }: { start: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [secs, setSecs] = useState(() => toSecs(start));
  useEffect(() => {
    if (!inView || prefersReduced()) return;
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [inView]);
  return (
    <div ref={ref} className="inline-block border border-dark-border bg-dark-card px-8 py-3 text-center">
      <span className="font-display block text-[10px] font-bold uppercase tracking-[0.25em] text-dark-low">
        {label}
      </span>
      <span className="font-mono mt-1 block text-2xl tabular-nums tracking-[0.06em] text-alert-d">
        {fmt(secs)}
      </span>
    </div>
  );
}

const accentClass: Record<string, string> = {
  teal: "text-teal-d",
  gold: "text-gold",
  hi: "text-dark-hi",
};

export function Problem() {
  return (
    <Section id="problem" theme="dark" className="relative overflow-hidden">
      {/* ambient telemetry — very faint live-feed texture drifting behind the top of the section */}
      <div
        aria-hidden="true"
        className="font-mono pointer-events-none absolute inset-x-0 top-0 hidden h-[45%] select-none overflow-hidden text-[10px] leading-[2.2] text-dark-card opacity-40 md:block [mask-image:linear-gradient(to_bottom,black_0%,transparent_60%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_60%)]"
      >
        <pre className="telemetry-drift whitespace-pre px-6 text-center">
          {[...problem.telemetry, ...problem.telemetry].join("\n")}
        </pre>
      </div>

      <div className="relative text-center">
        <Reveal>
          <Kicker>{problem.kicker}</Kicker>
        </Reveal>

        <Reveal style={{ transitionDelay: "80ms" }}>
          <SectionHeading className="wipe-in mx-auto max-w-[24ch]">
            {problem.head.pre}
            <span className="text-gold">{problem.head.gold}</span>
            {problem.head.mid}
            <span className="text-alert-d">{problem.head.red}</span>
            {problem.head.post}
          </SectionHeading>
        </Reveal>

        <Reveal style={{ transitionDelay: "160ms" }}>
          <span className="mx-auto mt-6 block h-px w-10 bg-gold" />
        </Reveal>

        {/* comms brief (left, two aligned columns) + countdown pulled to the right */}
        <Reveal style={{ transitionDelay: "220ms" }}>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-start gap-6 text-left sm:flex-row sm:items-center sm:justify-between">
            <div className="font-mono text-[11px] leading-[1.7] text-dark-mid">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4">
                <dt className="text-dark-low">FROM</dt>
                <dd>{problem.brief.from}</dd>
                <dt className="text-dark-low">TO</dt>
                <dd>{problem.brief.to}</dd>
                <dt className="text-dark-low">SUBJ</dt>
                <dd>{problem.brief.subj}</dd>
              </dl>
              <p className="mt-2.5 text-dark-hi">{problem.brief.objective}</p>
              <p className="text-dark-low">{problem.brief.req}</p>
            </div>
            <Countdown start={problem.clock.start} label={problem.clock.label} />
          </div>
        </Reveal>

        <Reveal style={{ transitionDelay: "380ms" }}>
          <div className="mt-12 grid grid-cols-2 border-t border-dark-border md:grid-cols-4">
            {problem.stats.map((s) => (
              <div
                key={s.label}
                className="border-b border-r border-dark-border px-4 py-7 text-center [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(4n)]:border-r-0"
              >
                <div className={`font-mono text-[clamp(34px,4.8vw,58px)] font-bold leading-none tabular-nums ${accentClass[s.accent]}`}>
                  <CountUp target={s.value} />
                </div>
                <div className="font-display mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-dark-low">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
