# Authoring plan — Azure course (`azure-ct`)

Source of truth for *what* to teach: [`AZURE-COURSE-PLAN.md`](AZURE-COURSE-PLAN.md) (12 chapters, 90 sections).
This file is *how* we turn it into GraphL content. Scaffold: `content-repo-template`
(`@graphlearning/flow` + `@graphlearning/shell`, pinned by version).

## 1. Mapping the plan onto the content model

| Course plan | Repo |
| --- | --- |
| Chapter *N* | One **course**, id `chNN-<slug>` → `src/content/chNN-<slug>/`, `src/scenes/chNN-<slug>/`, `public/audio/chNN-<slug>/` |
| Numbered section | One **section** = `(scene, slide, narration)` = one video segment, file `NN-<section-id>.ts` |
| Worked illustrations | Scenes: diagrams for paths/boundaries, code cards for CLI, Bicep, Policy JSON, Python, SQL, KQL |
| Objective / Outcome / Bridge | Opening and closing sentences of the first and last section of each course (not extra sections) |

Course ids and search-first publish titles (`scripts/titles.json`) are drafted below; the section count
per course is fixed by the plan (6·8·6·9·7·7·8·9·6·7·10·7 = **90**, counts verified against the lists).

| # | Course id | Draft title | Sections |
| --- | --- | --- | --- |
| 1 | `foundations` | Azure Basics: Subscriptions, Resource Groups, Regions | 6 |
| 2 | `identity` | Azure Identity, RBAC, Managed Identity and Policy | 8 |
| 3 | `app-service` | Deploying a Web App on Azure App Service | 6 |
| 4 | `networking` | Azure Networking: VNets, NSGs, DNS and Private Endpoints | 9 |
| 5 | `compute` | Azure Compute: VMs, Container Apps and AKS Compared | 7 |
| 6 | `storage` | Azure Storage: Blob, Files, Disks and Redundancy | 7 |
| 7 | `databases` | Azure Databases: SQL, PostgreSQL, Cosmos DB and Caching | 8 |
| 8 | `integration` | Azure Functions, Service Bus, Event Grid and Event Hubs | 9 |
| 9 | `analytics` | Azure Data Pipelines: ADLS, Data Factory, Fabric | 6 |
| 10 | `delivery` | Azure Bicep and CI/CD: Deploy Safely | 7 |
| 11 | `operations` | Azure Monitor, KQL, Security and Disaster Recovery | 10 |
| 12 | `optimisation` | Azure Architecture Review: Cost, Performance, Well-Architected | 7 |

## 2. Per-section recipe (every section, same order)

1. **Research** the primary Microsoft Learn page(s) for the section. The course plan says to verify
   Region, SKU, runtime, API version, quota, retirement notice and price *when lessons are authored* —
   do this per section, and record the check date in the section file's header comment.
2. **Scene first.** Pick the one picture or code card that carries the idea; reuse a scene from earlier
   when the same system reappears (focus a different node). Declarative only — no `x`/`y`.
3. **Slide** (markdown, terse, ≤ ~1000 modelled px, 80–95 % of the pane): `##` title, `###` groups,
   few bullets. Bullets cost more height than prose.
4. **Narration** (flowing prose, for the ear): follow the teaching method — objective → mental model →
   annotated example and expected behaviour → alternative or failure contrast → summary → bridge.
5. **Failure/boundary line.** Each section states at least one thing the plan flags as *not* true
   (e.g. "a resource group is not a network boundary") so misconceptions are addressed, not implied.
6. **Guards**: `npm run build && npx tsc --noEmit && npm run check`.
7. **Measure density on the rendered route** (see below), then **look at it** (`#/<course>-<section>`) in a browser — card overflow, edge labels over cards,
   density targets in `CLAUDE.md`.

### Density gate (every section)

Measured on the rendered route at 1920×1080 with a headless-browser probe, not just the modelled
`check` heights. Targets: slide text **80–95 %** of pane height; scene **≥ 0.55** area and the binding
axis near **0.85–0.95**; no node under the top-left eyebrow (raise `padding` to 0.10–0.12 for tall boards).
Levers are real content and restacking (`cols`), never padding for its own sake. Icon keys are also
validated against the engine's registry, because `check` does not.

## 3. Recurring assets (built once, reused)

- **Retail app scene family** — one base `retail-app` board (browser → edge → App Service → data →
  queue → fulfilment → analytics) drawn per chapter with only the relevant slice, so the example
  evolves without becoming one giant architecture (the plan forbids accumulating every service).
- **Boundary vocabulary** — consistent node patterns/icons for control plane vs data plane, identity,
  network boundary, failure boundary. Pick the icon keys by copying from existing scenes
  (`icon:` names are not validated).
