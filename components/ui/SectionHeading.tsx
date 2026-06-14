// The single source of truth for main section <h2> headlines (Problem, Platform,
// Why Now, Why Aurelius, Contact). Keeps font size / weight / leading / tracking /
// top spacing identical across every section so they can't drift apart again.
// Per-section extras (animation class, alignment, max-width) come in via className.
export function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mt-5 font-display text-[clamp(32px,4.2vw,42px)] font-bold leading-[1.1] tracking-tight text-dark-hi ${className}`}
    >
      {children}
    </h2>
  );
}
