import Link from "next/link";

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-block font-display text-sm font-bold uppercase tracking-[0.15em] px-8 py-4 transition-colors";
  const styles =
    variant === "primary"
      ? "bg-gold text-dark-canvas hover:bg-gold-hoverD"
      : "border border-gold text-gold hover:bg-gold hover:text-dark-canvas";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
