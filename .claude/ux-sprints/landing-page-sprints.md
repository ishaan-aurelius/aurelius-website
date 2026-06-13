# UX Sprint Plan: Landing Page
Generated: 2026-06-12

## Design Summary
We're polishing the existing one-page site. The nav's "Contact Us" button loses its
outline and becomes a plain text link. Every section's heading + intro paragraph gets
centered. Why Now drops its stat strip. Why Us swaps its numbers card for an image.
Solution is rebuilt from a numbered list into Ethos-style **alternating image/text rows**
(text on one side, image on the other, flipping each row).

Assets: image slots are scaffolded as placeholders now; real screenshots/photos drop in later.

References consulted (per `REFERENCES_GUIDE.md`): color-spec for all colors (gold CTAs,
no cream, teal data-only), `image.png` Wix screenshot for Solution layout feel,
ethossystems.com for the alternating-row mood, mockup HTML for copy.

---

## Sprint 1: Nav — "Contact Us" becomes a text link
**Goal:** Replace the gold-outline `<Button variant="secondary">` with a plain text link that matches the other menu items (Solution / Why Now / Why Us / Careers).
**React/TS Concepts Introduced:** Components vs. elements; swapping a component (`<Button>`) for an element (`<Link>`); reusing `className` from a sibling.
**Tailwind Concepts Introduced:** `text-sm`, `text-dark-mid`, `hover:text-dark-hi` (these already exist on the nav links — you'll reuse them).
**Files to touch:** `components/sections/Nav.tsx`
**Acceptance criteria:** "Contact Us" sits inline with the other links, no border/box, same color + hover as the menu items. "Request a Demo" stays a gold button.

## Sprint 2: Center every section's heading + intro
**Goal:** Heading + intro paragraph of each section centered horizontally.
**React/TS Concepts Introduced:** Where shared layout lives; applying one consistent change across multiple components.
**Tailwind Concepts Introduced:** `text-center` (aligns text), `mx-auto` (centers a max-width block horizontally).
**Files to touch:** `components/sections/WhyNow.tsx`, `WhyUs.tsx`, `Careers.tsx`, `Solution.tsx`, `Hero.tsx`, `Contact.tsx`, and the `Kicker` label.
**Acceptance criteria:** Each section's kicker, `<h2>`, and lede are centered; body grids/cards below stay as they are.

## Sprint 3: Why Now — remove the stat strip
**Goal:** Delete the `2,000,000 / 90s / 10,000 / MONTHS` numbers block (we'll design a graphical version later).
**React/TS Concepts Introduced:** How a JSX block maps to on-screen output; safely removing a block (and noticing what data it leaves unused).
**Tailwind Concepts Introduced:** none new — reading/removing existing classes.
**Files to touch:** `components/sections/WhyNow.tsx` (and note the now-unused `stats`/`CountUp`).
**Acceptance criteria:** Heading → lede → points list, with the stat grid gone and spacing still even.

## Sprint 4: Why Us — numbers card → image placeholder
**Goal:** Replace the `10²⁶ / 4 / MINUTES` proof card with a placeholder image slot (real photo later).
**React/TS Concepts Introduced:** `next/image` vs a plain placeholder `div`; why a fixed aspect ratio matters before the real image exists.
**Tailwind Concepts Introduced:** `aspect-[4/3]`, `rounded`, `overflow-hidden`, `object-cover`.
**Files to touch:** `components/sections/WhyUs.tsx`
**Acceptance criteria:** The right column shows a neutral, correctly-proportioned placeholder; narrative column unchanged; `proof` data left in `site.ts` for now.

## Sprint 5: Solution — alternating image/text rows (the big one)
**Goal:** Turn the 01–04 steps into four full-width rows that alternate image-left/text-right ⇄ text-left/image-right (Ethos style). Pillar cards stay below.
**React/TS Concepts Introduced:** `.map()` with the item **and its index**; using the index to decide layout (even vs. odd row); conditional `className`.
**Tailwind Concepts Introduced:** responsive grid (`md:grid-cols-2`), `md:order-1 / md:order-2` (or `md:flex-row-reverse`) to flip a row, `items-center`.
**Files to touch:** `components/sections/Solution.tsx`
**Acceptance criteria:** Four rows, each with a placeholder image on one side and the step's number+title+body on the other, alternating sides; stacks vertically on mobile.

## Sprint 6: Polish, responsiveness & cleanup
**Goal:** Final pass — mobile stacking, spacing rhythm, remove any dead code, run lint/build.
**React/TS Concepts Introduced:** responsive breakpoints recap (`sm:`/`md:`/`lg:`); cleaning unused imports.
**Tailwind Concepts Introduced:** breakpoint prefixes review; vertical spacing (`gap-*`, `mt-*`).
**Files to touch:** any of the above as needed.
**Acceptance criteria:** Looks right at mobile + desktop widths, `npm run lint` clean, `npm run build` passes, no unused imports.
