# Aurelius Website — Color Specification

For the developer. **The site is uniformly dark — every section uses the navy canvas `#0D1420` (see §4, locked 2026-06-13). There are no light sections.** The light theme tokens in §2 are retained for reference but are not used for section backgrounds. (If light tiles ever appear inside a dark section, **do not reuse the old Wix cream (`#EFECE6`-range)** — it's warm-toned and clashes with the cool navy; use the brand's own light theme below.)

## 1. Dark sections (primary)

| Token | Hex | Use |
|---|---|---|
| `dark/canvas` | `#0D1420` | Section background |
| `dark/canvas-alt` | `#141E2C` | Optional second dark value for adjacent dark areas (nav, footer) |
| `dark/card` | `#1A2838` | Cards, panels, stat boxes |
| `dark/border` | `#2A3E55` | Hairline borders & dividers, 1px only |
| `dark/text-primary` | `#C8D4DE` | Headings |
| `dark/text-secondary` | `#A0B8C8` | Body text |
| `dark/text-muted` | `#6A859A` | Captions, footnotes, labels |

## 2. Light sections

| Token | Hex | Use |
|---|---|---|
| `light/canvas` | `#F5F6F8` | Section background |
| `light/card` | `#FFFFFF` | Cards, panels on light canvas |
| `light/border` | `#E4E7EC` | Hairline borders & dividers, 1px only |
| `light/text-primary` | `#1A1F2A` | Headings |
| `light/text-secondary` | `#4A5060` | Body text |
| `light/text-muted` | `#6B7280` | Captions, footnotes, labels |

Alternative if you want a touch more warmth than `#F5F6F8`: `#F7F6F3` (a near-neutral with a hint of warmth that still sits well against the navy). Pick one — don't mix.

## 3. Accent colors (shared, theme-aware)

| Role | On dark | On light | Notes |
|---|---|---|---|
| Gold accent / CTAs | `#C8A85C` | `#C8A85C` | Same value both themes. CTA button text is always `#0D1420`. |
| Gold hover | `#DFC87C` | `#B8983C` | Lighten on dark, darken on light |
| Data / stats (teal) | `#4AAFB8` | `#0D8B92` | Big numbers only — never body text |
| Alert / negative (red) | `#D44040` | `#A82828` | Status use only. **Never CTAs, never decoration.** |
| Caution / mid-severity (amber) | `#E0A030` | `#B8791E` | Status use only — partial/degraded states below the red threshold. **Never CTAs, never decoration.** (added 2026-06-14) |

## 4. Section background — uniform dark (LOCKED 2026-06-13)

> **The entire site is dark. Every section — Nav through Footer — uses the single dark canvas `#0D1420` (the Hero color).** There are **no light sections** and **no dark/light alternation.** This is a hard user decision and overrides the earlier alternation plan below. Do not flip any section to a light canvas, and do not use `#141E2C` as a section background to fake separation. The light tokens in §2 remain defined but are **unused for section backgrounds.**

| # | Section | Theme |
|---|---|---|
| — | Nav | Dark `#0D1420` (blur/92% opacity) |
| 1 | Hero | Dark `#0D1420` |
| 2 | The Problem | Dark `#0D1420` |
| 3 | Why Now | Dark `#0D1420` |
| 4 | The Solution | Dark `#0D1420` |
| 5 | Careers | Dark `#0D1420` |
| 6 | Contact | Dark `#0D1420` |
| — | Footer | Dark `#0D1420` |

Rules:

- **One canvas everywhere: `#0D1420`.** No light sections, no alternation, no `#141E2C` section backgrounds.
- Section separation comes from the 1px `dark/border` hairline at each section top — never a canvas color change.
- No transition gradients between sections — hard switch on the 1px `dark/border` line.
- Gold kicker labels (small caps, letterspaced) stay gold.
- Cards always sit one level lighter than the canvas: `#1A2838` on `#0D1420`. Depth comes from card/panel layering, not a lighter section background.

## 5. Contrast notes (WCAG)

- `#A0B8C8` body on `#0D1420` ≈ 8.6:1 — AA/AAA ✓
- `#4A5060` body on `#F5F6F8` ≈ 7.6:1 — AA/AAA ✓
- `#C8A85C` gold on `#0D1420` ≈ 6.6:1 — AA ✓ (fine for headings/labels)
- Gold on `#F5F6F8` ≈ 2.1:1 — **fails for text**. On light sections, gold is for buttons (with dark text), rules, and large numerals only; gold-colored *text* on light must use `#8A6F2E`.
- `#0D1420` button text on `#C8A85C` ≈ 6.6:1 — AA ✓ both themes.

## 6. Don'ts

- No red CTAs anywhere (legacy Wix style — retired).
- No cream/beige (`#EFECE6` family) — replaced by the light tokens above.
- No pure black (`#000000`) backgrounds or text.
- No opacity-faded text colors — use the specified muted tokens.
- Teal is a data color, not a link/interactive color.
