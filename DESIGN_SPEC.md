# Aurelius Website — Design Spec (Landing Page)

This is the comprehensive design document referenced as **rank #2** in `REFERENCES_GUIDE.md`. It owns **layout, typography, composition, motion, and per-section direction**. It does **not** own color — color always defers to `References/aurelius-color-spec.md`. When this spec and the color spec disagree on a hex or theme rule, the color spec wins.

> Scope: the single-page landing site. Subpages, if any, come later.

---

## 0. Audience & intent (read before any decision)

- **Primary viewer: the U.S. Defense Innovation Unit (DIU) and adjacent DoD / prime evaluators.** Every choice is judged by a technical, skeptical defense audience — not consumer-marketing readers.
- **The site must read as a serious, operational defense-tech product** in the tier of **Palantir** and **Anduril** — restrained, precise, dense with real substance, confident.
- **Hard ban on "AI slop."** That means: no generic glowing-brain/neural-net clip art, no aimless full-section gradients, no stock "digital transformation" imagery, no decorative motion that signifies nothing, no rounded-friendly SaaS bubbliness. Every visual element should look like it encodes real information.
- **The site must feel alive, not static.** Purposeful motion and interactivity are required — but motion must be *earned* (it reveals, tracks, or visualizes something), never ambient filler.

---

## 1. Global motion & interaction philosophy

Motion is a first-class requirement here, so it gets its own rules.

- **Earned, not ambient.** Animation should visualize a concept (signals propagating, threats resolving, options being computed) or respond to the user (scroll, hover, cursor). Avoid motion that exists only to "look modern."
- **Scroll is the primary interaction.** Sections reveal and animate as they enter the viewport (fade/translate-in, staggered children, count-up numbers, line-draw). The site should reward scrolling with a sense of progression — a "flow," per the brief.
- **Restraint = sophistication.** Defense-tech credibility comes from *control*. Prefer slow, weighted, deliberate easing over bouncy/playful. Short distances, long-ish durations, no overshoot on serious elements.
- **The hero sets the tone with continuous (looping) motion**; downstream sections mostly use scroll-triggered, one-shot reveals.
- **Performance + accessibility are non-negotiable:** must honor `prefers-reduced-motion` (degrade to static or minimal fades), stay 60fps (animate transform/opacity, not layout), and never block content from rendering.
- **Reference for the "feel" of arrival motion:** Ethos Systems' landing (`ethossystems.com`) — fetch it live; its hero entrance is the target mood for the Aurelius hero.

---

## 2. Section order & theme rhythm

**Canonical scroll order:**

`Nav → Hero → Problem → Why Now → Solution → Careers → Contact → Footer`

**Theme — LOCKED (decided 2026-06-13, overrides the earlier alternation rule):**

> **The entire site is dark. Every section uses the single dark canvas `#0D1420` — the Hero color.** There are **no light sections** and **no dark/light alternation.** This is a hard, deliberate user decision: do not reintroduce light sections or alternation, and do not flip any section to `light` or `darkAlt`. One uniform dark background, top to bottom.

| # | Section | Theme |
|---|---|---|
| — | Nav | Dark `#0D1420` (blur/92%) |
| 1 | Hero | Dark `#0D1420` |
| 2 | Problem | Dark `#0D1420` |
| 3 | Why Now | Dark `#0D1420` |
| 4 | Solution | Dark `#0D1420` |
| 5 | Careers | Dark `#0D1420` |
| 6 | Contact | Dark `#0D1420` |
| — | Footer | Dark `#0D1420` |

The earlier "perfect dark/light alternation" plan is **retired.** Section separation now comes from the 1px `dark/border` hairline at each section top, not from a canvas color change. Differentiation between sections is achieved through content, motion, and card/panel layering (`dark/card #1A2838` sits one level up from the canvas) — never a lighter section background.

---

## 3. Section: Navigation (top bar)

- **Theme:** dark, sticky, ~92% opacity navy with blur (per color spec / mockup nav).
- **Left:** the **Aurelius logo image** (user will supply the asset — leave a clearly-marked placeholder; do not fabricate a logo). Wide letter-spacing wordmark in the Wix screenshots is the fallback look until the asset arrives.
- **Right (nav links, in order):** `Solution` · `Why Now` · `Why Us` · `Careers`
  - Note the changes from the mockup HTML: **"About" is renamed "Why Us"**, and **"Mission" / "News" are dropped.** Links are anchor-scrolls to their sections.
- **Right (CTAs, after the links):** two buttons —
  1. **Request a Demo** (primary)
  2. **Contact Us** (secondary)
  - Both gold per color spec. Differentiate primary vs secondary by *fill vs outline*, not by color (e.g. Request a Demo = solid gold, Contact Us = gold outline / ghost). **Never red.**
