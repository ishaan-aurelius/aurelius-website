"use client";
import { useState } from "react";
import { solution } from "@/content/site";
import { hexIcons } from "@/components/ui/HexIcons";
import { BrandMark } from "@/components/ui/BrandMark";
import { Reveal } from "@/components/ui/Reveal";

// Center coords (% of the square box) per capability — a hex flower around the brand mark.
const POS: Record<string, { x: number; y: number }> = {
  killweb: { x: 50, y: 15 },
  multidomain: { x: 80, y: 32 },
  interop: { x: 80, y: 68 },
  clarity: { x: 50, y: 85 },
  strategic: { x: 20, y: 68 },
  speed: { x: 20, y: 32 },
};

const COLOR = { platform: "#4AAFB8", operational: "#C8A85C" } as const;
const HEX_POINTS = "25,5 75,5 97,50 75,95 25,95 3,50";

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

export function SolutionHex() {
  const caps = solution.capabilities;
  const [active, setActive] = useState<string>(caps[0].key);
  const activeCap = caps.find((c) => c.key === active) ?? caps[0];
  const activeColor = COLOR[activeCap.group];

  return (
    <div className="mt-12">
      {/* legend */}
      <div className="flex items-center justify-center gap-7 font-display text-[11px] font-bold uppercase tracking-[0.18em]">
        <span className="flex items-center gap-2 text-teal-d">
          <span className="h-2.5 w-2.5" style={{ background: COLOR.platform }} /> Platform
        </span>
        <span className="flex items-center gap-2 text-gold">
          <span className="h-2.5 w-2.5" style={{ background: COLOR.operational }} /> Operational
        </span>
      </div>

      {/* DESKTOP — interactive hex flower */}
      <Reveal className="relative mx-auto mt-8 hidden aspect-square w-full max-w-[600px] md:block">
        {/* dashed connectors from the center mark to each capability */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {caps.map((c) => (
            <line
              key={c.key}
              x1="50"
              y1="50"
              x2={POS[c.key].x}
              y2={POS[c.key].y}
              stroke="#2A3E55"
              strokeWidth="0.35"
              strokeDasharray="1.4 1.4"
            />
          ))}
        </svg>

        {/* center brand mark hex */}
        <div className="absolute left-1/2 top-1/2 z-10 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <polygon points={HEX_POINTS} fill="#141E2C" stroke="#C8A85C" strokeWidth="1.5" />
          </svg>
          <BrandMark className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 text-gold" />
        </div>

        {/* the six capability hexes */}
        {caps.map((c) => {
          const Icon = hexIcons[c.key];
          const color = COLOR[c.group];
          const isActive = c.key === active;
          return (
            <button
              key={c.key}
              type="button"
              onMouseEnter={() => setActive(c.key)}
              onFocus={() => setActive(c.key)}
              aria-pressed={isActive}
              aria-label={`${c.title}: ${c.note}`}
              className="group absolute h-[31%] w-[31%] -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none"
              style={{ left: `${POS[c.key].x}%`, top: `${POS[c.key].y}%` }}
            >
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full transition-[filter] duration-300"
                style={{ filter: isActive ? `drop-shadow(0 0 9px ${rgba(color, 0.55)})` : "none" }}
                aria-hidden="true"
              >
                <polygon
                  points={HEX_POINTS}
                  fill={rgba(color, isActive ? 0.16 : 0.06)}
                  stroke={color}
                  strokeWidth={isActive ? 2.2 : 1.2}
                  className="transition-all duration-300"
                />
              </svg>
              <span
                className="absolute left-1/2 top-1/2 flex w-[78%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center"
                style={{ color }}
              >
                {Icon ? <Icon className="h-6 w-6" /> : null}
                <span className="font-display text-[11px] font-bold uppercase leading-[1.15] tracking-[0.08em]">
                  {c.title}
                </span>
              </span>
            </button>
          );
        })}
      </Reveal>

      {/* DESKTOP — caption bar (updates on hover/focus) */}
      <div
        aria-live="polite"
        className="mx-auto mt-8 hidden min-h-[52px] max-w-2xl items-center justify-center gap-3 border-t border-dark-border pt-5 text-center md:flex"
      >
        <span className="font-display text-sm font-bold uppercase tracking-wide" style={{ color: activeColor }}>
          {activeCap.title}
        </span>
        <span className="text-dark-border">—</span>
        <span className="font-body text-[15px] leading-snug text-dark-mid">{activeCap.note}</span>
      </div>

      {/* MOBILE — stacked card grid (no absolute flower) */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:hidden">
        {caps.map((c, i) => {
          const Icon = hexIcons[c.key];
          const color = COLOR[c.group];
          return (
            <Reveal
              key={c.key}
              style={{ transitionDelay: `${i * 60}ms`, borderTopColor: color }}
              className="border border-t-2 border-dark-border bg-dark-card p-4"
            >
              {Icon ? <span style={{ color }}><Icon className="h-5 w-5" /></span> : null}
              <h4 className="mt-3 font-display text-[12px] font-bold uppercase leading-tight tracking-wide" style={{ color }}>
                {c.title}
              </h4>
              <p className="mt-2 font-body text-[12px] leading-relaxed text-dark-mid">{c.note}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
