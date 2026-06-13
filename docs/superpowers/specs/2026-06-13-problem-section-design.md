# The "Problem" Section — Design Spec

**Date:** 2026-06-13
**Status:** Approved for planning
**Scope:** One new marketing-site section, placed immediately after the hero. Front-end only. This is the first of several content sections being reworked; later sections are out of scope here.

---

## 1. Purpose

Establish the problem Aurelius solves, by adapting two source slides into a single, clean, animated section:

1. **The order / demand** — a high-stakes strike plan is required in under six hours, across an enormous scale (hundreds of assets, dozens of threats, many commands, every domain).
2. **The reality** — today's joint military planning process is a tangled, loop-ridden, manual web that takes weeks, months, or quarters.

The section ends on the gap between the two — *hours demanded vs. quarters delivered* — which hands directly off to the existing Solution section ("mission plans in minutes, not months").

**De-identification (hard requirement):** No named individuals (the source slides' "ADM Cooper" and "GEN Caine" are removed). Framing is about the U.S. military as a whole. No named adversary or strike target — the brief copy is **fully generic**.

---

## 2. Placement & integration

- New component: `components/sections/Problem.tsx`.
- Rendered in `app/page.tsx` between `<Hero />` and `<Solution />`.
- Wrapped in the existing `<Section theme="dark">` so it inherits the uniform `#0E141F` background and the standard top border, consistent with every other panel (all panels were unified to `#0E141F` in the prior change).
- Copy lives in `content/site.ts` as a new `problem` export — never inline in layout, per repo convention. `Problem.tsx` imports from it.

---

## 3. Structure (one section, two acts)

A single section, scrolled top to bottom:

```
[ kicker: "The Problem" ]
[ headline: "An executable strike plan, demanded in under six hours." ]

ACT I — THE ORDER
  - restrained comms brief (FROM / TO / SUBJ), monospace, gold left-rule
  - live countdown clock ("TIME TO BRIEF")
  - faint telemetry text as near-background texture behind Act I
  - scale stat row: 847 Assets | 23 Threat Systems | 11 Commands | 5 Domains

[ divider label: "But today, this is the process" ]

ACT II — THE REALITY
  - animated "living tangle": planning-step nodes + edges
  - gold forward task-edges; red feedback loops that visibly cycle and never resolve
  - a rotating dashed loop ring reinforcing "no exit"

PUNCHLINE
  - "Hours demanded. Weeks, months, quarters delivered."
```

---

## 4. Act I — The Order (tone: restrained, with one dramatic beat)

- **Headline:** "An executable strike plan, demanded in **under six hours**." ("under six hours" in gold.)
- **Brief block:** monospace, gold left-border rule. Lines:
  - `FROM  U.S. Department of War HQ`
  - `TO    A U.S. Combatant Command`
  - `SUBJ  Execute order — immediate action required`
  - Generic objective line, **no named adversary/target** (e.g. "Maximize effect against a near-peer adversary's critical infrastructure").
- **Countdown clock:** "TIME TO BRIEF" label + `HH:MM:SS`, red digits (status/urgency).
  - **Behavior:** on first scroll-into-view, ticks down for a few seconds to signal "the clock is running," then **holds** at a fixed value. Does not run perpetually, does not reach zero.
- **Telemetry texture:** a block of faint asset-feed lines (e.g. `ASSET F-35A//VIPER 01`, `THREAT SA-21//RANGE 400km`, `SUPPLY 847//TRANSIT`) rendered very low-contrast (`~#1d2a3a` on `#0E141F`) behind Act I content. Present but barely legible — atmosphere, not information. `aria-hidden`.
- **Scale stat row:** four stats with count-up animation on view.
  - `847` Assets — **teal** (data accent)
  - `23` Threat Systems — light
  - `11` Commands — gold
  - `5` Domains — light
  - Bordered top and bottom with `dark-border` rules.

---

## 5. Act II — The Reality (the living tangle)

- An animated network of real planning steps, composed (not a literal hairball), faithful to the source slide's message.
- **Nodes** (absolutely positioned, representative subset of the slide):
  - start (teal): "Planner begins task"
  - neutral (gold): "Data from many departments", "Asset availability", "Doctrine", "Planning period: months", "Plan → commander"
  - pain (red): "Feedback required", "Objectives change", "Restart"
- **Edges:** thin gradient lines with a flowing dashed animation.
  - **Gold** edges = forward task flow.
  - **Red** edges = feedback loops, pointing backward.
- **Loop ring:** a rotating dashed red circle near the center reinforcing the unresolvable cycle.
- The illegible-by-design tangle *is* the argument: the eye can't find the exit. Labels remain individually readable; the overall flow does not resolve.

---

## 6. Punchline

- Centered, below the tangle: "**Hours demanded.** <span red>Weeks, months, quarters</span> **delivered.**"
- This is the deliberate bridge into the Solution section.

---

## 7. Motion & accessibility

`Problem.tsx` is a **client component** because three behaviors need JS:

1. **Count-up** on the four stats when scrolled into view (reuse existing `Reveal` / intersection pattern).
2. **Countdown** clock — ticks down once on first view, then holds.
3. The **tangle** animations are pure CSS (dash flow + loop rotation); no JS needed beyond mount.

**`prefers-reduced-motion: reduce`:**
- Countdown shows its final held value immediately, no ticking.
- Stat count-up shows final numbers immediately.
- Dash-flow and loop-rotation animations are disabled.
- The section is fully legible and complete in a static state.

No heavy animation/graph library — CSS animations + a small amount of React state.

---

## 8. Color / reference compliance

Per `References/aurelius-color-spec.md` and `REFERENCES_GUIDE.md`:

- Background `#0E141F` (`dark-canvas`), consistent with all panels.
- **Gold** (`#C8A85C`): accents, forward task-edges, key headline phrase. No gold-as-CTA here (no CTA in this section).
- **Teal** (`#4AAFB8`): data only — used for the `847` assets stat and any "data" telemetry highlight.
- **Red** (`#D44040`): **status/alert only** — the countdown urgency and the failure-state nodes/edges (feedback required, objectives change, restart). This is an explicit, reviewed use of "red = status," not decoration. No red CTAs.
- No cream/beige, no pure black, no opacity-faded body text (the telemetry texture is a deliberate low-contrast decorative element, `aria-hidden`, not readable copy).

---

## 9. Out of scope

- Real product imagery / screenshots.
- Wiring stat values or telemetry to any real data source (all static content in `site.ts`).
- Any change to other sections beyond inserting this one in `page.tsx`.
- Content rework of later sections (separate future specs).

---

## 10. Open questions

None blocking. Exact final wording of brief lines, node labels, and the generic objective line can be tuned during implementation against `content/site.ts`.
