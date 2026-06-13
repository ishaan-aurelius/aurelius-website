---
name: theme-rhythm
description: The spec-locked dark/light section alternation for the Aurelius landing page and how to flip a section's theme without breaking color-spec rules
metadata:
  type: project
---

The landing page section theme rhythm is LOCKED in DESIGN_SPEC.md §2 (decided 2026-06-06): perfect dark/light alternation.

Order + themes: Nav(dark) → Hero(dark) → Solution(**light**) → WhyNow(dark) → WhyUs(**light**) → Careers(dark) → Contact(**light**) → Footer(dark).

**Why:** the color-spec's "clarity turn" — the palette shift to light at Solution reinforces the product message; and "never two light sections adjacent." A previous state had ALL sections `theme="dark"`, which broke the locked rhythm (no alternation, dark Contact touching dark Footer).

**How to apply:** themes are set via `<Section theme="light|dark|darkAlt">` (components/ui/Section.tsx). When flipping a section to light you must also swap, in that section's JSX: `text-dark-hi→text-light-hi`, `text-dark-mid→text-light-mid`, `text-dark-low→text-light-low`, `bg-dark-card→bg-light-card`, `border-dark-border→border-light-border`. See [[color-on-light-rules]] for the accent-color swaps (gold/red/hover) that also change. Kicker and Button components take an `onLight` prop — pass it on light sections.
