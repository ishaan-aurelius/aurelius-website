# The "Scale + Why Now" Section — Design Spec

**Date:** 2026-06-13
**Status:** Approved for planning
**Scope:** Replace the existing Why Now section with one new two-act section adapted from two source slides ("Cognitive overload from volume of data" and "Modern defense has evolved into a giant network problem"). Front-end only.

---

## 1. Purpose

Deepen the problem narrative immediately after the existing Problem section, by adapting two source slides into a single, low-text, animated section:

1. **The Scale** — the volume of data and the speed of modern conflict are beyond human cognition.
2. **Why Now** — modern defense has become a network problem, and the macro drivers make it urgent today.

The section ends on the Pentagon's stated demand ("mission planning to in-mission"), which bridges directly into the existing Solution section.

**De-identification:** No named individuals. U.S.-military framing, generic. Naming public defense-tech companies (Anduril, Palantir, Shield AI) and public programs (CJADC2, ABMS, etc.) is allowed — this is market context, not classified detail.

**Visual direction:** "Editorial Scale" (Direction B from brainstorming) — oversized numbers, generous whitespace, each number a single moment. Chosen because it is the least text-heavy and reads as serious defense tech rather than a slide deck.

---

## 2. Placement & integration

- **Replaces** the current `whyNow` content (the Multi-Domain Warfare / Kill Web / Budget Tailwinds / GenAI-Isn't-Enough points and the "battlefield liability" closing line are removed).
- **Rewrite** `components/sections/WhyNow.tsx` in place; keep `id="why-now"` so the nav anchor still resolves.
- **Move** `<WhyNow />` in `app/page.tsx` to sit between `<Problem />` and `<Solution />`. New page order:
  `Hero → Problem → WhyNow (this) → Solution → Why Us → Careers → Contact`.
- **Nav:** reorder `nav.links` so "Why Now" precedes "Solution", matching the new page order. Label and `#why-now` href unchanged.
- Copy lives in `content/site.ts` as the rewritten `problem`-style `whyNow` export — never inline in layout, per repo convention.
- Wrapped in the existing `<Section theme="dark">`. All sections are currently `#0E141F` dark; this is consistent and introduces no two-adjacent-light-sections violation.

---

## 3. Structure (one section, two acts)

```
ACT I — THE SCALE   [ kicker: "The Scale" ]
  - four oversized numbers, each on its own row with a single supporting line:
      2,000,000  GB of data per day from sensor arrays in a single theater     (teal)
      90         seconds to react to a Mach-5 threat 100 miles out             (white/hi)
      10,000     adversary signals scanned per second by EW jamming suites     (red)
      10,000     data streams monitored by a single command post               (gold)
  - two punch lines:
      "Most of it is never processed."                          ("never processed" red)
      "The window of decision advantage is narrowing. Fast."    ("narrowing. Fast." gold)

ACT II — WHY NOW   [ kicker: "Why Now" ]
  - headline: "Defense has become a network problem."
  - four drivers as a clean 01–04 list (gold numerals, short one-liners):
      01  The new Cold War          — US/China across the Indo-Pacific and Europe.
      02  Multi-domain kill web     — distributed warfighting needs AI-native, human + machine C2.
      03  DoD is funding AI         — FY26 budgets back CJADC2, Project Convergence, ABMS, Overmatch.
      04  Non-traditional tech wins — Anduril, Palantir, Shield AI prove venture-built defense is strategic.

BRIDGE BAR (gold, dark text)
  "The Pentagon wants kill-web-optimized, multi-domain ops — mission planning to in-mission."
  → deliberate handoff into the Solution section.
```

---

## 4. Copy (final, lives in `content/site.ts`)

New `whyNow` export shape (illustrative — exact field names tuned during implementation):

- `scaleKicker`: "The Scale"
- `stats`: four `{ value, format, line, accent }` entries matching the table in §3.
  - `2000000` (accent `teal`), `90` (accent `hi`), `10000` (accent `red`), `10000` (accent `gold`).
  - The `2,000,000` value requires thousands-separator formatting.
- `punch1`: `{ pre: "Most of it is ", red: "never processed", post: "." }`
- `punch2`: `{ pre: "The window of decision advantage is ", gold: "narrowing. Fast.", post: "" }`
- `whyKicker`: "Why Now"
- `headline`: "Defense has become a network problem."
- `drivers`: four `{ n, title, body }` entries (01–04) per §3.
- `bridge`: "The Pentagon wants kill-web-optimized, multi-domain ops — mission planning to in-mission."

---

## 5. Motion & accessibility

`WhyNow.tsx` is a **client component** (count-up + scroll reveals).

1. **Count-up** on the four Act I numbers when scrolled into view, staggered top-to-bottom. `2,000,000` is the dramatic beat; renders with thousands separators during the animation.
2. **Reveals** (reuse existing `Reveal` / `useInView`): punch lines after the stats; Act II headline → drivers 01→04 staggered → bridge bar last.

**`prefers-reduced-motion: reduce`:** count-up shows final values immediately; reveals become instant. Section is fully legible and complete in a static state.

No animation/graph library — CSS transitions + the existing intersection-observer pattern.

---

## 6. Shared-component refactor (in service of this work)

`CountUp` currently lives inside `components/sections/Problem.tsx`. Extract it to **`components/ui/CountUp.tsx`** and add an optional thousands-separator format option. `Problem.tsx` imports the shared component instead of its local copy — no behavior change to Problem. This avoids duplicating the count-up + reduced-motion logic across two sections.

---

## 7. Color / reference compliance

Per `References/aurelius-color-spec.md` and `REFERENCES_GUIDE.md`:

- Background `#0E141F` (`dark-canvas`), consistent with all panels.
- **Teal** (`#4AAFB8`): data only — the `2,000,000` GB data-volume stat.
- **Red** (`#D44040`): status/alert only — the `10,000` adversary-signals stat and "never processed". Explicit, reviewed use of red-as-status (same justification as the Problem section), not decoration.
- **Gold** (`#C8A85C`): accent — the `10,000` data-streams stat, "narrowing. Fast.", the 01–04 numerals, and the bridge bar (gold background with dark `#0D1420` text). No gold-as-CTA mislabeling; the bridge bar is a statement banner, not a CTA.
- No cream/beige, no pure black, no opacity-faded body text.

---

## 8. Files touched

- `content/site.ts` — replace `whyNow` export with the new shape (§4); reorder `nav.links` (Why Now before Solution).
- `components/sections/WhyNow.tsx` — full rewrite as the two-act Editorial Scale section.
- `app/page.tsx` — move `<WhyNow />` between `<Problem />` and `<Solution />`.
- `components/ui/CountUp.tsx` — new shared component (extracted from Problem).
- `components/sections/Problem.tsx` — import shared `CountUp`, remove local copy.

---

## 9. Out of scope

- Any change to other sections beyond the move/reorder above.
- Wiring numbers to a real data source (all static in `site.ts`).
- The dark→light section-rhythm rework (everything is dark today; separate future task).
- Reintroducing the dropped "battlefield liability" closing line (removed to stay faithful to the slides; revisit later if desired).

---

## 10. Open questions

None blocking. Exact `site.ts` field names, final number accents, and one-liner wording tuned during implementation.
