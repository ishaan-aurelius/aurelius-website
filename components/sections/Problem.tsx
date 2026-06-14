"use client";
import { problem } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

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
      </div>
    </Section>
  );
}
