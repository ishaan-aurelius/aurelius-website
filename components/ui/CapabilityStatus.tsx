"use client";
import { useInView } from "@/lib/useInView";
import { whyNow } from "@/content/site";

// Tactical "capability status" board: the four gaps as a failing-systems readout. On
// scroll-in each row's status light ignites, its severity bar fills segment-by-segment to
// the red threshold, and the status tag drops in — staggered per row so it reads like a
// diagnostic boot sequence. Red is used as a *status* color here (failing capabilities),
// which the color spec permits. A single inView trigger drives the whole sequence; under
// reduced motion inView resolves true immediately, so the final degraded state shows at once.

const SEGMENTS = 10;
const ROW_STEP = 130; // ms between rows
const SEG_STEP = 45; // ms between segments lighting up within a row

export function CapabilityStatus() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div ref={ref} className="mx-auto mt-16 max-w-3xl border border-dark-border bg-dark-card/30 text-left">
      {/* header strip — frames the rows as an instrument readout, not another card */}
      <div className="flex items-center justify-between border-b border-dark-border px-4 py-2.5 sm:px-5">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-dark-low">
          Key Pain Points
        </span>
        <span className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-alert-d">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-alert-d" />
          Degraded
        </span>
      </div>

      <div className="divide-y divide-dark-border">
        {whyNow.gaps.map((g, r) => {
          const rowDelay = r * ROW_STEP;
          const tagDelay = rowDelay + SEGMENTS * SEG_STEP;
          return (
            <div
              key={g.em}
              className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5"
            >
              {/* status light + terse copy */}
              <div className="flex items-start gap-3 sm:flex-1">
                <span
                  className={`mt-[0.4em] h-2 w-2 shrink-0 rounded-full bg-alert-d motion-reduce:animate-none ${
                    inView ? "animate-pulse opacity-100" : "opacity-0"
                  }`}
                  style={{
                    boxShadow: "0 0 8px 1px rgba(212,64,64,.7)",
                    transitionDelay: `${rowDelay}ms`,
                  }}
                  aria-hidden="true"
                />
                <p className="font-display text-base leading-relaxed text-dark-mid sm:text-[17px]">
                  {g.pre}
                  <span className="font-bold text-dark-hi">{g.em}</span>
                  {g.post}
                </p>
              </div>

              {/* severity bar + status tag */}
              <div className="flex items-center gap-3 pl-5 sm:pl-0">
                <div className="flex gap-[3px]" aria-hidden="true">
                  {Array.from({ length: SEGMENTS }).map((_, i) => {
                    const lit = i < g.fill;
                    return (
                      <span
                        key={i}
                        className={`h-3.5 w-[5px] sm:w-[7px] ${lit ? "bg-alert-d" : "bg-dark-border/60"}`}
                        style={{
                          opacity: lit ? (inView ? 1 : 0) : 1,
                          transform: lit && !inView ? "scaleY(0.25)" : "scaleY(1)",
                          transformOrigin: "bottom",
                          transition: "opacity .3s ease, transform .3s ease",
                          transitionDelay: `${rowDelay + i * SEG_STEP}ms`,
                          boxShadow: lit && inView ? "0 0 6px rgba(212,64,64,.55)" : "none",
                        }}
                      />
                    );
                  })}
                </div>
                <span
                  className="w-[108px] font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-alert-d transition-opacity duration-500 motion-reduce:transition-none"
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
