# azure-ct

A **GraphL content repo** for the Azure course — from cloud foundations to advanced application and operations. Course plan: [`AZURE-COURSE-PLAN.md`](AZURE-COURSE-PLAN.md); authoring approach and status: [`AUTHORING-PLAN.md`](AUTHORING-PLAN.md). Status: Chapters 1–4 authored (29 sections, narration text only — no `.wav` yet); Chapters 5–12 not started.

The rest of this file is the template's description of the content model.

The scaffold for a **GraphL content repo** — one concept, N courses, each course a list of sections.
Clone it, swap the identity, delete the demo course, start authoring.

Not a site of its own: it builds and runs so that the scaffold is verifiable, not to be deployed.

## Using it

```sh
gh repo create schemabotview/<slug> --public --template schemabotview/content-repo-template
cd <slug> && npm install
node scripts/init-template.mjs <slug> "<Subject>" "#rrggbb"
npm run dev          # http://localhost:5173
```

`TEMPLATE.md` is the full checklist — the mechanical swaps the script makes, plus the ones it
deliberately leaves to you.

## The content model

- **concept ⊃ course ⊃ section.** A **section** is the atomic unit of a video:
  `(scene, slide, narration)`. One section = one slide.
- **Left = scene, right = slide.** The scene is a react-flow diagram *or* a code card — both
  rendered by `@graphlearning/flow`. The slide is markdown.
- **Scenes are declarative.** Authors list nodes, edges and nesting; the engine computes every
  position and size. **Never write x or y** — deterministic layout is what makes the screenshots
  reproducible and the videos recordable.
- **`.md` is the source of truth** for both the slide (terse, for the eye) and the narration
  (flowing, for the ear).
- Narration wavs come from a Colab + Chatterbox pass, never by hand. Downstream timing reads the
  wav's length with `ffprobe`, never playback.
- A scene is content-agnostic and can be shared across sections.

## What is in here

```
src/content/    courses → sections (one file per section) + registry
src/scenes/     hand-authored scenes + registry
src/main.tsx    mounts <ConceptApp> from @graphlearning/shell
src/theme.css   --brand / --brand-hover / --accent-2 — the repo's whole design surface
scripts/        check-content.mjs · init-template.mjs · colab notebook · concept.json · titles.json
public/audio/<course>/    narration wavs
.github/workflows/deploy.yml    Pages deploy on push to main
```

The render engine (`@graphlearning/flow`) and the app shell (`@graphlearning/shell`) are **published
packages, pinned by version** — never a workspace symlink. `file:../ui-flow` is for local engine work
only and must never be committed: CI has no sibling checkout, and the pin is what stops one engine
change from breaking every site at once.

## Verifying a change

There is no test runner. The bar is all four:

```sh
npm run build        # must be clean
npx tsc --noEmit     # must be clean
npm run check        # content budgets: card overflow, slide clipping, dead focus, missing wavs
```

…and **the section looked at in the browser**. The three commands pass on frames that are visually
wrong — `npm run check` models a card's rendered height, but nothing models an edge label landing on
top of a card. The rendered route is the real bar.

Routes are `#/<course>-<section>`, e.g. `#/demo-what-a-section-is`. `#/` is the catalog.
