import Link from "next/link";

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  onLight = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  onLight?: boolean;
}) {
  // Size controls padding + font. `sm` matches the nav links (text-[11px]); `md` keeps text-sm.
  const sizing = size === "sm" ? "px-5 py-2.5 text-[11px]" : "px-8 py-4 text-sm";
  const base = `inline-block font-display font-bold uppercase tracking-[0.15em] ${sizing} transition-colors`;
  // Primary (solid gold + dark text) is safe on both themes. Secondary is gold-outline;
  // on light it must use gold-textL (#8A6F2E) to satisfy the color-spec contrast rule.
  const styles =
    variant === "primary"
      ? "bg-gold text-dark-canvas hover:bg-gold-hoverD"
      : onLight
        ? "border border-gold-textL text-gold-textL hover:bg-gold-textL hover:text-light-canvas"
        : "border border-gold text-gold hover:bg-gold hover:text-dark-canvas";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
