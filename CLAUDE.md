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
| 1 | `why-cloud` | Why the cloud | 6 | authored, awaiting owner review (no narration audio yet) |
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

## Frames

Sections are **scene-only** (no `slide`; `check-content.mjs` fails on one). Four kinds, tagged per
section in the plan:

- **Map frame** — `mapFrame(id, built, side)` in `src/scenes/map.ts`: the platform's ONE architecture
  map (`platformMap`) at its natural size on the left, a side pane pinned to fill a 16:9 frame on the
  right. Every part is always drawn with the same label, so the map never moves; a part not built yet
  trades its Azure icon for a grey `box` outline. `BUILT_BY[n]` is what the platform has at the end of
  course n (the bank's own systems and readers exist from Course 1). `MAP_W` × `MAP_H` (1318 × 1227)
  is the map as laid out — re-measure if a part's label changes (`.tmp/measure.mjs`, local).
  `check-render.mjs` fails a map frame whose map or side pane moves.
- **IDE frame** — `ideFrame()` in `src/scenes/ide.ts`, the python-ct / Spark / aws-ct template:
  explorer 300 | editor 80 cols × 18 rows over terminal | side 520, 1632 × 918.
- **Concept frame** — any scene; author wide, not tall (the frame is 16:9).

## The fixed example (frozen: frames quote these numbers)

Extend this table — never change a value a frame already quotes. USD millions unless stated.

| fact | value |
| --- | --- |
| bank | Woodgrove Bank (Microsoft fictitious name); capital **80.0** → large-exposures threshold 10% = **8.0** |
| Wide World Group | limit **10.0**; Wide World Importers (UK): LC-1987 3.0, LC-2011 2.0, new LC-2041 2.0; Wide World Logistics (SG): LC-2003 2.5; open 7.5 + new 2.0 = gross 9.5; collateral cash 0.5 (0%) + warehouse goods 1.0 (40% → 0.6) = 1.1; **net 8.4**, headroom 1.6, on the report |
| sources | TradeBook (on-premises PostgreSQL, the deals); hierarchy file 18:00; limits extract 18:30; collateral file 19:00; market feed (Kafka) all day; report due **07:00** London |
| manual morning | illustrative: 06:00 export → 06:40 match groups → 07:20 collateral → 07:55 FX and limits → 08:15 build → 08:30 filed, 90 min late |
| platform day | overnight run 00–02 h, 16 workers; intraday refresh 08–18 h, 2 workers; 52 worker-hours used vs 384 owned (14%); hypothetical USD 0.20 per worker-hour → 10.40 rented vs 76.80 owned |

## Scene inventory

| Scene id | Shape | Used by |
| --- | --- | --- |
| `risk-question` | Wide World's hierarchy and deals, collateral, the exposure sum, the report test, the ten words | `why-cloud-the-risk-question` |
| `five-sources` | five sources → one spreadsheet → the report, beside the illustrative morning | `why-cloud-one-team-five-sources` |
| `overnight-burst` | workers-per-hour plot, own 16 vs rent 52 worker-hours (hypothetical rate) | `why-cloud-renting-instead-of-owning` |
| `managed-services` | own server → VM → PostgreSQL → Data Factory → Power BI, bank runs / Microsoft runs | `why-cloud-managed-services` |
| `shared-responsibility` | always the bank's / always Microsoft's, who-patches matrix, incidents | `why-cloud-shared-responsibility` |
| `risk-on-azure` | map frame: the finished platform, the course as its route, four kinds of frame | `why-cloud-what-we-will-build` |

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
