---
name: design-debt
description: Known design debt + a recurring root-cause class (token overwrites, reveal-on-anchor-jump) on the Aurelius landing page
metadata:
  type: project
---

Status as of 2026-06-13 (verify against current code before acting):

1. **RESOLVED — all-dark regression / theme-token overwrite.** At one point `tailwind.config.ts` had `light.canvas` set to a dark navy (`#1D2937`) and `dark.canvas`/`dark.canvasAlt` both `#0E141F` (duplicated), AND every Section was `theme="dark"` — collapsing the entire dark/light alternation. Fixed by restoring spec tokens (`dark.canvas #0D1420`, `dark.canvasAlt #141E2C`, `light.canvas #F5F6F8`) and setting Problem→`darkAlt`, Solution→`light`, Contact→`light`. Verified rhythm: Hero(dark)→Problem(darkAlt)→WhyNow(dark)→Solution(light)→Careers(dark)→Contact(light)→Footer(dark). **Watch for regressions here** — this is the #1 thing that has broken twice. See [[theme-rhythm]].

2. **RESOLVED — WhyNow stat strip + duplicate-number bug.** Stat strip now renders via CountUp. Previously two stats both showed "10,000" (a credibility problem for a defense evaluator). Now matches the mockup's four distinct stats: 2,000,000 (teal) · 90 (red) · 10,000 STREAMS (teal) · MONTHS (gold). CountUp gained an optional `display` string prop to render non-numeric stats like "MONTHS" without animating.

3. **LATENT BUG — Reveal does not fire on anchor-jump / instant scroll.** `Reveal`/`CountUp`/`SolutionHex` use `useInView` (IntersectionObserver, `threshold:0.2`, `disconnect()` after first hit). When you deep-link or `scrollTo` directly to a below-the-fold section, IO often does NOT fire, leaving content stuck at `opacity:0`. On *real* user scroll it works. Symptom while testing: sections look blank after a programmatic jump. Fix idea (not yet done): on mount, if the element is already within (or above) the viewport, set `inView=true` immediately. Affects every section reached via nav anchor links.

4. **Image placeholders (historical note):** earlier Solution/WhyUs had dashed "Image placeholder" boxes; current Solution.tsx uses the SolutionHex flower instead (no placeholders). DESIGN_SPEC §5/§7 still envision a tactical map tile + floating dashboards that aren't built yet — real-product visuals remain the highest-value upgrade if asked to push further.

**How to apply:** if asked to "finish/polish," items 3 (reveal-on-jump) and the §5/§7 product visuals are the remaining gaps. Always re-verify the theme rhythm (item 1) after any Section edit.
