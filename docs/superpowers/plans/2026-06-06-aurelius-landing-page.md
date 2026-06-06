# Aurelius Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Aurelius single-page marketing site (DIU audience) per the approved design spec — Next.js + Tailwind + D-DIN, eight sections with alternating dark/light themes and light scroll motion.

**Architecture:** Section components composed in one page, sitting on a small set of deep shared primitives (`Section`, `Container`, `Kicker`, `Button`, `Reveal`, `CountUp`, `BrandMark`). All copy lives in `content/site.ts`. Theme rhythm is owned solely by `Section`. Color tokens come from `References/aurelius-color-spec.md` via `tailwind.config.ts`.

**Tech Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v3 · CSS transitions + Intersection Observer for motion · `dotted-map` for the hero map · Vitest for the small test layer.

**Note on TDD scope:** Visual section components are verified by build + dev-server inspection (expected outcomes stated per task), not unit tests — testing pixels is low-value. Genuine logic (form validation, content integrity, count-up formatting) IS unit-tested first, TDD-style.

---

## File map

```
app/layout.tsx          # fonts, metadata, favicon, global shell
app/page.tsx            # composes the 8 sections
app/globals.css         # tailwind directives + @font-face (D-DIN) + keyframes
components/sections/    # Nav Hero Solution WhyNow WhyUs Careers Contact Footer (.tsx)
components/ui/          # Section Container Kicker Button Reveal CountUp BrandMark (.tsx)
content/site.ts         # all copy + stats (typed)
lib/useInView.ts        # Intersection Observer hook
lib/worldMap.ts         # generates the dotted world-map SVG string
lib/validation.ts       # contact form validation (pure, tested)
tailwind.config.ts      # color tokens + font families
public/fonts/           # D-DIN woff2 files (see Task 2)
public/logo-*.svg       # logos (see Task 2)
test/                   # vitest specs
```

---

## Task 1: Scaffold Next.js + Tailwind

**Files:**
- Create: project scaffold in repo root (`package.json`, `app/`, `tsconfig.json`, etc.)

- [ ] **Step 1: Scaffold Next.js into the current repo (keeps existing docs/References)**

Run:
```bash
npx create-next-app@latest . --ts --eslint --app --no-src-dir --no-tailwind --import-alias "@/*" --use-npm --no-turbopack
```
If prompted that the directory is not empty, choose to continue — our `CLAUDE.md`, `References/`, `docs/`, and `*.png` files are not Next.js files and will be preserved.
Expected: `app/`, `package.json`, `tsconfig.json` created; existing files untouched.

- [ ] **Step 2: Install Tailwind v3 + deps**

Run:
```bash
npm install -D tailwindcss@^3.4 postcss autoprefixer
npm install dotted-map
npx tailwindcss init -p
```
Expected: `tailwind.config.js`, `postcss.config.js` created; `dotted-map` in dependencies.

- [ ] **Step 3: Replace tailwind.config with a typed config (Task 3 fills tokens) — rename to .ts**

Run:
```bash
git rm -f --cached tailwind.config.js 2>/dev/null; rm -f tailwind.config.js
```
(We create `tailwind.config.ts` in Task 3.)

- [ ] **Step 4: Verify dev server boots**

Run: `npm run dev` then open `http://localhost:3000`
Expected: default Next page loads with no errors. Stop the server (Ctrl-C).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js + Tailwind + dotted-map"
```

---

## Task 2: Fonts + logos + globals.css

**Files:**
- Create: `public/fonts/` (D-DIN files), `public/logo-wordmark.svg`, `public/logo-mark.svg`
- Modify: `app/globals.css`

- [ ] **Step 1: Add the D-DIN font files**

Place `D-DIN.woff2`, `D-DIN-Bold.woff2`, and `D-DINExp.woff2`, `D-DINExp-Bold.woff2` in `public/fonts/`.
**Licensing note:** D-DIN is free for commercial use (PARACHUTE / Datto release). Obtain `.woff2` from a license-clean source (e.g. fontsource or the official release). If files are not yet available, the `@font-face` below falls back to a system stack so the build still works — replace the fallback before production.

- [ ] **Step 2: Add logos as SVG (or PNG fallback)**

Convert `Logo Wordy.png` → `public/logo-wordmark.svg` and `Logo Graphic.png` → `public/logo-mark.svg` (e.g. via an online raster→SVG trace, or export from the source vector if available). If SVG is not ready, copy the PNGs to `public/logo-wordmark.png` / `public/logo-mark.png` and adjust the `<Image>` `src` in Task 7/14.

- [ ] **Step 3: Write globals.css**

Replace `app/globals.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* D-DIN — self-hosted. Fallbacks keep the build working before files land. */
@font-face {
  font-family: "D-DIN";
  src: url("/fonts/D-DIN.woff2") format("woff2");
  font-weight: 400; font-display: swap;
}
@font-face {
  font-family: "D-DIN";
  src: url("/fonts/D-DIN-Bold.woff2") format("woff2");
  font-weight: 700; font-display: swap;
}
@font-face {
  font-family: "D-DIN Exp";
  src: url("/fonts/D-DINExp.woff2") format("woff2");
  font-weight: 400; font-display: swap;
}
@font-face {
  font-family: "D-DIN Exp";
  src: url("/fonts/D-DINExp-Bold.woff2") format("woff2");
  font-weight: 700; font-display: swap;
}

