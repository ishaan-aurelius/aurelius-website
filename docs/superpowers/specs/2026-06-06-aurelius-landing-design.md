# Aurelius Landing Page — Implementation Design Spec

**Date:** 2026-06-06
**Status:** Approved (brainstorm complete) → ready for implementation plan
**Companion docs:** `DESIGN_SPEC.md` (visual/per-section direction), `REFERENCES_GUIDE.md` (reference index), `References/aurelius-color-spec.md` (color authority — wins all color conflicts)

This spec captures the decisions made during the design brainstorm and defines the implementation. Where it is silent on color, defer to the color spec. Where it is silent on visual direction, defer to `DESIGN_SPEC.md`.

---

## 1. Goal & audience

A single-page marketing site for **Aurelius** (AI-native mission engineering / decision-advantage platform). Primary audience: **U.S. Defense Innovation Unit (DIU)** and adjacent DoD / prime evaluators. Must read like serious defense tech (Palantir / Anduril / Ethos / Distributed Spectrum tier): clean, restrained, spacious, credible — **never "AI slop."**

Success criteria:
- Loads fast, looks premium on desktop and mobile.
- Reads as a real, serious company — not vaporware.
- Light, tasteful motion (Phase 1). Architecture allows richer motion later (Phase 2).
- A working contact path for evaluators/partners.

---

## 2. Locked decisions (from brainstorm, 2026-06-06)

| Area | Decision |
|---|---|
| **Stack** | Next.js (App Router) + React + TypeScript |
| **Styling** | Tailwind CSS; spec tokens in `tailwind.config.ts` |
| **Animation** | CSS transitions + Intersection Observer (no Framer Motion in Phase 1) |
| **Motion scope** | Light (Phase 1): scroll-reveal fades/slides, count-ups, hover. Built to extend. |
| **Typography** | **D-DIN Exp** (display/headlines/labels) + **D-DIN** (body). Data/numbers stay in D-DIN (no monospace). |
| **Visual language** | Bold typography + abstract geometric motif (brand "peak") + subtle line diagrams + data/proof viz. |
| **Imagery policy** | **No real product/tactical screenshots** (NDA/classified — kept off-site). No fabricated "product shots." Stylized/clearly-illustrative decorative graphics are OK; nothing that looks like a real screenshot. |
| **Hero visual** | Abstract, code-generated **dotted world map** (recognizable continents as a dot grid), dark + subtle, with light scroll/load motion. |
| **Section variety** | Each "four-item" grouping gets a **distinct layout** — no repeated grids. |
| **Architecture** | Approach 1: section components + small set of deep shared primitives; copy in `content/site.ts`. |
| **CTAs** | On-page **contact form**. "Request a Demo" scrolls to it (intent preset). |
| **Content fidelity** | Light polish of mockup copy allowed (meaning/claims preserved). |
| **Logo** | `Logo Wordy.png` (wordmark) + `Logo Graphic.png` (mark) supplied. Convert to SVG if possible; mark = favicon, lockup = nav. |
| **Deploy** | Undecided — build to run locally; host later. |
| **Theme rhythm** | dark → light → dark → light → dark → light (locked in `DESIGN_SPEC.md` §2). |

---

## 3. Architecture

**Principle:** deep modules (simple interface, hidden complexity), information hiding, no over-fragmentation. Each section is one cohesive file; sub-components only when reused or a file exceeds ~200 lines. One decision → one home.

```
app/
  layout.tsx          # fonts, metadata, global shell
  page.tsx            # composes sections in order
  globals.css         # Tailwind directives + @font-face (D-DIN)
components/
  sections/           # Nav, Hero, Solution, WhyNow, WhyUs, Careers, Contact, Footer
  ui/                 # Section, Container, Kicker, Button, Reveal, CountUp, BrandMark
content/
  site.ts             # ALL copy + stats, typed
lib/
  useInView.ts        # Intersection Observer hook
public/
  logo-wordmark.svg, logo-mark.svg   # (or optimized PNG fallback)
tailwind.config.ts    # color tokens, font families, spacing scale
```

**Deep primitives:**
- `Section` — owns theme (`dark` | `light`), vertical rhythm, 1px border switch. The *only* place the dark/light rule lives.
- `Container` — max-width 1160px + responsive gutters (48px desktop → 24px mobile).
- `Kicker` — gold small-caps letterspaced label (theme-aware gold: `#C8A85C` on dark, `#8A6F2E` for text on light per color spec contrast rule).
- `Button` — `primary` (solid gold, dark text) | `secondary` (gold ghost/outline). Never red.
- `Reveal` — wraps children, fades/translates in on scroll via `useInView`; respects `prefers-reduced-motion`.
- `CountUp` — animates a number when in view (Why Now stats, Why Us proof). Reduced-motion → static final value.
- `BrandMark` — the decorative peak-motif SVG (from the logo geometry; light on the brain icon to avoid AI-brain cliché).

**Content/data:** `content/site.ts` exports typed objects per section (headline, kicker, lede, items[]). Editing copy never touches layout.

---

## 4. Section-by-section composition

Order: **Nav → Hero → Solution → Why Now → Why Us → Careers → Contact → Footer.** Each four-item group uses a deliberately different layout (see §2 "Section variety").

