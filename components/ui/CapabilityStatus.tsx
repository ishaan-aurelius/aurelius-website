"use client";
import { useInView } from "@/lib/useInView";
import { whyNow } from "@/content/site";

// Tactical "capability status" board: the six gaps as a failing-systems readout, laid out as a
// 3x2 grid of diagnostic cards. On scroll-in each card's status light ignites, its severity bar
// fills segment-by-segment to the red threshold, and the status tag drops in, staggered per card
// so it reads like a diagnostic boot sequence sweeping across the panel. Red is used as a *status*
// color here (failing capabilities), which the color spec permits. A single inView trigger drives
// the whole sequence; under reduced motion inView resolves true immediately, so the final degraded
// state shows at once.

const SEGMENTS = 10;
const CARD_STEP = 110; // ms between cards igniting
const SEG_STEP = 40; // ms between segments lighting up within a card

// Per-card status tone. Red (`alert`) = runaway/critical; amber (`caution`) = partial/mid-severity
// (below the red threshold). Both are spec status colors. Full class strings (not interpolated) so
// Tailwind's JIT keeps them; `rgb` feeds the inline glow box-shadows.
const TONE = {
  alert: { dot: "bg-alert-d", bar: "bg-alert-d", tag: "text-alert-d", rgb: "212,64,64" },
  caution: { dot: "bg-caution-d", bar: "bg-caution-d", tag: "text-caution-d", rgb: "224,160,48" },
} as const;

export function CapabilityStatus() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref} className="mx-auto mt-10 max-w-5xl text-left">
      {/* header label, frames the grid as one instrument readout, not six loose cards */}
      <div className="flex items-center justify-between border-b border-dark-border px-1 pb-2.5">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-dark-low">
          Key Pain Points
        </span>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {whyNow.gaps.map((g, r) => {
          const cardDelay = r * CARD_STEP;
          const tagDelay = cardDelay + SEGMENTS * SEG_STEP;
          const index = String(r + 1).padStart(2, "0");
          const tone = TONE[g.tone ?? "alert"];
          return (
            <div
              key={g.em}
              className="flex flex-col border border-dark-border bg-dark-card/30 p-4 sm:p-5"
            >
              {/* index + status light */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-dark-low">
                  {index}
                </span>
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${tone.dot} motion-reduce:animate-none ${
                    inView ? "animate-pulse opacity-100" : "opacity-0"
                  }`}
                  style={{
                    boxShadow: `0 0 8px 1px rgba(${tone.rgb},.7)`,
                    transition: "opacity .3s ease",
                    transitionDelay: `${cardDelay}ms`,
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* terse copy, flex-1 pushes the readout to the card's bottom edge */}
              <p className="mt-3 flex-1 font-display text-[15px] leading-relaxed text-dark-mid sm:text-base">
                {g.pre}
                <span className="font-bold text-dark-hi">{g.em}</span>
                {g.post}
              </p>

              {/* severity bar + status tag */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex gap-[3px]" aria-hidden="true">
                  {Array.from({ length: SEGMENTS }).map((_, i) => {
                    const lit = i < g.fill;
                    return (
                      <span
                        key={i}
                        className={`h-3.5 w-[5px] ${lit ? tone.bar : "bg-dark-border/60"}`}
                        style={{
                          opacity: lit ? (inView ? 1 : 0) : 1,
                          transform: lit && !inView ? "scaleY(0.25)" : "scaleY(1)",
                          transformOrigin: "bottom",
                          transition: "opacity .3s ease, transform .3s ease",
                          transitionDelay: `${cardDelay + i * SEG_STEP}ms`,
                          boxShadow: lit && inView ? `0 0 6px rgba(${tone.rgb},.55)` : "none",
                        }}
                      />
                    );
                  })}
                </div>
                <span
                  className={`shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.15em] ${tone.tag} transition-opacity duration-500 motion-reduce:transition-none`}
                  style={{ opacity: inView ? 1 : 0, transitionDelay: `${tagDelay}ms` }}
                >
                  {g.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
