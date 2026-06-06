import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurelius — Velocity Meets Clarity in Modern Conflict",
  description:
    "AI-native mission engineering. Aurelius turns the hardest military planning problems into decision advantage — mission plans in minutes, not months.",
  openGraph: {
    title: "Aurelius — AI-Native Mission Engineering",
    description: "Decision advantage at machine speed. Mission plans in minutes, not months.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1420",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">{children}</body>
    </html>
  );
}
