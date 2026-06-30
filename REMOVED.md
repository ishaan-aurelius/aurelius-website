# Removed content log — 2026-06-30

This file records everything deleted during the **site trim** (reducing the site from
seven scrolling sections to four) so it can be recovered if needed. Nothing here is lost —
every deleted file still exists in git history.

## How to revert

All deletions were made on branch `newsite`. The commit **`f4f464b`** ("new changes")
is the last state that contains every file listed below.

- **Restore one file:**
  ```bash
  git checkout f4f464b -- "components/sections/Solution.tsx"
  ```
- **Restore several at once:** list multiple paths after `--`.
- **Restore the deleted content blocks** in `content/site.ts` (`problem`, `solution`,
  `whyNow`, `scale`, `whyUs`): they aren't separate files — recover them from the old
  version of the file:
  ```bash
  git show f4f464b:content/site.ts > /tmp/site.old.ts   # then copy the blocks you want back
  ```
- **See the full pre-trim diff:**
  ```bash
  git diff f4f464b -- .
  ```

> If the cleanup has since been committed, swap `f4f464b` for any commit before that.

---

## What the design used to be

**Page composition** (`app/page.tsx`), top to bottom:

```
Nav → Hero → Scale → WhyNow → Solution → Careers → Alumni → Contact → Footer
```

The trim removed **Scale, WhyNow, and Solution**, leaving:

```
Nav → Hero → Careers → Alumni → Contact → Footer
```

**Old nav links** (`content/site.ts` → `nav.links`):

| Label | Anchor |
|---|---|
| Scale | `#scale` |
| Why Now | `#why-now` |
| Product Overview | `#solution` |
| Careers | `#careers` |
| Contact | `#contact` |

Now: **Careers** (`#careers`) · **Our Team** (`#alumni`) · **Contact** (`#contact`).
Primary CTA "Request a Demo → `#contact`" was unchanged.

> `WhyUs` was already orphaned before this trim (not rendered in `page.tsx`), but its file
> and content block were still in the repo; both were removed here.

---

## Deleted inventory

### Section components (`components/sections/`)

| File | What it was |
|---|---|
| `Scale.tsx` | "Scale" section (`#scale`). Animated stat readouts — 847 Assets, 23 Threat Systems, 11 Commands, 5 Domains. |
| `WhyNow.tsx` | "Why Now" section (`#why-now`). Urgency narrative: combinatorial-explosion visual + four drivers. |
| `Solution.tsx` | "Product Overview" section (`#solution`). Four solution steps + six capabilities, with the platform-hexagon visual. |
| `WhyUs.tsx` | "Why Aurelius" section (already unrendered). Four-card moat (platform/operational) + three-entry proof (10²⁶ COAs, 4 ranked plans, MINUTES). |

### UI / visual helper components (`components/ui/`)

These were only used by the removed sections.

| File | What it was (best-evidence; exact code in git) |
|---|---|
| `AssetField.tsx` | Animated field-of-assets visual (Scale). |
| `BrandMark.tsx` | Standalone brand/logo mark element. |
| `CapabilityStatus.tsx` | HUD-style capability status readout. |
| `CombinatorialExplosion.tsx` | The 10²⁶ course-of-action "explosion" visualization (WhyNow / WhyUs). |
| `CountUp.tsx` | Animated number counter (drove the Scale stats). |
| `HexIcons.tsx` | Hexagon icon set. |
| `KillWeb.tsx` | "Kill web" network diagram visual. |
| `PillarIcons.tsx` | Icon set for pillar/feature lists. |
| `SignalNetwork.tsx` | Animated signal/network graphic. |
| `SolutionHex.tsx` | Hexagon visual wrapping `logo-mark.png` (Solution). |

### Content blocks (`content/site.ts`)

Removed exports: **`problem`**, **`solution`**, **`whyNow`**, **`scale`**, **`whyUs`**.
Kept: `nav`, `hero`, `careers`, `contact`, `footer`. Recover via `git show f4f464b:content/site.ts`.

### Assets

| File | What it was |
|---|---|
| `public/platform-hexagon.png` | Platform hexagon image, used only by the removed `Solution` section. |
| `Logo Graphic.png` (repo root) | Original logo-mark source; superseded by `public/logo-mark.png`. Referenced nowhere. |
| `Logo Wordy.png` (repo root) | Original wordmark source; superseded by `public/logo-wordmark.png`. Referenced nowhere. |
| `Screenshot 2026-06-14 at 03.48.18.png` (repo root) | Loose screenshot — a byte-for-byte copy of `platform-hexagon.png`. Referenced nowhere. |

### Docs & screenshots (`docs/` — directory now removed)

| File | What it was |
|---|---|
| `docs/screenshots/01-hero.png` | Screenshot of the old hero. |
| `docs/screenshots/full-desktop.png` | Full-page screenshot of the old (7-section) desktop design. |
| `docs/screenshots/full-mobile.png` | Full-page screenshot of the old mobile design. |
| `docs/superpowers/plans/2026-06-06-aurelius-landing-page.md` | Original landing-page build plan. |
| `docs/superpowers/specs/2026-06-06-aurelius-landing-design.md` | Original landing-page design spec. |
| `docs/superpowers/specs/2026-06-13-problem-section-design.md` | Design spec for the (removed) Problem section. |
| `docs/superpowers/specs/2026-06-13-scale-whynow-section-design.md` | Design spec for the (removed) Scale & Why Now sections. |

### Build artifact (not tracked in git)

- `out/` — stale 2.7 MB static export. Gitignored and regenerable (`next build`); deleted from disk only, so there's nothing to revert.

### Test updated (not deleted)

- `test/content.test.ts` — rewritten to assert only on the surviving `nav` (3 links) and
  `careers` content. The old version asserting on `solution`/`whyNow`/`whyUs` is in `f4f464b`.

---

## Deliberately kept (source-of-truth — NOT deleted)

Per the project `CLAUDE.md`, these govern every design decision and were left in place even
though they still describe the removed sections. They need a **trim**, not deletion:

- `DESIGN_SPEC.md`
- `REFERENCES_GUIDE.md`
- `References/**` (color spec, reference websites, Content Images, Design Inspiration)
- `public/logos/*.svg` — all eight are still used by the `Alumni` section.
