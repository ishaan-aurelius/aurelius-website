"use client";
import { FaBolt, FaGlobeAmericas, FaDragon, FaLandmark } from "react-icons/fa";
import type { IconType } from "react-icons";
import { scale } from "@/content/site";
import { KillWeb } from "@/components/ui/KillWeb";
import { AssetField, ASSETS } from "@/components/ui/AssetField";
import { CountUp } from "@/components/ui/CountUp";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { worldMapSvg } from "@/lib/worldMap";

// per-column accent → text color token (matches the slide exactly)
const accentClass: Record<string, string> = {
  teal: "text-teal-d",
  red: "text-alert-d",
  gold: "text-gold",
};

const iconFor: Record<string, IconType> = {
  bolt: FaBolt,
  globe: FaGlobeAmericas,
  dragon: FaDragon,
  landmark: FaLandmark,
};

// Central radar reticle, concentric gold arcs + hexagon with a soft glow,
// sitting behind the middle of the stat row like the slide's dial. Decorative.
function Reticle() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,168,92,0.16) 0%, rgba(200,168,92,0) 62%)" }}
      />
      <svg width="360" height="360" viewBox="0 0 360 360" fill="none" stroke="#C8A85C">
        {/* broken concentric rings */}
        <circle cx="180" cy="180" r="150" strokeWidth="1" strokeOpacity="0.22" strokeDasharray="180 60" />
        <circle cx="180" cy="180" r="120" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="300 70" />
        <circle cx="180" cy="180" r="120" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="300 70" transform="rotate(180 180 180)" />
        <circle cx="180" cy="180" r="92" strokeWidth="1" strokeOpacity="0.28" />
        {/* hexagon core */}
        <polygon
          points="180,116 235,148 235,212 180,244 125,212 125,148"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
        <polygon
          points="180,140 214,160 214,200 180,220 146,200 146,160"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
      </svg>
    </div>
  );
}

export function Scale() {
  return (
    <section
      id="scale"
      className="relative overflow-hidden border-t border-dark-border bg-dark-canvas py-20 md:py-28"
    >
      {/* dotted world map, decorative, dimmed */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(worldMapSvg)}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      {/* radial depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(26,40,56,.55) 0%, rgba(13,20,32,1) 72%)" }}
        aria-hidden="true"
      />
      {/* living network, edges meet at the military-asset icons (shared anchors) */}
      <KillWeb className="opacity-60" anchors={ASSETS} density={2.6} />
      {/* military-asset silhouettes, drawn ON the network nodes, above the edges */}
      <AssetField />
      {/* central radar dial */}
      <Reticle />

      <div className="relative mx-auto w-full max-w-container px-6 md:px-12">
        {/* centered title block, kicker + headline, matching every other section */}
        <Reveal className="text-center">
          <Kicker>{scale.kicker}</Kicker>
        </Reveal>
        {/* headline, sentence case, matches every other section's SectionHeading */}
        <Reveal style={{ transitionDelay: "60ms" }}>
          <SectionHeading className="mx-auto max-w-5xl text-center">
            {scale.headline.pre}
            <span className="text-gold">{scale.headline.gold}</span>
            {scale.headline.post}
          </SectionHeading>
        </Reveal>

        {/* four stat columns */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-10">
          {scale.stats.map((s, i) => {
            const Icon = iconFor[s.icon];
            const color = accentClass[s.accent];
            return (
              <Reveal key={s.unit} style={{ transitionDelay: `${i * 90}ms` }} className="text-center">
                <Icon className={`mx-auto mb-4 h-7 w-7 ${color}`} aria-hidden="true" />
                <div className={`font-display text-[clamp(40px,6vw,64px)] font-extrabold leading-none tabular-nums ${color}`}>
                  <CountUp target={s.value} />
                </div>
                <div className="mt-5 font-display text-[clamp(14px,1.4vw,19px)] font-bold tracking-[0.08em] text-dark-hi">
                  {s.unit}
                </div>
                <p className="mx-auto mt-3 max-w-[26ch] font-body text-[13px] leading-snug text-dark-low">
                  {s.caption}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* gold punch line */}
        <Reveal style={{ transitionDelay: "120ms" }}>
          <p className="mt-20 text-center font-display text-[clamp(16px,2vw,24px)] font-bold tracking-[0.04em] text-gold">
            {scale.punch}
          </p>
        </Reveal>

        {/* gold bottom line */}
        <Reveal style={{ transitionDelay: "160ms" }}>
          <p className="mt-10 text-center font-display text-[clamp(16px,2vw,24px)] font-bold tracking-[0.04em] text-gold">
            {scale.bottomLine}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
