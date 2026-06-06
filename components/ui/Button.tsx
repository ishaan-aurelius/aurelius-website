import Link from "next/link";

export function Button({
  href,
  children,
  variant = "primary",
  onLight = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onLight?: boolean;
}) {
  const base =
    "inline-block font-display text-sm font-bold uppercase tracking-[0.15em] px-8 py-4 transition-colors";
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
