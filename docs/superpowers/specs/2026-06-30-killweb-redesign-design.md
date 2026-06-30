# Aurelius Website — Kill-Web Redesign (Design Spec)

**Date:** 2026-06-30
**Status:** Approved direction (pending spec review) → frontend-design build
**Scope:** Visual + motion redesign of the existing single-page site. **Content is locked** — no copy changes, no reintroduced sections. This spec governs *how it looks and moves*, not what it says.

This spec sits under the project's source-of-truth rules in `CLAUDE.md`. Color always defers to `References/aurelius-color-spec.md`; layout/motion direction here extends `DESIGN_SPEC.md`. **No hex value is invented — every color below is a spec token.**

---

## 0. Why this redesign exists

Current site is clean but reads as a competent dark SaaS template. Two gaps (user-confirmed):

1. **Not alive enough** — it doesn't feel like a live system. *(primary)*
2. **Generic / templated** — no distinctive, ownable point of view.

Target tier: **Palantir / Anduril** — serious, operational, dense with real substance. Hard ban on "AI slop" (glowing brains, aimless gradients, decorative motion, SaaS bubbliness).

### Product substance behind the design (rationale, not copy)
Aurelius is a decision/mission-planning engine for modern war. The thesis (from the now-removed product sections, retained here as *design rationale*):
- Modern conflict is a **kill web** — interconnected, multi-domain (air/land/sea/space/cyber).
- Each added asset/domain/threat *multiplies* the decision space → a **super-combinatorial explosion** (~**10²⁶ courses of action**) no human can solve, inside decision windows measured in **seconds**.
- Aurelius fuses **GenAI + deep optimization** to collapse 10²⁶ → **4 ranked, Pareto-optimal plans, in minutes** — commander stays in the loop.

This is the literal meaning of the locked hero line *"Velocity meets Clarity in Modern Conflict."* The design makes the product's own architecture visible.

---

## 1. North star

> **The kill web is born chaotic in the hero and computes itself into clarity as you scroll.**

Velocity → clarity, rendered as the *structure of the page*. The identity is drawn from Aurelius's own architecture (the kill web + the 10²⁶→4 resolve) — **not** borrowed from reference sites — which is what makes it ownable and not derivative.

### Reference taste (what we're emulating, in principle not in imitation)
- **noda intelligence** — engineered, instrumented, component-driven feel. We take the *principle* (it reads as a real instrument), **not** its signature monospace brackets.
- **Vannevar Labs** — an arresting living opening that draws you in before the words.
- **Echodyne** — deprioritized.

---

## 2. The spine — kill-web through-line

A single faint node/edge network lives behind the whole page on a fixed/persistent layer, **driven by scroll progress (0 → 1):**

- **Top (dense):** many nodes, crossing edges, live motion, sparse teal telemetry — the 10²⁶ chaos.
- **Bottom (resolved):** edges prune, nodes consolidate, motion calms, down to **one clear node at Contact**.
- Each section's content **sits on** this web:
  - Careers pillars = **4 nodes**
  - Alumni logos = **network points**
  - Contact = the **final single node**
- A hairline thread connects section → section so it reads as **one continuous web**, not separate widgets.

This is the connective tissue that unifies hero + modules into one engineered system. **Scroll is the engine** of the resolve — scroll position literally drives dense → clear.

---

## 3. Hero — living kill-web map

Evolve the existing `WorldPlexus` into a true operational picture (the densest state of the web).

- **Keep:** continents as a dense node/edge mesh; the radial legibility scrim behind the headline.
- **Add:**
  - Great-circle **signal arcs** traversing between distant nodes.
  - **Pulsing contact nodes** that bloom and fade.
  - A slow **scan sweep** crossing the globe.
  - Small **monospace contact callouts** (`CONTACT 41.2N / 29.0E`, `TRACK 0xA7`) appearing at nodes — teal, data-only, low-contrast.
- **Headline overlay (unchanged copy):** *"Velocity meets Clarity in **Modern Conflict**"* (gold on "Modern Conflict") + the two sub-lines.
- **Motion:** autonomous, continuous, slow loop. The hero is the through-line's "dense" extreme.
- **Anti-slop:** pulses tie to plausible nodes/coordinates; it reads as live coverage, not a particle field.

---

## 4. Module treatments

All sections remain **dark `#0D1420`** (uniform-dark rule, locked). Separation is the 1px `dark/border #2A3E55` hairline + content/motion — never a lighter canvas.

### Nav
Sticky, ~92% navy + blur; hairline border appears once scrolled past the hero. Logo (`logo-wordmark.png`) left. Links: `Careers · Our Team · Contact`. CTAs: **Request a Demo** (solid gold) + **Contact Us** (gold ghost/outline). **Never red.** Mobile: collapse links, keep Request a Demo visible.

