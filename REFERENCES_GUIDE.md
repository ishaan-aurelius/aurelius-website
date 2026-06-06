# How to Use the References (Read Me First)

This file tells you (Claude) **what each reference in this repo is for, what to pull from it, and what to ignore**. The `References/` folder contains inputs of different kinds — design inspiration, an authoritative color spec, a content/structure mockup, and screenshots of an old design. They are **not** equally authoritative and they sometimes **conflict**. This file resolves those conflicts.

> When a prompt points you here, load this file first, then load only the reference files relevant to the task.

---

## 1. Authority hierarchy (who wins when references disagree)

Read top-down. A higher source overrides a lower one **on its own topic**.

| Rank | Source | Authoritative for | NOT authoritative for |
|---|---|---|---|
| 1 | `References/aurelius-color-spec.md` | **All color, theming, section alternation rules, contrast** | Content wording, layout details |
| 2 | `DESIGN_SPEC.md` (the comprehensive design doc) | Layout, spacing, typography, components, **motion**, per-section direction | Color (defers to #1) |
| 3 | `References/aurelius-website-mockup-v2.html` | **Content** (copy, section order, data/stats) | **Design — ignore its visual styling** |
| 4 | `References/Design Inspiration/*` (curated section refs) | **Per-section layout patterns** (cards, tactical map, floating UI, bento) | **Color — re-skin to spec; img 04 is off-palette blue** |
| 5 | `References/Content Images/*` (Wix screenshots) | **Layout feel, section structure, the dark/light rhythm** | **Color — their red & cream are retired (see §5)** |
| 6 | `References/reference_websites.md` (external sites) | General aesthetic / mood inspiration | Anything Aurelius-specific |

**The one rule to remember:** *Colors come from the spec (#1). Content comes from the mockup (#3). Layout/feel comes from the Wix images (#4). Mood comes from the external sites (#5).*

---

## 2. File-by-file guide

### `References/aurelius-color-spec.md` — THE color source of truth
- Use for: every hex value, the dark/light token system, the per-section dark↔light alternation rhythm, accent usage (gold CTAs, teal for data only, red for status only), and WCAG contrast rules.
- The CSS `:root` variables in the mockup HTML already match this spec — reuse those token names.
- **Hard rules from this file you must never break:** no red CTAs, no cream/beige (`#EFECE6` family), no pure black, no opacity-faded text, teal is data-only, never two light sections adjacent.

### `References/aurelius-website-mockup-v2.html` — CONTENT & STRUCTURE only
- Use for: the actual copy (headlines, body, stats like `10^26`, the 01–04 Solution steps, the "Why Now" stat line, About credentials, Careers pillars, contact email).
- Use for: section **order** and what each section contains.
- **Do NOT treat its design as a target.** It is a quick AI-generated mockup — basic typography, simple spacing. Real design comes from the design doc + Wix layout feel + reference sites. Treat its visuals as "good enough to read," not "the look."

### `References/Content Images/` — Wix screenshots (LAYOUT FEEL, not color)
The user built these in Wix and **likes the alternating dark/white section rhythm** — that's the main thing to carry over. Per-image map:

| File | Section | What to take from it |
|---|---|---|
| `image-5.png` | **Hero** | Full-bleed dark hero, world-map dot texture, gold accent on key phrase ("modern conflict") |
| `image.png` | **Solution / "How It Works"** | Dark section, large 01–04 numbered list, supporting image on one side |
| `image-2.png` | **Why Now** | Dark section, row of cards, imagery inside cards |
| `image-3.png` | **About / "Who Are We"** | **Light/white** section, gold section-label banner, team photo |
| `image-4.png` | **Careers** | Dark section, four cards with gold headings, four-up grid |

- Take from these: composition, where images sit, the dark/light alternation, card grids, overall density.
- **Ignore from these:** the **red buttons** and the **cream/beige cards** — both are retired by the color spec. Re-skin every CTA to gold and every cream card to the spec's light/dark card tokens. (See §5.)

### `References/reference_websites.md` — external inspiration
- Two sites the user likes: `ethossystems.com` and `distributedspectrum.com`.
- Use for: overall mood, motion/restraint, how a serious defense-tech brand presents itself.
- **Fetch these live when doing design work** (don't design the aesthetic from memory). Do not copy their content, colors, or layout 1:1 — they inform feel only.

---

## 3. Quick task → which references to load

- **"Build/style a section"** → color-spec (§1) for colors + matching Wix image for layout + mockup HTML for that section's copy.
- **"Write/adjust copy"** → mockup HTML only.
- **"Set the overall aesthetic / vibe"** → external sites + color-spec.
- **"Pick a color / fix contrast"** → color-spec only. Never invent a hex.

---

## 4. Section alternation (canonical order)

From the color spec; this is the target rhythm (dark/light must alternate, never two light adjacent):

Nav (dark) → Hero (dark) → Why Now (dark-alt) → Solution (**light**) → About (**light**)* → Careers (dark) → Contact (**light**) → Footer (dark)

\*The spec and mockup differ slightly on ordering between Solution/Why Now/About. **Follow the color spec's alternation rule** (no two light sections touching) and confirm final order in the design doc when it exists.

---

## 5. Known conflicts — resolved (do not re-litigate)

1. **Red CTAs (Wix images) vs gold CTAs (spec):** Gold wins. All CTAs are gold (`#C8A85C`) with dark text (`#0D1420`). Red is status-only.
2. **Cream/beige cards (Wix images) vs light tokens (spec):** Spec wins. Use `light/canvas #F5F6F8` and `light/card #FFFFFF`; never the warm `#EFECE6` family.
3. **Mockup visual quality vs Wix layout:** Mockup gives content; Wix gives layout feel; neither dictates final polish — the design doc will.

---

*This guide describes how to consume references. It is not the design document — that comes later and will own layout, typography, spacing, and components in detail.*
