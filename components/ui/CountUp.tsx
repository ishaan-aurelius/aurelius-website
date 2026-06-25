"use client";
import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Count-up on scroll-into-view; jumps straight to the target under reduced-motion.
// `format` optionally transforms the displayed value (e.g. thousands separators).
export function CountUp({
  target,
  from = 0,
  format = (n) => String(n),
  duration = 4000,
  display,
}: {
  target: number;
  // Starting value of the count-up. Defaults to 0; set higher to climb a smaller
  // span (e.g. 1,000,000 → 2,000,000) and emphasize the magnitude already in play.
  from?: number;
  format?: (n: number) => string;
  duration?: number;
  // When set, render this literal string instead of an animated number
  // (for non-numeric stats like "MONTHS"). Keeps the stat row visually uniform.
  display?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (display !== undefined) return;
    if (!inView) return;
    if (prefersReduced()) {
      // One-time set when motion is disabled, show the final value, no animation.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic, weighted, no overshoot
      setVal(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, target, duration, display]);
  return <span ref={ref}>{display !== undefined ? display : format(val)}</span>;
}
