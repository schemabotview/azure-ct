# CLAUDE.md — azure-ct

> The workspace-level `CLAUDE.md` (one level up, in `graphl-workspace`) holds the invariants that
> span every repo. This file is only what is true *here*.

## What this repo is

The GraphL concept app for **Azure — from an empty tenant to a counterparty-risk data platform**,
authored from **`AZURE-COURSE-PLAN.md`** (re-planned 2026-10-22: 14 courses, 111 sections, one
project `risk-on-azure` — Woodgrove Bank's counterparty-risk data platform — built step by step;
awaiting owner review, no course authored). A **section** is `(scene, narration)` — one full-screen
frame, no slide — and one segment of the course video. The previous 12-chapter plan is in git history.

Engine `@graphlearning/flow@^2.2.0` (own renderer, react-flow removed); shell
`@graphlearning/shell@^0.14.0` (headerless section frames, `SCENE_ASPECT`). This repo's own surface is
`src/content/`, `src/scenes/`, `src/main.tsx`, `src/theme.css` and `scripts/`.

## Route contract

- Slug **`azure-ct`** — the GitHub repo name, the vite `base` (`/azure-ct/`) and the path under
  `graphl.in`. All three must be the same string.
- Routes: `#/` is the catalog; a section is `#/<courseId>-<sectionId>`. `?capture=1` and
  `window.__scene.plan()` come from the shell.
- Audio: `public/audio/<courseId>/<sectionId>.wav`. Section ids are unique within a course; scene ids
  are unique across the repo.

## Course arc and status

**Reset on 2026-10-22**: every course, scene and wav of the previous 12-chapter, slide-based course
(90 sections) was deleted, and the subject re-planned in `AZURE-COURSE-PLAN.md` around one project
(aws-ct's method). Nothing is registered in `src/content/index.ts` / `src/scenes/index.ts`; a course
is registered only once authored. `AUTHORING-PLAN.md` describes the previous course's approach and is
superseded by the plan.

| # | Course id | Course | Sections | Status |
| --- | --- | --- | --- | --- |
| 1 | `why-cloud` | Why the cloud | 6 | planned |
| 2 | `how-azure-runs` | How Azure runs a request | 6 | planned |
| 3 | `start` | Start the project | 6 | planned |
| 4 | `secure` | Lock it down | 8 | planned |
| 5 | `network` | Give it a network | 9 | planned |
| 6 | `automate` | Make it repeatable | 8 | planned |
| 7 | `land` | Land the files | 8 | planned |
| 8 | `batch` | Bring the batches in | 8 | planned |
| 9 | `stream` | Bring the stream in | 8 | planned |
| 10 | `transform` | Transform it in Databricks | 7 | planned |
| 11 | `serve` | Serve the results | 9 | planned |
| 12 | `publish` | Publish to the risk team | 9 | planned |
| 13 | `operate` | Operate it | 10 | planned |
| 14 | `evolve` | Measure, tune and evolve it | 9 | planned |

**Scope boundary:** the Databricks side (notebooks, Spark, Delta, Unity Catalog grants, Auto Loader,
Lakeflow) belongs to `databricks-data-engineer-ct`. This course teaches what Azure puts around it.

**Still to port from aws-ct before Course 1**, as that repo did: the `ideFrame` / `mapFrame` helpers,
`spine.py` and `check:spine` (against Azure's emulators), `check-plan.mjs`, `check-render.mjs`,
`check-icons.mjs`, a `check-azure.py` for the verification levels, and a scene-only
`check-content.mjs` (the current one still carries the slide-era models, harmless with no content).

**Network note (2026-10-22):** this environment's policy denies `learn.microsoft.com`; Microsoft's
emulator images (`mcr.microsoft.com`), PyPI, npm and NuGet are reachable.

## Invariants — do not break

- **Never write `x` or `y`.** Scenes are declarative: nodes, edges, nesting.
- **Do not reimplement the shell** (`SectionView`, `CourseIndex`, hooks). The route contract is what
  every recorder drives.
- **`SiteHeader` goes on the catalog page only.**
- **Three stylesheets, in cascade order** in `main.tsx`: flow, shell, then `./theme.css` last.
- **`file:../ui-flow` / `file:../ui-shell` must never be committed.**
- **Narration is never hand-produced.** `.tts` → `.wav` via Colab + Chatterbox only.
- **Synthetic names only** — Microsoft's fictitious companies (Woodgrove Bank, Wide World Importers,
  Fabrikam, Contoso, Tailspin, Northwind), documentation-style placeholder GUIDs, hypothetical prices
  labelled as such.

## Guards before handing over

```sh
npx tsc --noEmit && npm run build && npm run check
```

All are a **floor, not proof** — look at the rendered route.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, spine steps and narration together.
- **No ASCII sketches of scenes.**
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