- **Motion:** subtle — link underline/hover, nav background condenses or gains a hairline border once the user scrolls past the hero.
- **Mobile:** collapse links into a menu; keep "Request a Demo" visible.

---

## 4. Section: Hero (landing)  — DARK

- **Purpose:** instant credibility + the core thesis, with motion that signals "this is a live system."
- **Content (from mockup HTML):**
  - Small **kicker subtext above** the headline (e.g. `AI-NATIVE MISSION ENGINEERING`, gold, small-caps, letterspaced).
  - **Main headline:** "Velocity meets clarity in *modern conflict*." (gold emphasis on "modern conflict").
  - **Small supporting subtext below** the headline (the "mission plans in minutes, not months" line).
  - **Primary CTA button: "Request a Demo."**
  - → Layout = kicker / headline / subtext / button, stacked, left-aligned, as in the HTML — but visually far richer than the HTML.
- **Background (the key upgrade — must NOT be the plain HTML background):**
  - A **world-map visual** (the Wix `image-5` look: dotted/topographic world map) as the hero backdrop.
  - **Animated light activity over the map** — moving traces / pulses / signal arcs / scanning light that travel across it. The intent: it reads as a live global sensing or kill-web network, not a static wallpaper. (User couldn't name the effect — this is it: animated signal traces / particle arcs / a slow scan sweep over the map.)
  - Keep it dark and legible; motion is continuous but slow and low-contrast enough that headline text stays dominant (color spec contrast rules apply).
- **Reference:** Wix `image-5` (composition), `ethossystems.com` (arrival motion feel).
- **Anti-slop note:** the map motion must imply *data/coverage*, not be a generic particle field. Tie pulses to plausible nodes/locations.

---

## 5. Section: Solution  — DARK

- **Purpose:** show *how* Aurelius works — the 01–04 method — plus a tactile, "this is a real product" visual.
- **Content (from mockup HTML):** the Solution lede + the **four numbered steps** (01 Understand the Mission → 04 Empower the Commander), and the four capability pillars.
- **Layout & references — two distinct treatments to combine:**
  - **Reference A — `References/Design Inspiration/01-solution-card-grid.png`:** a row of **four tall cards** on a light canvas. Each card has a top panel with a **minimal line-diagram icon** (process/flow glyphs, not stock icons), an UPPERCASE heading, and body copy. Use this pattern for the **four steps or the four pillars.** Re-skin to Aurelius tokens (gold/teal accents, not the reference's teal-on-near-black unless it maps to our dark card tokens).
  - **Reference B — `References/Design Inspiration/02-solution-threat-map-split.png`:** a **split block** — text on one side, an **interactive tactical map tile** on the other (terrain/satellite view with a translucent threat-radius overlay, marker dots, and a small monospace HUD callout like `ADVERSARY VESSEL / LAT / LON`). Use this to make the Solution feel operational — a live decision-space visualization rather than marketing copy alone.
- **Motion:** step numbers/cards stagger in on scroll; the map tile's overlay/markers can animate (radius pulse, marker drop, HUD value tick). Monospace for any HUD/coordinate text (color spec: teal for data only).
- **Anti-slop note:** the map must look like a real tactical readout (coordinates, labels, classification-style callouts), echoing Distributed Spectrum's credibility — not a decorative globe.

---

## 6. Section: Why Now  — DARK

- **Purpose:** establish urgency and market/technical tailwinds — the "advantage belongs to the fastest decider" argument.
- **Content (from mockup HTML):** the "Why Now" headline + lede, the **stat line** (`2M GB/day`, `90 sec`, `10K streams`, `MONTHS`), and the four cards (Multi-Domain Warfare, The Kill Web, Budget Tailwinds, GenAI Isn't Enough), plus the closing "decision latency is a battlefield liability" line.
- **Direction:** this is the section explicitly called out to look **like top-tier defense tech (Palantir / Anduril), not cookie-cutter AI slop.** Fetch those sites for reference at build time. Aim for:
  - Dense, data-forward composition; big animated **count-up** stats; monospace numerals (teal, data-only).
  - Editorial, high-contrast typographic layout over decorative cards — let the numbers and claims carry it.
  - Optional: a restrained data-viz motif (timeline, decision-window shrinking, kill-web node graph) that visualizes the urgency rather than illustrating it generically.
- **Reference:** Palantir, Anduril, Distributed Spectrum (mood/density); Wix `image-2` (card-row fallback only — its arched-photo cards are NOT the target; upgrade significantly).
- **Motion:** stats count up on enter; the "decision window" idea can animate (a bar/clock compressing). Keep it tight and serious.

---

## 7. Section: Why Us (Authority)  — DARK

- **Purpose:** authority and proof — why Aurelius specifically wins (team pedigree, scale claims, the `10^26 → 4 plans` proof point, credentials). This replaces "About."
- **Content (from mockup HTML "About"):** the company narrative, the `10^26 / 4 / MINUTES` number strip, and the three credential cards (Silicon Valley DNA, Military Leadership, Prime-Grade Engineering).
- **Layout & references:**
  - **Reference C — `References/Design Inspiration/03-whyus-floating-dashboards.png`:** dark section with **floating product-UI screenshots** (dashboards / readiness grids) that hover with soft glow/shadow, paired with a left/right text block and a two-tone heading (second word in accent). Use this to **show the actual product** alongside the authority narrative — proof it's real, built software.
  - **Reference D — `References/Design Inspiration/04-whyus-bento-grid.png`:** a **bento grid** of differently-sized tiles, each with a **3D-rendered glass/chrome object** and a short title (e.g. capability claims). Use this for a "what makes us different" capability matrix if it fits better here than at Solution (the brief allows moving it).
  - The brief explicitly says img #3/#4 may instead land in the **Solution** section if they fit better there — decide per final composition; note the choice in §11.
- **Motion:** dashboards float/parallax subtly on scroll; bento tiles reveal in a stagger; the `10^26` number can count or scramble-in for drama.
- **Color (decided):** `04-whyus-bento-grid.png`'s **bright blue is rejected** — keep the bento *layout* only and **re-skin to the Aurelius system.** Since Why Us is now a **light** section, tiles use `light/card #FFFFFF` on `light/canvas`, dark text, gold/teal accents. Likewise the floating dashboards (img #3) sit on a light canvas with dark UI chrome.

---

## 8. Section: Careers  — DARK

- **Purpose:** recruit "intellectual firepower" — small, fast, high-autonomy.
- **Content (from mockup HTML):** Careers headline + lede, the four pillars (Real-World Impact, Elite Team, Zero Bureaucracy, Dual-Use Future), the closing line, and a CTA.
- **Layout & reference:** four-up card grid (Wix `image-4` composition) — but **re-skin completely:** gold card headings (not the Wix cream cards), gold CTA (the Wix red "Join Us" button is **retired** → gold per color spec).
- **Motion:** cards stagger in on scroll; subtle hover lift.

---

## 9. Section: Contact  — DARK

- **Purpose:** the conversion point — investors, partners, builders, and (critically) DIU/DoD evaluators.
- **Content (from mockup HTML):** "Start the conversation" headline + lede + the contact email CTA (`contact@aurelius.guru`).
- **Layout:** centered, calm, high-trust. Primary CTA = **Request a Demo**; secondary = email/Contact.
- **Motion:** minimal — a clean fade-in. This is a landing/resolution beat, not a showpiece.

---

## 10. Section: Footer  — DARK

- Per color spec: navy, hairline top border, copyright + tagline (`AI-Native Mission Engineering`). Minimal.

---

## 11. Open decisions (resolve before/while building) ⚠️

These are deliberately NOT decided. Do not invent answers — confirm with the user.

1. ~~Three-dark run~~ **RESOLVED (2026-06-06):** Why Us flipped to **light** → perfect alternation. See §2.
2. ~~Bright blue from img #4~~ **RESOLVED (2026-06-06):** rejected; re-skin to Aurelius system on light canvas. See §7.
3. **Where the bento grid (img #4) and floating dashboards (img #3) live** — Why Us, Solution, or split across both.
4. **Which card pattern (img #1) maps to** — the four numbered *steps*, the four *pillars*, or both.
5. **Logo asset** — pending from the user; nav uses a placeholder until supplied.
6. **Tech stack** (Astro vs Vite vs other) — still open from project start; the animation requirements (scroll reveals, canvas/SVG map motion) should inform this choice.

---

## 12. Reference asset index (new, this spec)

In `References/Design Inspiration/` (intended use; final placement per §11):

| File | Style source | Demonstrates | Intended section |
|---|---|---|---|
| `01-solution-card-grid.png` | Ethos-like | 4 tall cards, line-diagram icons, uppercase headings on light canvas | Solution |
| `02-solution-threat-map-split.png` | Distributed-Spectrum-like | text + live tactical map tile with threat overlay & HUD callout | Solution |
| `03-whyus-floating-dashboards.png` | — | dark section, floating product-UI screenshots, two-tone headings | Why Us |
| `04-whyus-bento-grid.png` | — | bento grid of 3D glass-object tiles (⚠️ bright-blue palette, re-skin) | Why Us |

Also relevant (pre-existing): `References/Content Images/*` (Wix layout feel), `References/aurelius-website-mockup-v2.html` (content), `References/reference_websites.md` (Ethos + Distributed Spectrum, fetch live), `References/aurelius-color-spec.md` (all color).
