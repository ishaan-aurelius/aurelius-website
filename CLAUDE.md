# Aurelius Website — Project Instructions

This is the Aurelius marketing website. Before doing design or content work, you must consult the references — they are the source of truth, not your own assumptions.

## Mandatory rule: consult the references first

**Before making any design or content choice, read `REFERENCES_GUIDE.md`.** It is an index that tells you which reference governs which decision (colors, copy, layout, mood) and how to resolve conflicts between them. Do not pick a color, write copy, or lay out a section from memory or taste — route the decision through the guide first.

Workflow for any design/content task:

1. **Read `REFERENCES_GUIDE.md`.** Identify which reference(s) own this decision.
2. **Open only those references** and pull the relevant details.
3. **Build to them.** If they conflict, follow the resolution the guide already specifies (`REFERENCES_GUIDE.md` §1 authority hierarchy and §5 resolved conflicts).
4. **If a needed decision isn't covered by any reference, stop and ask** — don't invent it.

## Hard constraints (from the color spec — never violate)

These come from `References/aurelius-color-spec.md` and override any older design (including the Wix screenshots):

- CTAs are **gold** (`#C8A85C`) with dark text — **never red**. Red is status-only.
- **No cream/beige** (`#EFECE6` family). Use the spec's cool light tokens.
- No pure black, no opacity-faded text, teal is data-only.
- **The entire site is dark.** Every section uses the single dark canvas `#0D1420` (the Hero color) — no light sections, no dark/light alternation (user decision 2026-06-13, overrides the older alternation rhythm in the specs). Never flip a section to `light` or use a lighter canvas to separate sections; separation is the 1px `dark/border` hairline only.
- Never invent a hex value — every color comes from the spec.

## Source-of-truth lanes (quick reminder)

- **Color / theming** → `References/aurelius-color-spec.md`
- **Layout / typography / motion / per-section direction** → `DESIGN_SPEC.md`
- **Content / copy** → `References/aurelius-website-mockup-v2.html`
- **Per-section layout patterns** → `References/Design Inspiration/*` (re-skin to spec colors)
- **Layout / dark-light rhythm** → `References/Content Images/*` (Wix screenshots — feel only, not their colors)
- **Mood / aesthetic** → `References/reference_websites.md` (fetch live)
- **How these fit together / conflicts** → `REFERENCES_GUIDE.md`

Audience is the U.S. Defense Innovation Unit (DIU). The site must read like serious defense tech (Palantir/Anduril tier), be interactive/animated (never static), and never look like generic "AI slop." Details in `DESIGN_SPEC.md`.
