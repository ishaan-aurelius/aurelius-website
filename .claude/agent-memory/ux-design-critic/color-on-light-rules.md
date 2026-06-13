---
name: color-on-light-rules
description: Accent-color token swaps required when an Aurelius section is light — gold text, error red, and gold hover all differ from the dark theme (WCAG contrast)
metadata:
  type: project
---

On LIGHT sections, accent tokens differ from dark (from References/aurelius-color-spec.md §3 & §5):

- **Gold-colored TEXT/icons/numerals:** use `text-gold-textL` (#8A6F2E), NOT `text-gold` (#C8A85C). Plain gold on the light canvas is ~2.1:1 — fails for text. Gold (#C8A85C) is still fine as a button *fill* and as a border (e.g. `border-t-gold` card rules).
- **CTA button text:** always `text-dark-canvas` (#0D1420) on the gold fill, both themes — do NOT change this on light.
- **Gold button hover:** `hover:bg-gold-hoverL` (#B8983C, darkens) on light; `gold-hoverD` (#DFC87C, lightens) on dark.
- **Error/alert text:** `text-alert-l` (#A82828) on light; `text-alert-d` (#D44040) on dark.

**Why:** these were the exact bugs when Solution/WhyUs/Contact were flipped from dark to light — gold text, the Send-button hover, and form error text were all still using dark-theme tokens.

**How to apply:** grep the flipped section for `text-gold[^-]`, `alert-d`, `gold-hoverD` after a theme change. The `Kicker` and `Button` components already encapsulate the gold-textL swap via their `onLight` prop — prefer passing that over hand-rolling. Teal is data-only (`teal-d` dark / `teal-l` light), never a link/interactive color. Related: [[theme-rhythm]].
