# Aurelius Website — Color Specification

For the developer. The site alternates dark and light sections as topics change. Dark sections use the brand navy system. For light sections, **do not reuse the old Wix cream (`#EFECE6`-range)** — it's warm-toned and clashes with the cool navy. Use the brand's own light theme (below), which is already part of the Aurelius design system and shares its undertone with the navy.

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

## 4. Section alternation

Suggested rhythm for the landing page:

| # | Section | Theme |
|---|---|---|
| — | Nav | Dark (`#0D1420`, blur/92% opacity) |
| 1 | Hero | Dark |
| 2 | The Problem | Dark (`#141E2C`) — keeps the hero's tension |
| 3 | The Solution | **Light** — the "clarity" turn; the palette shift reinforces the message |
| 4 | Why Now | Dark |
| 5 | About | **Light** |
| 6 | Careers | Dark |
| 7 | Contact | **Light** |
| — | Footer | Dark (`#0D1420`) |

Rules:

- Never two light sections adjacent; dark-dark is allowed only with the two different dark values (`#0D1420` / `#141E2C`).
- No transition gradients between sections — hard switch on a 1px border line (`dark/border` leaving dark, `light/border` entering light).
- Gold kicker labels (small caps, letterspaced) stay gold on both themes.
- Cards always sit one level lighter than their canvas on dark (`#1A2838` on `#0D1420`), and pure white on light canvas.

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
