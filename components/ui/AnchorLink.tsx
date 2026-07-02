"use client";
import Link from "next/link";

// The fixed nav is 88px tall (matches scroll-margin-top in globals.css). When a
// section is too tall to center, we top-align it just below the nav using this.
const NAV_OFFSET = 88;

/**
 * A hash link (#careers) that scrolls the target section to the CENTER of the
 * viewport instead of the top — but only when it fits. Sections taller than the
 * screen fall back to top-alignment so their heading never scrolls off-screen.
 *
 * Used by both Nav and Footer so the behavior lives in one place. Falls back to
 * default anchor behavior for non-hash hrefs (e.g. "#" = home).
 */
export function AnchorLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  function handleClick(e: React.MouseEvent) {
    // Only intercept in-page section anchors like "#careers", not "#" (home).
    if (href.startsWith("#") && href.length > 1) {
      const el = document.getElementById(href.slice(1));
      if (el) {
        e.preventDefault();

        // Respect the same reduced-motion preference the CSS already honors.
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const behavior: ScrollBehavior = reduce ? "auto" : "smooth";

        const rect = el.getBoundingClientRect();
        const fits = rect.height <= window.innerHeight - NAV_OFFSET;

        if (fits) {
          el.scrollIntoView({ behavior, block: "center" });
        } else {
          const top = window.scrollY + rect.top - NAV_OFFSET;
          window.scrollTo({ top, behavior });
        }

        // Keep the URL hash in sync without triggering a second jump.
        history.replaceState(null, "", href);
      }
    }
    onClick?.();
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