### Careers — "Build the Decision Engine for the Ages"
The 4 pillars (Real-World Impact, Elite Team, Zero Bureaucracy, Dual-Use Future) become **4 nodes** on the thinning web.
- **Engineered cards:** hairline `#2A3E55` border, `#1A2838` fill, sharp corners with restrained **corner ticks** (our own mark — **not** noda brackets), small numeral node-IDs `01–04`.
- **Motion:** on enter, edges **draw** between the nodes (line-draw); cards stagger up. Hover: the node + its connected edges illuminate.
- CTA **Join Us** — gold.

### Alumni — "Built by patriots, veterans and technologists"
Logos become **network points** on the (now sparser) web; faint edges connect them.
- **Motion:** on enter, the web "recognizes" each logo in sequence (edge draws → logo fades/scales in). Hover: logo brightens, its edges pulse.
- Logos retain native color per the current Alumni treatment (`w-auto`, per-logo heights, ~90% opacity). Label: `ALUMNI OF`.

### Contact — "Start the conversation"
**The resolved single node** — the web has collapsed from chaos to one clear point, pulsing gently. Calm, centered, high-trust.
- Primary CTA **Request a Demo** (gold) + `contact@aurelius.guru`.
- This is the velocity→clarity payoff: a chaotic global web resolved to one clear next step.

### Footer
Minimal: hairline top border, tagline `AI-Native Mission Engineering`, copyright. The through-line fades out here.

---

## 5. Visual language (inside the locked color spec)

- **Canvas:** uniform `#0D1420`.
- **Gold `#C8A85C`:** CTAs, emphasis word, the single focal/resolved node. Button text always `#0D1420`. Hover `#DFC87C` on dark.
- **Teal `#4AAFB8`:** data / telemetry / node-IDs / coordinates **only** — never body text, never links.
- **Edges:** `#2A3E55` hairline, brightening toward `#A0B8C8` / a faint teal or gold when active.
- **Text:** headings `#C8D4DE`, body `#A0B8C8`, muted `#6A859A`.
- **Type:** display + body faces (D-DIN family, as configured) **plus a technical monospace** as the "data voice" (telemetry, IDs, coordinates) — teal, small, letterspaced. (No font files are bundled today; mono uses a robust monospace stack until/if a brand mono is supplied.)
- **Engineered feel:** 1px hairlines, sparse corner ticks, alignment to an implied grid, monospace for all data.
- **Banned:** rounded SaaS bubbles, glow-for-glow's-sake, aimless gradients, cream/beige, pure black, red CTAs.

### Motion budget
- Hero: continuous slow loop.
- Through-line: scroll-linked resolve.
- Modules: reveal-on-enter (stagger + line-draw) via IntersectionObserver (reuse `Reveal`).
- Hover micro-states on nodes/cards.
- Animate **transform/opacity only** (60fps); never layout properties.

---

## 6. Tech & accessibility

- **Hero + through-line:** canvas (many elements; performance). Scroll-linked resolve via `requestAnimationFrame` + scroll position (or CSS scroll-timeline where supported), throttled.
- **Reveals:** IntersectionObserver (existing `Reveal` component).
- **`prefers-reduced-motion`:** degrade to a **static, already-resolved** web + simple fades — no loops, no scrubbing. Non-negotiable.
- **Performance:** must not block content render; keep canvas work off the main thread where feasible; cap node/edge counts on small viewports.
- **Responsive:** the through-line + hero adapt to mobile (fewer nodes, reduced motion budget); Nav collapses.

---

## 7. Assets — Open Graph card (resolved)

The entire core is **code-rendered**; the only generated-asset candidate is the **OG / social-share image** (1200×630). Decision: **A/B two approaches, ship the stronger; composite real wordmark + tagline either way (never let an image model render text).**

1. **GenAI plate** — user runs the detailed prompt in Appendix A (Gemini Nano Banana / Imagen / Claude Design). Abstract kill-web plate, text-free, reserved calm zone.
2. **Coded plate** — authored in code (pure SVG → PNG via `sharp`): dense kill-web resolving into one gold node, reserved lower-left zone, `logo-wordmark.png` + tagline composited. First draft built and approved as a candidate (seeded/reproducible; knobs: node count, edge density, arc weight).

**Wiring (build task):** export the winner to `public/og.png`; add `openGraph.images` + `twitter` card metadata in `app/layout.tsx` (currently OG has title/description but **no image**).

**Explicitly not generated:** hero video (fights scroll-as-engine), product-UI stills (GenAI garbles UI → erodes credibility), textures (do procedurally).