html { scroll-behavior: smooth; }
body { background: #0D1420; -webkit-font-smoothing: antialiased; }

/* Scroll-reveal: initial hidden state + animated-in state (Reveal toggles .is-in) */
.reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
.reveal.is-in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 4: Verify build still compiles**

Run: `npm run dev` → open `http://localhost:3000` → no console/build errors. Stop server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add D-DIN @font-face, logos, global styles + reveal CSS"
```

---

## Task 3: Tailwind tokens (color + fonts)

**Files:**
- Create: `tailwind.config.ts`

- [ ] **Step 1: Write tailwind.config.ts with tokens from the color spec**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          canvas: "#0D1420",
          canvasAlt: "#141E2C",
          card: "#1A2838",
          border: "#2A3E55",
          hi: "#C8D4DE",
          mid: "#A0B8C8",
          low: "#6A859A",
        },
        light: {
          canvas: "#F5F6F8",
          card: "#FFFFFF",
          border: "#E4E7EC",
          hi: "#1A1F2A",
          mid: "#4A5060",
          low: "#6B7280",
        },
        gold: {
          DEFAULT: "#C8A85C",
          hoverD: "#DFC87C",
          hoverL: "#B8983C",
          textL: "#8A6F2E",
        },
        teal: { d: "#4AAFB8", l: "#0D8B92" },
        alert: { d: "#D44040", l: "#A82828" },
      },
      fontFamily: {
        display: ['"D-DIN Exp"', '"D-DIN"', "system-ui", "sans-serif"],
        body: ['"D-DIN"', '"Helvetica Neue"', "system-ui", "sans-serif"],
      },
      maxWidth: { container: "1160px" },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Verify Tailwind picks up the config**

Add a throwaway `<div className="text-gold font-display">test</div>` to `app/page.tsx`, run `npm run dev`, confirm gold D-DIN text renders, then remove it.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: tailwind color + font tokens from color spec"
```

---

## Task 4: content/site.ts (all copy)

**Files:**
- Create: `content/site.ts`

- [ ] **Step 1: Write the typed content module**

```ts
// All site copy. Edit text here — never in layout.
export const nav = {
  links: [
    { label: "Solution", href: "#solution" },
    { label: "Why Now", href: "#why-now" },
    { label: "Why Us", href: "#why-us" },
    { label: "Careers", href: "#careers" },
  ],
  primary: { label: "Request a Demo", href: "#contact" },
  secondary: { label: "Contact Us", href: "#contact" },
};

export const hero = {
  kicker: "AI-Native Mission Engineering",
  headPre: "Velocity meets clarity in ",
  headGold: "modern conflict",
  headPost: ".",
  sub: "Aurelius turns the hardest military planning problems into decision advantage — mission plans in minutes, not months.",
  primary: { label: "Request a Demo", href: "#contact" },
  secondary: { label: "Contact Us", href: "#contact" },
};

export const solution = {
  kicker: "The Solution",
  title: "Mission plans in minutes — not months.",
  lede: "A kill-web optimized, multi-domain platform spanning mission planning to in-mission execution. It doesn't make the decision — it gives commanders the best possible map of the decision space before the window closes.",
  steps: [
    { n: "01", title: "Understand the Mission", body: "Large language models interpret commander intent and doctrine into structured, objective-based planning logic." },
    { n: "02", title: "Model the Options", body: "Advanced optimization computes courses of action at combinatorial scale — across every domain, asset, and constraint — beyond what any human staff process can parse." },
    { n: "03", title: "Evaluate the Scenarios", body: "Stack-ranked, pareto-optimal courses of action — trade-offs, constraints, and consequences surfaced in real time, backtested against existing supply chains." },
    { n: "04", title: "Empower the Commander", body: "Human decision-makers stay in control — armed with clarity, speed, and actionable foresight." },
  ],
  pillars: [
    { title: "Kill-Web Architected", body: "Built ground-up for the network problem modern defense has become — not retrofitted onto legacy systems." },
    { title: "Zero Legacy, AI-First", body: "Layered data architecture deploys across on-prem, cloud, and edge — no rip-and-replace required." },
    { title: "Human-in-the-Loop", body: "Designed to enhance, not replace, commanders' judgment under pressure." },
    { title: "Strategic to Operational", body: "One platform from theater-level planning down to in-mission replanning as conditions change." },
  ],
};

export const whyNow = {
  kicker: "Why Now",
  title: "Advantage belongs to the fastest decider",
  lede: "The side that can decide, adapt, and act faster than the fight unfolds — wins. Today's battlespace by the numbers:",
  stats: [
    { value: 2, suffix: "M", unit: "GB / DAY", caption: "Sensor data per theater, per day" },
    { value: 90, suffix: "", unit: "SECONDS", caption: "Mach 5 hypersonic reaction window" },
    { value: 10, suffix: "K", unit: "STREAMS", caption: "Monitored at once by a command center" },
    { value: null, text: "MONTHS", unit: "", caption: "To plan one mission, in one domain, today" },
  ] as { value: number | null; suffix?: string; text?: string; unit: string; caption: string }[],
  points: [
    { title: "Multi-Domain Warfare", body: "Land, sea, air, space, cyber: decisions must now span all domains, simultaneously and in sync, across multiple commands." },
    { title: "The Kill Web", body: "The kill chain has become a kill web. Distributed warfighting demands AI-native, human-machine teaming — faster, smarter command and control." },
    { title: "Budget Tailwinds", body: "FY26 U.S. defense spending of $962B and NATO commitments rising toward 5% of GDP prioritize AI, autonomy, and C2ISR." },
    { title: "GenAI Isn't Enough", body: "Language models alone weren't built for decision-making. Aurelius fuses GenAI with deep optimization to operate where others can't." },
  ],
  closing: "Decision latency is no longer a tolerable risk — it's a battlefield liability.",
};

export const whyUs = {
  kicker: "Why Us",
  title: "GenAI-native mission planning, at massive scale",
  narrative: [
    "Aurelius is a US GenAI-native mission planning company built for the era of kill chains and kill webs. We enable generals, commanders, and planners to develop, evaluate, and action mission plans at massive scale — warfighting, asset deployment, logistics, and beyond.",
    "Our proprietary platform, built in close cooperation with the US military and US primes, is multi-domain end to end. It produces four distinct, head-to-head comparable courses of action from nearly 10^26 possibilities — 100 trillion trillion, and no, that's not a typo — evaluated and ready to action in minutes.",
    "Our mission space extends beyond the military to the wider defense domain, including all forms of critical civilian infrastructure. The engine underneath is inherently dual-use: the same decision technology applies to logistics, drug discovery, financial services, and other massive sectors.",
    "We are currently bidding for US defense contracts in partnership with a US prime and a major US defense-tech company, and gearing up for NATO opportunities.",
  ],
  proof: [
    { big: "10²⁶", label: "Possible COAs", note: "100 trillion trillion. Not a typo.", gold: false },
    { big: "4", label: "Ranked Plans Delivered", note: "Distinct, comparable, actionable.", gold: true },
    { big: "MINUTES", label: "Not Months", note: "From intent to executable plan.", gold: false },
  ],
  credentials: [
    { title: "Silicon Valley DNA", body: "Seasoned technologists who launched iconic products used by billions — and led over $200B of M&A across tech and travel." },
    { title: "Military Leadership", body: "Retired 4-star US Generals, members of high-profile US military advisory councils, and leadership roles in US military AI innovation." },
    { title: "Prime-Grade Engineering", body: "Key simulation engineering experts from major US primes — the people who build and validate systems at defense scale." },
  ],
};

export const careers = {
  kicker: "Careers",
  title: "Build the decision engine",
  lede: "We're fusing GenAI, optimization, and real-world mission logic into software that can change the trajectory of conflict. If you can think clearly in complexity, design for pressure, and build for deployment — we want to talk.",
  pillars: [
    { title: "Real-World Impact", body: "What you build may shape future outcomes." },
    { title: "Elite Team", body: "Work alongside technologists, military strategists, and product minds who've operated at the edge of AI, conflict, and scale." },
    { title: "Zero Bureaucracy", body: "Small, fast, high-autonomy teams. No layers. No fluff." },
    { title: "Dual-Use Future", body: "Help pioneer decision intelligence for defense and beyond." },
  ],
  closing: "No defense experience required. Just intellectual firepower, AI wizardry, and operational focus.",
  cta: { label: "Join Us", href: "#contact" },
};

export const contact = {
  kicker: "Contact",
  title: "Start the conversation",
  lede: "Investors, partners, and builders — reach out.",
  email: "contact@aurelius.guru",
};

export const footer = {
  tagline: "AI-Native Mission Engineering",
  copyright: "© 2026 Aurelius. All rights reserved.",
};
```

- [ ] **Step 2: Commit**

```bash
git add content/site.ts
git commit -m "feat: site content module (copy + stats)"
```

---

## Task 5: Test setup + content integrity test

**Files:**
- Create: `test/content.test.ts`, `vitest.config.ts`
- Modify: `package.json` (test script)

- [ ] **Step 1: Install Vitest**

Run: `npm install -D vitest`

- [ ] **Step 2: Add vitest config**

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
export default defineConfig({ test: { environment: "node", include: ["test/**/*.test.ts"] } });
```

- [ ] **Step 3: Add test script to package.json**

In `package.json` `"scripts"`, add: `"test": "vitest run"`.

- [ ] **Step 4: Write the failing content integrity test**

`test/content.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { nav, solution, whyNow, whyUs, careers } from "@/content/site";

describe("site content", () => {
  it("nav has the four required links", () => {
    expect(nav.links.map((l) => l.label)).toEqual(["Solution", "Why Now", "Why Us", "Careers"]);
  });
  it("each grouping has exactly four items", () => {
    expect(solution.steps).toHaveLength(4);
    expect(solution.pillars).toHaveLength(4);
    expect(whyNow.stats).toHaveLength(4);
    expect(whyNow.points).toHaveLength(4);
    expect(careers.pillars).toHaveLength(4);
  });
  it("why-us proof has three entries with one gold", () => {
    expect(whyUs.proof).toHaveLength(3);
    expect(whyUs.proof.filter((p) => p.gold)).toHaveLength(1);
  });
});
```

- [ ] **Step 5: Add the `@/*` alias for vitest**

In `vitest.config.ts`, add resolve alias:
```ts
import { defineConfig } from "vitest/config";
import path from "node:path";
export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: { environment: "node", include: ["test/**/*.test.ts"] },
});
```

- [ ] **Step 6: Run the test**

Run: `npm test`
Expected: PASS (3 tests).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "test: vitest setup + content integrity"
```

