---
name: design-debt
description: Known unfinished design items on the Aurelius landing page — shipped image placeholders and the missing Why Now animated stat strip
metadata:
  type: project
---

Open design debt as of 2026-06-12 (verify against current code before acting — these may be resolved):

1. **Shipped "Image placeholder" dashed boxes** in Solution.tsx (4 step images, alternating rows) and WhyUs.tsx (1 command-center photo). They look more unfinished on the now-light canvas than they did on dark. DESIGN_SPEC §5/§7 actually want real product screenshots / a tactical map tile (Reference B: `02-solution-threat-map-split.png`) and floating dashboards (`03-whyus-floating-dashboards.png`), not generic photos.

2. **Why Now stat strip is NOT rendered.** content/site.ts `whyNow.stats` (2M GB/DAY, 90 SECONDS, 10K STREAMS, MONTHS) exists, and a fully-built `components/ui/CountUp.tsx` exists, but WhyNow.tsx never imports/renders either. DESIGN_SPEC §6 explicitly requires "big animated count-up stats; monospace numerals (teal, data-only)." **Conflict to resolve with user:** the mockup (content source-of-truth, §3) displays abbreviated "2M"/"10K", but the raw values 2000000/10000 + the CountUp component imply a literal count-up to "2,000,000". Formatting direction is a genuine open fork — don't guess.

**How to apply:** if asked to "finish" or "polish" these sections, these two items are the highest-value gaps. CountUp animates integers and shows `toLocaleString` (commas) — it would render "2,000,000" not "2M", so a magnitude/format decision is needed first.
