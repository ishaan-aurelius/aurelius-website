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
}: {
  id?: string;
  theme: Theme;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`${themeClass[theme]} py-20 md:py-32 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