---

## Task 6: Contact validation (pure, TDD)

**Files:**
- Create: `lib/validation.ts`, `test/validation.test.ts`

- [ ] **Step 1: Write the failing test**

`test/validation.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { validateContact } from "@/lib/validation";

describe("validateContact", () => {
  it("flags empty required fields", () => {
    const e = validateContact({ name: "", org: "", email: "", message: "" });
    expect(e.name).toBeTruthy();
    expect(e.email).toBeTruthy();
    expect(e.message).toBeTruthy();
  });
  it("rejects a malformed email", () => {
    const e = validateContact({ name: "A", org: "DIU", email: "nope", message: "hi there" });
    expect(e.email).toBeTruthy();
  });
  it("passes a valid submission with no errors", () => {
    const e = validateContact({ name: "A", org: "DIU", email: "a@b.gov", message: "Let's talk." });
    expect(Object.keys(e)).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run it to verify failure**

Run: `npm test`
Expected: FAIL ("validateContact is not a function" / module not found).

- [ ] **Step 3: Implement validation**

`lib/validation.ts`:
```ts
export type ContactInput = { name: string; org: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (!input.name.trim()) e.name = "Name is required.";
  if (!input.email.trim()) e.email = "Email is required.";
  else if (!EMAIL.test(input.email)) e.email = "Enter a valid email.";
  if (!input.message.trim()) e.message = "Message is required.";
  return e;
}
```

- [ ] **Step 4: Run the test**

Run: `npm test`
Expected: PASS (all validation + content tests).

- [ ] **Step 5: Commit**

```bash
git add lib/validation.ts test/validation.test.ts
git commit -m "feat: contact form validation (tested)"
```

---

## Task 7: useInView hook + Reveal + CountUp

**Files:**
- Create: `lib/useInView.ts`, `components/ui/Reveal.tsx`, `components/ui/CountUp.tsx`

- [ ] **Step 1: Write the Intersection Observer hook**

`lib/useInView.ts`:
```ts
"use client";
import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.2 }) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setInView(true); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, opts);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}
```

- [ ] **Step 2: Write Reveal**

`components/ui/Reveal.tsx`:
```tsx
"use client";
import { useInView } from "@/lib/useInView";

