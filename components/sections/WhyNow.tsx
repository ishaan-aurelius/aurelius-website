"use client";
import { whyNow, problem } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CapabilityStatus } from "@/components/ui/CapabilityStatus";

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

        {/* six key pain points — merged driver boxes + status readout into one board */}
        <CapabilityStatus />
      </div>

      {/* ===== ACT 2 — THE PROBLEM: merged into this section (no dividing border) ===== */}
      {/* own relative/overflow context so the telemetry stays pinned behind the problem block, not WhyNow */}
      <div className="relative mt-24 overflow-hidden md:mt-32">
        {/* ambient telemetry — very faint live-feed texture drifting behind the top of the block */}
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
            <SectionHeading className="wipe-in mx-auto max-w-[24ch]">
              {problem.head.pre}
              <span className="text-gold">{problem.head.gold}</span>
              {problem.head.mid}
              <span className="text-alert-d">{problem.head.red}</span>
              {problem.head.post}
            </SectionHeading>
          </Reveal>

          <Reveal style={{ transitionDelay: "80ms" }}>
            <p className="mx-auto mt-6 max-w-[42ch] font-display text-lg leading-relaxed text-dark-mid">
              {problem.sub.pre}
              <span className="font-bold text-gold">{problem.sub.em}</span>
              {problem.sub.post}
            </p>
          </Reveal>

          <Reveal style={{ transitionDelay: "160ms" }}>
            <span className="mx-auto mt-6 block h-px w-10 bg-gold" />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