### 4.1 Nav — dark, sticky
- Left: logo lockup (mark + wordmark). Links (center/right): `Solution · Why Now · Why Us · Careers` (anchor scrolls). Right: **Request a Demo** (solid gold) + **Contact Us** (ghost).
- Scroll past hero → gains hairline bottom border + slight bg condense (already ~92% navy + blur).
- Mobile: collapse links to a menu; keep **Request a Demo** visible.

### 4.2 Hero — dark, full viewport height
- Kicker (`AI-NATIVE MISSION ENGINEERING`) / big D-DIN Exp headline ("Velocity meets clarity in *modern conflict*." — gold on "modern conflict") / subtext / **Request a Demo** + **Contact Us**.
- Background: code-generated **dotted world map** + radial glow; subtle. Phase-1 motion: fade-up on load, light node pulses. Full-height (no next-section bleed).

### 4.3 Solution — light
- Lede + **01–04 divided step grid** (validated mock: borderless columns, content padded off dividers).
- Then **4 capability pillars** as a *distinct* treatment: bordered cards with a gold top hairline + a minimal line-diagram glyph each (differs from the borderless steps).
- Motion: steps/pillars stagger-reveal on scroll.

### 4.4 Why Now — dark
- Editorial intro + lede.
- **Full-width divided stat line** — 4 big teal **count-up** numbers (`2M GB/DAY`, `90 SEC`, `10K STREAMS`, `MONTHS`), captions beneath. (Distinct from card grids.)
- The 4 "why now" points (Multi-Domain Warfare, The Kill Web, Budget Tailwinds, GenAI Isn't Enough) as an **editorial 2-column list** (numbered/ruled), *not* cards.
- Closing line: "Decision latency … *a battlefield liability*."

### 4.5 Why Us (Authority) — light
- 2-column **narrative** (replaces "About"; team pedigree, scale, dual-use).
- **Number-strip proof viz**: `10²⁶ → 4 → MINUTES` (the honest data hero; no product screenshots).
- **3 credentials** (Silicon Valley DNA, Military Leadership, Prime-Grade Engineering) as larger cards accented with the brand peak motif (distinct from Solution pillars).

### 4.6 Careers — dark
- Lede + **4 pillars as uniform bordered cards** (gold headings) — the one section that intentionally uses a clean uniform card grid. Closing line + **Join Us / Request a Demo** CTA.

### 4.7 Contact — light
- Centered. **On-page contact form**: name, organization, email, message + submit. Email fallback (`contact@aurelius.guru`) shown.
- "Request a Demo" anchors here (optional preset subject/intent).
- Submit: pluggable handler (Formspree/Resend or similar) wired via env var; until a host/service is chosen, submit is stubbed (validates + shows success state, logs payload) with a clearly-marked TODO.

### 4.8 Footer — dark
- Logo, mini nav, copyright, tagline (`AI-Native Mission Engineering`). Minimal.

---

## 5. Cross-cutting

- **Fonts:** self-host D-DIN Exp + D-DIN via `@font-face` (woff2). **Licensing flag:** confirm a proper, license-clean source for the D-DIN files before production (CDN imports are for dev preview only).
- **Color:** all values from `References/aurelius-color-spec.md`. Gold CTAs, teal data-only, no red CTAs, no cream, no pure black, no opacity-faded text. Gold *text* on light → `#8A6F2E`.
- **Responsive:** desktop-first composition that degrades cleanly; mobile nav menu; grids collapse (4→2→1); fluid type via `clamp()`.
- **Accessibility:** honor `prefers-reduced-motion`; WCAG AA contrast per color spec; semantic landmarks; alt text; keyboard-navigable nav + form.
- **Performance:** animate transform/opacity only; lazy/optimized images (`next/image`); minimal JS (IO + small hooks).
- **SEO/meta:** `<title>`, description, Open Graph (title/desc/image), favicon = logo mark, theme-color navy.
- **Analytics:** none in Phase 1 (add later if desired).

---

## 6. Deferred / open (not blocking implementation)

- **Form backend/service** — finalize when hosting is chosen (build UI + stub now).
- **Hosting** — Vercel likely; decide later.
- **D-DIN license source** — confirm before production.
- **SVG logos** — convert PNGs (`Logo Wordy.png`, `Logo Graphic.png`) to SVG; PNG fallback acceptable.
- **OG image** — design a share image (can be a later pass).
- **Phase-2 motion** — richer hero map animation, decision-window viz, etc.
- **Bento glass-object pattern (inspiration img #4)** — deferred; its asymmetric-grid idea may inform a future Why Us refresh, but Phase 1 avoids forced 3D renders to stay honest and clean.

---

## 7. Build sequencing (for the implementation plan)

1. Scaffold Next.js + TS + Tailwind; wire tokens, fonts (`@font-face`), `globals.css`.
2. Build deep primitives: `Section`, `Container`, `Kicker`, `Button`, `useInView`/`Reveal`, `CountUp`, `BrandMark`.
3. Author `content/site.ts` (all copy/stats from mockup, lightly polished).
4. Build sections in order (Nav, Hero, Solution, Why Now, Why Us, Careers, Contact, Footer), composing in `page.tsx`.
5. Responsive pass + reduced-motion + a11y + meta/favicon.
6. Local run + visual QA against this spec and the reference feel.