export function Reveal({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} style={style} className={`reveal ${inView ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Write CountUp**

`components/ui/CountUp.tsx`:
```tsx
"use client";
import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";

export function CountUp({ value, suffix = "", durationMs = 1200, className = "" }: { value: number; suffix?: string; durationMs?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(value); return; }
    let raf = 0; const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3)))); // ease-out cubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs]);
  return <span ref={ref} className={className}>{n}{suffix}</span>;
}
```

- [ ] **Step 4: Verify typecheck/build**

Run: `npm run build`
Expected: compiles with no type errors. (If `build` is slow, `npx tsc --noEmit` is enough.)

- [ ] **Step 5: Commit**

```bash
git add lib/useInView.ts components/ui/Reveal.tsx components/ui/CountUp.tsx
git commit -m "feat: useInView hook, Reveal, CountUp"
```

---

## Task 8: Layout primitives (Section, Container, Kicker, Button, BrandMark)

**Files:**
- Create: `components/ui/Container.tsx`, `Section.tsx`, `Kicker.tsx`, `Button.tsx`, `BrandMark.tsx`

- [ ] **Step 1: Container**

`components/ui/Container.tsx`:
```tsx
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-container px-6 md:px-12 ${className}`}>{children}</div>;
}
```

- [ ] **Step 2: Section (owns theme rhythm)**

