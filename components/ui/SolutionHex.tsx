import Image from "next/image";
import { solution } from "@/content/site";
import { hexIcons } from "@/components/ui/HexIcons";
import { Reveal } from "@/components/ui/Reveal";

// Symmetric hex-flower: six capabilities evenly ringed (60° apart) around the
// center logo hex. Center coords as % of the square box.
const POS: Record<string, { x: number; y: number }> = {
  killweb: { x: 50, y: 20 },
  multidomain: { x: 76, y: 35 },
  interop: { x: 76, y: 65 },
  clarity: { x: 50, y: 80 },
  strategic: { x: 24, y: 65 },
  speed: { x: 24, y: 35 },
};

const COLOR = { platform: "#4AAFB8", operational: "#C8A85C" } as const;
const HEX = "25,2 75,2 98,50 75,98 25,98 2,50"; // flat-top hexagon

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

export function SolutionHex() {
  const caps = solution.capabilities;

  return (
    <div>
      {/* legend — keys the hex color coding, anchored to the cluster */}
      <div className="flex items-center justify-center gap-6 font-display text-[11px] font-bold uppercase tracking-[0.18em] lg:justify-start">
        <span className="flex items-center gap-2 text-teal-d">
          <span className="h-2.5 w-2.5" style={{ background: COLOR.platform }} /> Platform
        </span>
        <span className="flex items-center gap-2 text-gold">
          <span className="h-2.5 w-2.5" style={{ background: COLOR.operational }} /> Operational
        </span>
      </div>

      {/* static hex flower (md+) */}
      <Reveal className="relative mx-auto mt-7 hidden aspect-square w-full max-w-[460px] md:block">
        {caps.map((c) => {
          const Icon = hexIcons[c.key];
          const color = COLOR[c.group];
          return (
            <div
              key={c.key}
              className="absolute h-[33%] w-[33%] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${POS[c.key].x}%`, top: `${POS[c.key].y}%` }}
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <polygon points={HEX} fill={rgba(color, 0.08)} stroke={color} strokeWidth={1.25} />
              </svg>
              <span
                className="absolute left-1/2 top-1/2 flex w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
                style={{ color }}
              >
                {Icon ? <Icon className="h-7 w-7" /> : null}
                <span className="font-display text-[10px] font-bold uppercase leading-[1.2] tracking-[0.06em]">
                  {c.title}
                </span>
              </span>
            </div>
          );
        })}

        {/* center logo hex — the "core" the capabilities ring */}
        <div className="absolute left-1/2 top-1/2 z-10 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            style={{ filter: `drop-shadow(0 0 10px ${rgba("#C8A85C", 0.35)})` }}
          >
            <polygon points={HEX} fill="#141E2C" stroke="#C8A85C" strokeWidth={1.5} />
          </svg>
          <Image
            src="/aurelius-website/logo-mark.png"
            alt="Aurelius"
            width={56}
            height={47}
            className="absolute left-1/2 top-1/2 h-auto w-[46%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </Reveal>

      {/* mobile fallback — capability cards (the absolute flower needs room) */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:hidden">
        {caps.map((c, i) => {
          const Icon = hexIcons[c.key];
          const color = COLOR[c.group];
          return (
            <Reveal
              key={c.key}
              style={{ transitionDelay: `${i * 60}ms`, borderTopColor: color }}
              className="border border-t-2 border-dark-border bg-dark-card p-4 text-center"
            >
              {Icon ? (
                <span className="inline-flex" style={{ color }}>
                  <Icon className="h-5 w-5" />
                </span>
              ) : null}
              <h4 className="mt-3 font-display text-[12px] font-bold uppercase leading-tight tracking-wide" style={{ color }}>
                {c.title}
              </h4>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
