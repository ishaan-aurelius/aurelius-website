"use client";
import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";

export function CountUp({
  value,
  suffix = "",
  durationMs = 1200,
  className = "",
}: {
  value: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3)))); // ease-out cubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs]);
  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}