`components/ui/Section.tsx`:
```tsx
import { Container } from "./Container";

type Theme = "dark" | "darkAlt" | "light";

const themeClass: Record<Theme, string> = {
  dark: "bg-dark-canvas text-dark-mid border-t border-dark-border",
  darkAlt: "bg-dark-canvasAlt text-dark-mid border-t border-dark-border",
  light: "bg-light-canvas text-light-mid border-t border-light-border",
};

export function Section({ id, theme, children, className = "" }: { id?: string; theme: Theme; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`${themeClass[theme]} py-20 md:py-32 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
```

- [ ] **Step 3: Kicker (theme-aware gold)**

`components/ui/Kicker.tsx`:
```tsx
export function Kicker({ children, onLight = false }: { children: React.ReactNode; onLight?: boolean }) {
  // Gold text fails contrast on light → use goldTextL on light sections (color spec §5).
  const color = onLight ? "text-gold-textL" : "text-gold";
  return (
    <span className={`font-display block text-xs font-bold uppercase tracking-[0.3em] ${color}`}>
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Button (gold solid / gold ghost — never red)**

`components/ui/Button.tsx`:
```tsx
import Link from "next/link";

export function Button({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  const base = "inline-block font-display text-sm font-bold uppercase tracking-[0.15em] px-8 py-4 transition-colors";
  const styles =
    variant === "primary"
      ? "bg-gold text-dark-canvas hover:bg-gold-hoverD"
      : "border border-gold text-gold hover:bg-gold hover:text-dark-canvas";
  return <Link href={href} className={`${base} ${styles}`}>{children}</Link>;
}
```

- [ ] **Step 5: BrandMark (decorative peak motif)**

`components/ui/BrandMark.tsx`:
```tsx
export function BrandMark({ className = "" }: { className?: string }) {
  // Rounded triangular "A" peak from the logo geometry — decorative accent only.
  return (
    <svg viewBox="0 0 64 56" fill="none" className={className} aria-hidden="true">
      <path d="M32 6 L58 50 a6 6 0 0 1-5 6 H11 a6 6 0 0 1-5-6 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 6: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add components/ui
git commit -m "feat: Section/Container/Kicker/Button/BrandMark primitives"
```

---

## Task 9: Nav

**Files:**
- Create: `components/sections/Nav.tsx`

- [ ] **Step 1: Write Nav**

`components/sections/Nav.tsx`:
```tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 backdrop-blur transition-colors ${scrolled ? "bg-dark-canvas/92 border-b border-dark-border" : "bg-dark-canvas/40"}`}>
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4 md:px-12">
        <Link href="#" className="flex items-center gap-3">
          <Image src="/logo-mark.svg" alt="" width={32} height={28} priority />
          <Image src="/logo-wordmark.svg" alt="Aurelius" width={120} height={20} priority />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => (
            <Link key={l.href} href={l.href} className="font-body text-sm text-dark-mid hover:text-dark-hi">{l.label}</Link>
          ))}
          <Button href={nav.secondary.href} variant="secondary">{nav.secondary.label}</Button>
          <Button href={nav.primary.href} variant="primary">{nav.primary.label}</Button>
        </div>
        <button className="md:hidden text-dark-hi" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
      </div>
      {open && (
        <div className="md:hidden border-t border-dark-border bg-dark-canvas px-6 py-4">
          {nav.links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 font-body text-dark-mid">{l.label}</Link>
          ))}
          <div className="mt-3"><Button href={nav.primary.href} variant="primary">{nav.primary.label}</Button></div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Temporarily render Nav in page.tsx and visually verify**

Replace `app/page.tsx` body with `<main><Nav /><div className="h-[200vh]" /></main>` (import Nav). Run `npm run dev`. Expected: sticky dark nav, logo left, links + two gold buttons right; gains a border after scrolling 24px; hamburger appears below `md`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Nav.tsx app/page.tsx
git commit -m "feat: sticky nav with scroll state + mobile menu"
```

---

## Task 10: Hero (dark) + dotted world map

**Files:**
- Create: `lib/worldMap.ts`, `components/sections/Hero.tsx`

- [ ] **Step 1: Generate the dotted world-map SVG**

`lib/worldMap.ts`:
```ts
import DottedMap from "dotted-map";

// Computed once at module load (server side). Returns an inline SVG string.
const map = new DottedMap({ height: 60, grid: "diagonal" });
export const worldMapSvg = map.getSVG({
  radius: 0.22,
  color: "#A0B8C8",
  shape: "circle",
  backgroundColor: "transparent",
});
```

- [ ] **Step 2: Write Hero (server component; embeds the map, CSS-only entrance)**

`components/sections/Hero.tsx`:
```tsx
import { hero } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { worldMapSvg } from "@/lib/worldMap";