---

## 8. Scope & phasing

1. **Foundation** — through-line layer + scroll engine + visual tokens / mono "data voice".
2. **Hero** — upgrade `WorldPlexus` to the living kill-web map (arcs, pulses, scan sweep, mono callouts).
3. **Modules** — Careers (node-cards), Alumni (network points), Contact (resolved node), Nav + Footer polish.
4. **Polish** — `prefers-reduced-motion`, performance, responsive, OG metadata.

Implementation via the **`frontend-design`** skill; motion reviewed live (`run`/`verify` against localhost:3001, browser when available) and critiqued via the **`ux-design-critic`** agent.

---

## 9. Constraints / non-negotiables (from `CLAUDE.md` + color spec)

- **Content locked** — no copy edits, no reintroduced removed sections (Scale/WhyNow/Solution/WhyUs stay out unless separately specced).
- **Uniform dark** — every section `#0D1420`; no light sections, no alternation, no `#141E2C` as a section background.
- **CTAs gold, never red.** Red is status-only. No cream/beige, no pure black, no opacity-faded text, teal is data-only.
- **Never invent a hex** — all color from the spec.
- **Earned motion only** — every animation reveals/tracks/visualizes something; no ambient filler.

---

## 10. Open questions

None blocking. Deferred: brand monospace font choice (use a stack until supplied); whether to later reintroduce the 10²⁶→4 proof as a new module (would slot onto the web; separate spec).

---

## Appendix A — OG plate image-gen prompt

```
CONTEXT
Generate a background plate for a 1200×630 social-share / Open Graph card for a
defense-technology company. Do NOT render any text, letters, numbers, logos, or
watermarks — I will composite real type and a wordmark on top afterward. Your job
is the visual field only. Generate at the highest resolution available; if the tool
forces a fixed ratio, produce 16:9 and I will crop to 1.91:1 (1200×630).

SUBJECT
An abstract operational decision-network — a "kill web." A field of fine, precise
luminous nodes connected by thin, taut arcs (great-circle curves, like signal paths
on a tactical display). The network reads as INTELLIGENCE COMPUTING: on the right it
is dense, intricate, and busy (many nodes, many crossing arcs — controlled chaos); it
visibly RESOLVES leftward toward a single, brighter, calmer focal node — order emerging
from complexity. It should feel like a real signals-intelligence / command readout, not
decoration.

COMPOSITION
- 1.91:1 landscape. Network energy weighted to the right and upper-right.
- Keep the LEFT THIRD and lower-left calm and nearly empty — quiet deep-navy negative
  space reserved for a wordmark and one line of headline text (which I add later).
- The single resolved focal node sits left-of-center as the visual destination; a faint
  primary arc leads the eye from the dense right side into it.
- Deep, three-dimensional sense of space and subtle depth-of-field: nearer nodes crisp,
  far nodes softening into the dark. Generous breathing room; do not fill every pixel.

COLOR (use these exact values; this palette is non-negotiable)
- Background: deep cool navy #0D1420, with a slightly darker vignette at the edges.
- Network lines / nodes: cool steel blue, ranging #2A3E55 (faint, distant) to #A0B8C8
  (bright, near).
- Data accents on a FEW nodes only: muted teal #4AAFB8 (sparse — these read as live data).
- ONE focal accent: warm gold #C8A85C on the single resolved node and the leading arc only.
  Gold is rare and precious — a single point of warmth in a cool field.
- No other hues.

LIGHT & MATERIAL
Self-illuminated thin lines and small points against darkness — like light through fiber,
or a holographic plot. Crisp, engineered, vector-precise edges (not painterly, not fuzzy
neon). A very fine, subtle film grain over the whole image for premium depth. Calm,
controlled glow — points have a tight bloom, never a hazy wash.

MOOD
Serious, restrained, sophisticated, expensive. Ambition and wisdom in a defense context —
the aesthetic of Palantir and Anduril. Quiet confidence. Order resolving from complexity.

AVOID (hard constraints)
No text, letters, numbers, logos, watermarks, or UI chrome. No literal photoreal Earth or
globe, no continents/maps, no satellite imagery. No glowing brain, no neural-network cliché,
no circuit-board motif. No people, faces, soldiers, weapons, or vehicles. No lens flares,
rainbow or pastel gradients, neon, cyberpunk pink/purple. No cream or beige (#EFECE6 family),
no pure black, no red. No 3D chrome blobs or glass orbs. Do not fill the whole frame with
clutter — preserve the calm negative space on the left.
```

Variations: (a) flip the resolve so the focal node sits right-of-center; (b) denser vs. sparser; (c) one bold leading arc vs. several converging arcs.