- **Code-card conventions** — CLI, Bicep, JSON policy, Python, SQL, KQL; always annotated, always with
  expected output beside it, secrets never inline, synthetic names/IDs only (`contoso-retail`, `<sub-id>`).

## 4. Order of work

| Phase | Scope | Exit gate |
| --- | --- | --- |
| 0 | Scaffold from template, identity swap, this plan *(done)* | `build` / `tsc` / `check` green |
| 1 | **Pilot: Chapter 1 (6 sections)** — full unit: scenes, slides, narration *(authored)* | You review the rendered routes; adjust voice, density, scene style |
| 2 | Chapters 2–4 (identity → app → network: the core path) — *authored* | Review per chapter |
| 3 | Chapters 5–8 (compute, storage, data, messaging) — *authored* | Review per chapter |
| 4 | Chapters 9–12 (analytics, delivery, operations, optimisation) — *authored* | Review per chapter |
| 5 | Cross-chapter pass: bridges, terminology, repeated scenes, retirement/SKU re-verification — *density and consistency done; fact re-verification pending (see below)* | Full `check` green |

Reasoning: chapter 1 is small and sets every convention; locking style on it avoids rework across 84
later sections. Chapters 2→3→4 carry the learning spine's riskiest ideas (access, networking), so they
come before breadth chapters.

## 5. What I will and will not do

- **Do:** write `.ts` section/scene files, registries, `titles.json`, README/CLAUDE updates, run guards,
  take rendered screenshots with the preinstalled Chromium to check frames.
- **Do not:** produce narration audio. `.wav` files come only from the Colab + Chatterbox pass
  (`scripts/colab_generate_audio.ipynb`). Until a course has its first wav, `check` does not require
  them; once it does, every section in that course must have one.
- **Do not:** treat the guards as proof. The rendered route is the bar and you review it.
- **Do not:** claim anything the docs don't support — SKU limits, previews, retirement dates are
  labelled and dated; Azure Cache for Redis is framed as a retirement/migration context.

## 6. Open points to settle before bulk authoring

1. **Narration length / voice.** Demo narration is ~120–170 words per section. Same target?
2. **Chapter granularity.** Twelve courses (one per chapter) vs fewer longer courses. Default: twelve.
3. **Demo course** — deleted when Chapter 1 was registered.
4. **Pages/catalog.** Enabling Pages and listing in `ui-graphl`'s `catalog.json` are yours; I haven't touched either.

## 7. Status and review guide (all 12 chapters authored)

**Built:** 12 courses, 90 sections (scene + slide + narration each). `npm run build`, `npx tsc --noEmit`
and `npm run check` pass. Every route was rendered at 1920×1080 and measured for slide height, scene
board size and eyebrow collisions; scenes were viewed where a measurement or edit changed them. Icon keys
were validated against the engine's registry (the repo's `check` does not do this).

**Not done / needs you**
1. **Fact verification.** `learn.microsoft.com` was unreachable from the authoring environment, so every
   section carries a header comment saying it was written from stable knowledge and must be re-checked.
   Section-specific `note:` lines name what to verify first: SKU and tier eligibility, retirement notices
   (App Service runtimes, Consumption plan, Azure Cache for Redis, default outbound access, Synapse versus
   Fabric direction), CLI flags and runtime strings, API versions, licensing for Conditional Access / PIM,
   and Azure Backup / storage retention defaults.
2. **Narration audio.** No `.wav` files exist; they come only from the Colab + Chatterbox pass. Once a course
   has its first wav, `check` requires one for every section in it.
3. **Hypothetical numbers.** Cost units, latency breakdowns, pool sizes, RPO/RTO targets and utilisation
   figures are labelled hypothetical or synthetic on the slide or in the scene; no real prices are quoted.

**Known visual compromises**
- Narration runs 172–219 words per section (median 192), above the demo's 120–170. Trim if the video
  segments feel long.
- Ten boards sit at 52–55 % scene area (target ≥ 55 %) because they are tall and narrow: ch01 resource-manager
  and first-request, ch03 http-requests, ch04 virtual-networks, routes-outbound and tls, ch08 api-management,
  ch10 what-if and schema-rollback, ch12 architecture-compare. They bind on height at ~90 %, so widening
  would mean adding content, not spacing.
- Page-level checks, not exhaustive: edge labels landing on cards are only caught by eye.

**Repo gates used per chapter:** `tsc` → `check` → icon-registry validation → rendered density measurement →
visual spot checks → fail-closed commit. The measurement harness lives outside the repo (`.tmp/`, ignored).