export function Hero() {
  return (
    <header className="relative flex min-h-screen items-center overflow-hidden bg-dark-canvas">
      {/* dotted world map, masked + dimmed */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_65%_45%,black_0%,transparent_70%)]"
        style={{ backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(worldMapSvg)}")`, backgroundSize: "cover", backgroundPosition: "center" }}
        aria-hidden="true"
      />
      {/* radial glow */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 72% 32%, rgba(26,40,56,.7) 0%, rgba(13,20,32,1) 62%)" }} aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-container px-6 md:px-12">
        <Kicker>{hero.kicker}</Kicker>
        <h1 className="mt-7 max-w-[16ch] font-display text-[clamp(44px,6vw,76px)] font-bold leading-[1.04] tracking-tight text-dark-hi">
          {hero.headPre}<span className="text-gold">{hero.headGold}</span>{hero.headPost}
        </h1>
        <p className="mt-7 max-w-[60ch] font-body text-[clamp(17px,1.7vw,21px)] leading-relaxed text-dark-mid">{hero.sub}</p>
        <div className="mt-11 flex flex-wrap gap-4">
          <Button href={hero.primary.href} variant="primary">{hero.primary.label}</Button>
          <Button href={hero.secondary.href} variant="secondary">{hero.secondary.label}</Button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Render in page + verify**

In `app/page.tsx`: `<main><Nav /><Hero /></main>`. Run `npm run dev`. Expected: full-height dark hero, dotted continents faintly visible top-right, radial glow, gold "modern conflict", two buttons. No white band below (next section not added yet).

- [ ] **Step 4: Commit**

```bash
git add lib/worldMap.ts components/sections/Hero.tsx app/page.tsx
git commit -m "feat: hero with generated dotted world map"
```

---

## Task 11: Solution (light)

**Files:**
- Create: `components/sections/Solution.tsx`

- [ ] **Step 1: Write Solution**

`components/sections/Solution.tsx`:
```tsx
import { solution } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { BrandMark } from "@/components/ui/BrandMark";

export function Solution() {
  return (
    <Section id="solution" theme="light">
      <Kicker onLight>{solution.kicker}</Kicker>
      <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.08] tracking-tight text-light-hi">{solution.title}</h2>
      <p className="mt-6 max-w-[62ch] font-body text-[clamp(16px,1.5vw,19px)] leading-relaxed text-light-mid">{solution.lede}</p>

      {/* 01–04 divided steps */}
      <div className="mt-16 grid grid-cols-1 border-t border-light-border sm:grid-cols-2 lg:grid-cols-4">
        {solution.steps.map((s, i) => (
          <Reveal key={s.n} style={{ transitionDelay: `${i * 80}ms` }}
            className={`p-8 ${i === 0 ? "lg:pl-0" : "lg:border-l lg:border-light-border"} border-b border-light-border lg:border-b-0`}>
            <div className="font-display text-sm font-bold tracking-[0.2em] text-gold-textL">{s.n}</div>
            <h3 className="mt-10 font-display text-lg font-bold uppercase leading-tight tracking-wide text-light-hi">{s.title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-light-mid">{s.body}</p>
          </Reveal>
        ))}
      </div>

      {/* capability pillars — distinct: bordered cards w/ gold top rule + peak mark */}
      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {solution.pillars.map((p, i) => (
          <Reveal key={p.title} style={{ transitionDelay: `${i * 80}ms` }}
            className="border border-light-border border-t-2 border-t-gold bg-light-card p-7 shadow-sm">
            <BrandMark className="h-6 w-6 text-gold-textL" />
            <h3 className="mt-5 font-display text-base font-bold tracking-wide text-light-hi">{p.title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-light-mid">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Render + verify**

Add `<Solution />` after `<Hero />`. Run dev. Expected: white section, airy; 01–04 in a divided row (text padded off the dividers); four bordered pillar cards with gold top-rule below; items fade/slide in on scroll.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Solution.tsx app/page.tsx
git commit -m "feat: Solution section (steps + pillars)"
```

---

## Task 12: Why Now (dark)

**Files:**
- Create: `components/sections/WhyNow.tsx`

- [ ] **Step 1: Write WhyNow**

`components/sections/WhyNow.tsx`:
```tsx
import { whyNow } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export function WhyNow() {
  return (
    <Section id="why-now" theme="darkAlt">
      <Kicker>{whyNow.kicker}</Kicker>
      <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(32px,4.2vw,52px)] font-bold leading-[1.1] tracking-tight text-dark-hi">{whyNow.title}</h2>
      <p className="mt-6 max-w-[62ch] font-body text-[clamp(16px,1.5vw,19px)] leading-relaxed text-dark-mid">{whyNow.lede}</p>

      {/* divided stat line w/ count-up */}
      <div className="mt-14 grid grid-cols-2 border border-dark-border bg-dark-card lg:grid-cols-4">
        {whyNow.stats.map((s, i) => (
          <div key={s.caption} className={`p-7 ${i % 2 !== 0 ? "border-l border-dark-border" : ""} ${i >= 2 ? "border-t border-dark-border" : ""} lg:border-t-0 ${i !== 0 ? "lg:border-l lg:border-dark-border" : ""}`}>
            <div className="font-display text-[34px] font-bold leading-none text-teal-d">
              {s.value !== null ? <><CountUp value={s.value} suffix={s.suffix ?? ""} /></> : <span className="text-gold">{s.text}</span>}
              {s.unit && <span className="ml-2 align-baseline text-sm tracking-[0.15em] text-gold">{s.unit}</span>}
            </div>
            <div className="mt-3 font-body text-xs leading-snug text-dark-low">{s.caption}</div>
          </div>
        ))}
      </div>

      {/* points — editorial 2-col list, NOT cards */}
      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        {whyNow.points.map((p, i) => (
          <Reveal key={p.title} style={{ transitionDelay: `${i * 70}ms` }} className="border-t border-dark-border pt-5">
            <h3 className="font-display text-base font-bold uppercase tracking-wide text-gold">{p.title}</h3>
            <p className="mt-2 max-w-[48ch] font-body text-sm leading-relaxed text-dark-mid">{p.body}</p>
          </Reveal>
        ))}
      </div>

      <p className="mt-12 max-w-[60ch] font-body text-lg text-dark-hi">{whyNow.closing}</p>
    </Section>
  );
}
```

- [ ] **Step 2: Render + verify**

Add `<WhyNow />` after Solution. Run dev. Expected: dark-alt section; 4-up teal stats that count up when scrolled into view ("MONTHS" stays gold static); points as a ruled 2-column editorial list; gold closing line.

- [ ] **Step 3: Commit**

```bash
git add components/sections/WhyNow.tsx app/page.tsx
git commit -m "feat: Why Now section (count-up stats + editorial points)"
```

---

## Task 13: Why Us (light)

**Files:**
- Create: `components/sections/WhyUs.tsx`

- [ ] **Step 1: Write WhyUs**

`components/sections/WhyUs.tsx`:
```tsx
import { whyUs } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { BrandMark } from "@/components/ui/BrandMark";

export function WhyUs() {
  return (
    <Section id="why-us" theme="light">
      <Kicker onLight>{whyUs.kicker}</Kicker>
      <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(32px,4.2vw,52px)] font-bold leading-[1.1] tracking-tight text-light-hi">{whyUs.title}</h2>

      {/* narrative + number-strip proof */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          {whyUs.narrative.map((para, i) => (
            <p key={i} className="font-body text-[15.5px] leading-relaxed text-light-mid">{para}</p>
          ))}
        </div>
        <div className="self-start border border-light-border bg-light-card p-7 shadow-sm">
          {whyUs.proof.map((p, i) => (
            <div key={p.label} className={`py-5 ${i !== whyUs.proof.length - 1 ? "border-b border-light-border" : ""}`}>
              <div className={`font-display text-3xl font-bold leading-tight ${p.gold ? "text-gold-textL" : "text-teal-l"}`}>{p.big}</div>
              <div className="mt-1 font-display text-xs uppercase tracking-[0.15em] text-gold-textL">{p.label}</div>
              <div className="mt-1 font-body text-xs text-light-low">{p.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* credentials — distinct: 3 larger cards w/ peak mark */}
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {whyUs.credentials.map((c, i) => (
          <Reveal key={c.title} style={{ transitionDelay: `${i * 80}ms` }}
            className="border border-light-border border-t-2 border-t-gold bg-light-card p-8 shadow-sm">
            <BrandMark className="h-7 w-7 text-gold-textL" />
            <h3 className="mt-5 font-display text-base font-bold tracking-wide text-light-hi">{c.title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-light-mid">{c.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Render + verify**

Add `<WhyUs />` after WhyNow. Run dev. Expected: light section; 2-col narrative + a bordered number-strip (10²⁶ teal, 4 gold, MINUTES teal); three credential cards below with the peak mark.

- [ ] **Step 3: Commit**

```bash
git add components/sections/WhyUs.tsx app/page.tsx
git commit -m "feat: Why Us section (narrative + proof strip + credentials)"
```

---

## Task 14: Careers (dark)

**Files:**
- Create: `components/sections/Careers.tsx`

- [ ] **Step 1: Write Careers**

`components/sections/Careers.tsx`:
```tsx
import { careers } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Careers() {
  return (
    <Section id="careers" theme="dark">
      <Kicker>{careers.kicker}</Kicker>
      <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(32px,4.2vw,52px)] font-bold leading-[1.1] tracking-tight text-dark-hi">{careers.title}</h2>
      <p className="mt-6 max-w-[62ch] font-body text-[clamp(16px,1.5vw,19px)] leading-relaxed text-dark-mid">{careers.lede}</p>

      {/* uniform 4-up cards — the one intentionally consistent grid */}
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {careers.pillars.map((p, i) => (
          <Reveal key={p.title} style={{ transitionDelay: `${i * 80}ms` }}
            className="border border-dark-border border-t-2 border-t-gold bg-dark-card p-7">
            <h3 className="font-display text-base font-bold tracking-wide text-gold">{p.title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-dark-mid">{p.body}</p>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 font-body text-base text-dark-hi">{careers.closing}</p>
      <div className="mt-6"><Button href={careers.cta.href} variant="primary">{careers.cta.label}</Button></div>
    </Section>
  );
}
```

- [ ] **Step 2: Render + verify**

Add `<Careers />` after WhyUs. Run dev. Expected: dark section; four uniform gold-topped cards; gold "Join Us" button.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Careers.tsx app/page.tsx
git commit -m "feat: Careers section"
```

---

## Task 15: Contact (light) + Footer (dark)

**Files:**
- Create: `components/sections/Contact.tsx`, `components/sections/Footer.tsx`

- [ ] **Step 1: Write Contact (client form using validateContact)**

`components/sections/Contact.tsx`:
```tsx
"use client";
import { useState } from "react";
import { contact } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { validateContact, type ContactErrors } from "@/lib/validation";

export function Contact() {
  const [form, setForm] = useState({ name: "", org: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateContact(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // TODO(deploy): POST to a form service (Formspree/Resend) once hosting is chosen.
    console.log("contact submission", form);
    setSent(true);
  }

  const field = "w-full border border-light-border bg-light-card px-4 py-3 font-body text-sm text-light-hi outline-none focus:border-gold";
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <Section id="contact" theme="light">
      <div className="mx-auto max-w-[640px] text-center">
        <Kicker onLight>{contact.kicker}</Kicker>
        <h2 className="mt-5 font-display text-[clamp(32px,4.2vw,52px)] font-bold tracking-tight text-light-hi">{contact.title}</h2>
        <p className="mt-5 font-body text-[clamp(16px,1.5vw,19px)] text-light-mid">{contact.lede}</p>
      </div>

      {sent ? (
        <p className="mx-auto mt-10 max-w-[640px] text-center font-body text-light-hi">Thanks — we'll be in touch shortly.</p>
      ) : (
        <form onSubmit={submit} noValidate className="mx-auto mt-10 max-w-[640px] space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <input className={field} placeholder="Name" value={form.name} onChange={set("name")} aria-label="Name" />
              {errors.name && <p className="mt-1 font-body text-xs text-alert-l">{errors.name}</p>}
            </div>
            <input className={field} placeholder="Organization" value={form.org} onChange={set("org")} aria-label="Organization" />
          </div>
          <div>
            <input className={field} placeholder="Email" value={form.email} onChange={set("email")} aria-label="Email" />
            {errors.email && <p className="mt-1 font-body text-xs text-alert-l">{errors.email}</p>}
          </div>
          <div>
            <textarea className={field} rows={5} placeholder="Message" value={form.message} onChange={set("message")} aria-label="Message" />
            {errors.message && <p className="mt-1 font-body text-xs text-alert-l">{errors.message}</p>}
          </div>
          <button type="submit" className="w-full bg-gold px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-dark-canvas transition-colors hover:bg-gold-hoverL">Send</button>
          <p className="text-center font-body text-sm text-light-low">or email <a className="text-gold-textL underline" href={`mailto:${contact.email}`}>{contact.email}</a></p>
        </form>
      )}
    </Section>
  );
}
```

- [ ] **Step 2: Write Footer**

`components/sections/Footer.tsx`:
```tsx
import Image from "next/image";
import { footer, nav } from "@/content/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-canvas py-12">
      <div className="mx-auto flex max-w-container flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-12">
        <Image src="/logo-wordmark.svg" alt="Aurelius" width={120} height={20} />
        <div className="flex flex-wrap gap-6">
          {nav.links.map((l) => (
            <Link key={l.href} href={l.href} className="font-body text-sm text-dark-low hover:text-dark-mid">{l.label}</Link>
          ))}
        </div>
        <div className="font-body text-xs text-dark-low">{footer.copyright} · {footer.tagline}</div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Render + verify**

Add `<Contact />` then `<Footer />`. Run dev. Expected: light contact section with centered form; empty submit shows field errors; valid submit shows the thank-you state; dark footer with logo + links.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Contact.tsx components/sections/Footer.tsx app/page.tsx
git commit -m "feat: Contact form + Footer"
```

---

## Task 16: Compose page + layout metadata + favicon

**Files:**
- Modify: `app/page.tsx`, `app/layout.tsx`

- [ ] **Step 1: Final page composition**

`app/page.tsx`:
```tsx
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Solution } from "@/components/sections/Solution";
import { WhyNow } from "@/components/sections/WhyNow";
import { WhyUs } from "@/components/sections/WhyUs";
import { Careers } from "@/components/sections/Careers";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Solution />
        <WhyNow />
        <WhyUs />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Layout metadata + favicon**

`app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurelius — Velocity Meets Clarity in Modern Conflict",
  description: "AI-native mission engineering. Aurelius turns the hardest military planning problems into decision advantage — mission plans in minutes, not months.",
  icons: { icon: "/logo-mark.svg" },
  openGraph: {
    title: "Aurelius — AI-Native Mission Engineering",
    description: "Decision advantage at machine speed. Mission plans in minutes, not months.",
    type: "website",
  },
  themeColor: "#0D1420",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Full visual QA**

Run: `npm run dev`. Scroll the whole page. Expected: dark→light→dark→light→dark→light alternation with crisp 1px borders between sections; nav anchors jump correctly; all copy present; reveals fire once on scroll.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: compose full page + metadata + favicon"
```

---

## Task 17: Polish pass (a11y, reduced-motion, build)

**Files:**
- Modify: as needed across sections

- [ ] **Step 1: Reduced-motion check**

In the OS, enable "reduce motion" (or DevTools → Rendering → Emulate `prefers-reduced-motion`). Reload. Expected: content appears immediately (no fades), count-ups show final values, no smooth-scroll jank.

- [ ] **Step 2: Keyboard + contrast check**

Tab through nav, links, form. Expected: visible focus, logical order. Spot-check gold-on-light uses `gold-textL` for text (never raw gold text on light).

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build succeeds, no type errors, no missing-module errors.

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: all tests pass (content + validation).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: a11y + reduced-motion polish; verify build & tests"
```

---

## Self-review (completed)

- **Spec coverage:** Nav, Hero (dotted map), Solution, Why Now, Why Us, Careers, Contact (form), Footer — all present (Tasks 9–16). Theme rhythm via `Section` (Task 8). Tokens/fonts (Tasks 2–3). Light motion via Reveal/CountUp (Task 7). Imagery policy honored — no product/tactical screenshots; hero map is code-generated/abstract. Content from mockup, lightly polished (Task 4).
- **Placeholders:** none — every step has real code/commands. The only intentional `TODO` is the form's backend POST, which is correctly deferred (hosting undecided per spec §6) and clearly marked.
- **Type consistency:** `validateContact`/`ContactInput`/`ContactErrors` consistent (Tasks 6, 15); `whyNow.stats` union type matches `CountUp`/`text` branch usage (Tasks 4, 12); `Section` theme union `dark|darkAlt|light` matches all section usages.
- **Deferred (non-blocking):** real D-DIN woff2 files + license confirmation; SVG logos (PNG fallback noted); form service; hosting; OG image.
```
