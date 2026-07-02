import { Container } from "./Container";

type Theme = "dark" | "darkAlt" | "light";

const themeClass: Record<Theme, string> = {
  dark: "bg-dark-canvas text-dark-mid border-t border-dark-border",
  darkAlt: "bg-dark-canvasAlt text-dark-mid border-t border-dark-border",
  light: "bg-light-canvas text-light-mid border-t border-light-border",
};

export function Section({
  id,
  theme,
  children,
  className = "",
  fullHeight = false,
}: {
  id?: string;
  theme: Theme;
  children: React.ReactNode;
  className?: string;
  // When true, the section fills at least the viewport and centers its content
  // vertically. This makes AnchorLink top-align it (it no longer "fits"), so
  // jumping here shows only this section — no neighbors peeking at top/bottom.
  fullHeight?: boolean;
}) {
  const heightClass = fullHeight ? "flex min-h-[70vh] flex-col justify-center" : "";
  return (
    <section id={id} className={`${themeClass[theme]} ${heightClass} py-20 md:py-32 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
