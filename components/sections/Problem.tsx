"use client";
import { useEffect, useState } from "react";
import { problem } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { useInView } from "@/lib/useInView";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Count-up on scroll-into-view; jumps straight to the target under reduced-motion.
function CountUp({ target }: { target: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (prefersReduced()) {
      // One-time set when motion is disabled — show the final value, no animation.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic — weighted, no overshoot
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return <span ref={ref}>{val}</span>;
}

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
          <h2 className="wipe-in font-display mx-auto mt-5 max-w-[20ch] text-[clamp(34px,4.6vw,58px)] font-bold leading-[1.06] tracking-tight text-dark-hi">
            {problem.headPre}
            <span className="text-gold">{problem.headGold}</span>
            {problem.headPost}
          </h2>
        </Reveal>

        <Reveal style={{ transitionDelay: "160ms" }}>
          <span className="mx-auto mt-7 block h-px w-12 bg-gold" />
        </Reveal>

        <Reveal style={{ transitionDelay: "220ms" }}>
          <div className="font-mono mx-auto mt-7 max-w-[60ch] text-[12.5px] leading-[2] text-dark-mid">
            <div>
              <span className="text-dark-low">FROM</span> · {problem.brief.from}
            </div>
            <div>
              <span className="text-dark-low">TO</span> · {problem.brief.to}
            </div>
            <div>
              <span className="text-dark-low">SUBJ</span> · {problem.brief.subj}
            </div>
            <div className="mt-2 text-dark-hi">{problem.brief.objective}</div>
            <div className="text-dark-low">{problem.brief.req}</div>
          </div>
        </Reveal>

        <Reveal style={{ transitionDelay: "300ms" }}>
          <div className="mt-9">
            <Countdown start={problem.clock.start} label={problem.clock.label} />
          </div>
        </Reveal>

        <Reveal style={{ transitionDelay: "380ms" }}>
          <div className="mt-14 grid grid-cols-2 border-t border-dark-border md:grid-cols-4">
            {problem.stats.map((s) => (
              <div
                key={s.label}
                className="border-b border-r border-dark-border px-4 py-7 text-center [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(4n)]:border-r-0"
              >
                <div className={`font-mono text-[clamp(32px,4.6vw,52px)] font-bold leading-none tabular-nums ${accentClass[s.accent]}`}>
                  <CountUp target={s.value} />
                </div>
                <div className="font-display mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-dark-low">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* punchline → bridges to the Solution section */}
        <Reveal style={{ transitionDelay: "120ms" }}>
          <p className="font-display mx-auto mt-16 max-w-[24ch] text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.12] tracking-tight text-dark-hi">
            {problem.punchPre}
            <span className="text-alert-d">{problem.punchRed}</span>
            {problem.punchPost}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
