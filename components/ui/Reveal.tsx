"use client";
import { useInView } from "@/lib/useInView";

export function Reveal({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} style={style} className={`reveal ${inView ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}
