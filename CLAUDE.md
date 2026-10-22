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
| 2 | `how-azure-runs` | How Azure runs a request | 6 | authored, awaiting owner review (no narration audio yet) |
| 3 | `start` | Start the project | 6 | authored, awaiting owner review (no narration audio yet) |
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
  explorer 300 | editor 80 cols × 18 rows over terminal | side 520, 1632 × 918. **Every project
  line stays within 80 columns** and a file longer than 18 rows is folded with `show` (each fold is a
  row); the terminal holds about 16 lines; a side pane holds tables and lists only, with short cells.
  Anything larger grows a pane and `check-render.mjs` fails the frame.
- **Map frame side pane** is 853 px: a code card there must stay within ~80 columns, a terminal 88.
- **Concept frame** — any scene; author wide, not tall (the frame is 16:9).

## The spine: commands are replayed, not pasted

Every terminal pane, and every file shown in an editor, comes from `spine/<course>/<NN-step>/`:
`project/` is a snapshot of `risk-on-azure/` (or a Course 2 demo, `project` key), `session.txt` is the
transcript, `step.json` the step's settings (documented in `scripts/spine.py`). Scenes import these
with `?raw`. `npm run check:spine` replays every step in a fresh copy and fails on any difference;
`python3 scripts/spine.py --write [course/NN]` regenerates after an edit.

What makes a replay deterministic, all of it about the machine:
- **Real tools, pinned:** the Azure CLI 2.91.0 in its own environment (`spine/requirements-cli.txt`,
  extensions `datafactory` 1.0.4 and `databricks` 1.3.2 in `.spine-cache/cli-extensions`), the
  project's SDKs in another (`spine/requirements.txt`) — the CLI pins older SDKs (`azure-cosmos` 3.x,
  a storage beta), so only `az` goes on PATH. The Bicep CLI 0.48.1 comes from its NuGet package
  (`az bicep install` downloads from GitHub, which this environment cannot reach). **Never `npm install`
  inside `.spine-cache/`** without its own `package.json`: npm walks up and edits the repo's.
- **Azurite 3.37.0** serves the platform's own account, `stwgriskprod`, with a fixed emulator key, on
  127.0.0.1:10000–10002 — the addresses `env.sh` names in `AZURE_STORAGE_CONNECTION_STRING`. In
  output those become `https://stwgriskprod.{blob,queue,table}.core.windows.net`, except on a line
  that sets the connection string. A pane that shows it is titled `· emulated`.
- **The clock is frozen** by libfaketime at the step's `time` (default 2026-10-13 22:30:00 UTC) for
  Azurite and every command, so Last-Modified, Azurite's time-based ETags and SAS signatures repeat.
- **Random GUIDs** in output (request ids) become stable ones by order of appearance; a GUID written
  in the project or `step.json` is left alone.
- Only EXPORTED variables survive from one `$ ` line to the next (state is carried by `export -p`).
- **The control plane has no emulator.** A command that needs Resource Manager stops at
  `ERROR: Please run 'az login' to setup account.` — real output, shown where it teaches something.
  Otherwise control-plane files are shown `model-checked` (below), never as captured output.
- Output is hard-wrapped at the pane's width: 84 columns in an IDE terminal, `"columns": 88` in a map
  frame's side pane (`MAP_SIDE_W` is 853 px; 88 × 9.02 fits). A typed line exactly the pane's width is
  refused as ambiguous.

## Verification levels — read before trusting a code card

Every code card declares how it was verified, as the last part of its `filename` after ` · `, and
`npm run check:azure` (`scripts/check-azure.py`) proves the claim:

| level | what it means | what check:azure does |
| --- | --- | --- |
| `runs locally` | real Python or SQL, really run | runs the `.py` card with the SDK environment (or a `.sql` card in a fresh database on the local PostgreSQL 16 cluster); a sibling node `<id>-out` must equal its output exactly |
| `model-checked` | checked offline against Azure's own definitions | `.bicep`: `bicep build` + `bicep lint`, any warning fails (Bicep type-checks every property against Azure's API definitions); `.sh`: `bash -n`, and every `az …` line through the CLI's own parser (a command that only wants a sign-in passes; an unknown command or parameter fails); `<package>.<Model>.json`: every key at every depth is a member of that model in `azure-mgmt-<package>` (TypeSpec and msrest models, discriminated subtypes and maps handled); policy JSON: if/then, known effect, well-formed conditions; role JSON: Provider/type/operation actions |
| `emulated` | behaviour from an emulator, **not Azure** | must be a spine file (replayed); a stand-alone emulated card fails |
| `doc-cited` | Microsoft documentation says so | the scene file must carry a `// source: https://…` comment |
| `illustrative` | made-up but realistic; nothing checks it | counted, so unverified cards stay visible |
| `replayed` | a spine file; its filename carries no level | the card's text must equal a file under `spine/**/project/` byte for byte, and gets its type's static check |

The checker's model packages live in `.spine-cache/check` (`scripts/requirements-check.txt`).
Rules: a response card shows values that are **invented but shape-checked** — never present them as
captured output. When a claim is not on a card (a quota, a default, a timing), put its source URL in
the scene's comment.

## The fixed example (frozen: frames quote these numbers)

Extend this table — never change a value a frame already quotes. USD millions unless stated.

| fact | value |
| --- | --- |
| bank | Woodgrove Bank (Microsoft fictitious name); capital **80.0** → large-exposures threshold 10% = **8.0** |
| Wide World Group | limit **10.0**; Wide World Importers (UK): LC-1987 3.0, LC-2011 2.0, new LC-2041 2.0; Wide World Logistics (SG): LC-2003 2.5; open 7.5 + new 2.0 = gross 9.5; collateral cash 0.5 (0%) + warehouse goods 1.0 (40% → 0.6) = 1.1; **net 8.4**, headroom 1.6, on the report |
| sources | TradeBook (on-premises PostgreSQL, the deals); hierarchy file 18:00; limits extract 18:30; collateral file 19:00; market feed (Kafka) all day; report due **07:00** London |
| manual morning | illustrative: 06:00 export → 06:40 match groups → 07:20 collateral → 07:55 FX and limits → 08:15 build → 08:30 filed, 90 min late |
| platform day | overnight run 00–02 h, 16 workers; intraday refresh 08–18 h, 2 workers; 52 worker-hours used vs 384 owned (14%); hypothetical USD 0.20 per worker-hour → 10.40 rented vs 76.80 owned |
| tenant | `woodgrovebank.example`, id `aaaabbbb-0000-cccc-1111-dddd2222eeee` (Microsoft-documentation-style placeholder) |
| hierarchy | management group `woodgrove` → `platform` (subscription platform-connectivity `cccc2c2c-dd3d-ee4e-ff5f-aaaaaa6a6a6a`) / `landing-zones` (risk-prod `aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e`, risk-dev `bbbb1b1b-cc2c-dd3d-ee4e-ffffff5f5f5f`); risk-prod groups `rg-risk-prod-net`, `rg-risk-prod-data`, `rg-risk-prod-app` |
| Regions | `uksouth` (London, zones 1–3) paired with `ukwest` (Cardiff, no zones) |
| names | `<type>-wg-<role>-<env>`: `kv-wg-risk-prod`, `evh-wg-risk-prod`, `dbw-wg-risk-prod`, `psql-wg-riskmart-prod`, `app-wg-exposure-prod`; storage `stwgriskprod` (no hyphens) |
| hierarchy file | `hierarchy_20261013.csv`, 507 bytes: G-WW Wide World Group (C-101 Wide World Importers GB, C-102 Wide World Logistics SG), G-FAB Fabrikam Holdings (C-201 Fabrikam Textiles IN, C-202 Fabrikam Fibres VN), G-CON Contoso Shipping (C-301 Contoso Shipping GB, C-302 Contoso Freight NL), G-TAIL Tailspin Traders (C-401 US), G-NW Northwind Group (C-501 Northwind Foods GB, C-502 Northwind Trading AE) |
| rate card | **hypothetical**, USD: VM 4 vCPU 0.20/h allocated; managed disk 0.10/GB-month; public IP 0.005/h; Event Hubs throughput unit 0.03/h; lake hot 0.02/GB-month; PostgreSQL 2 vCore 0.25/h; log data 2.00/GB ingested; 730 h/month. Always labelled hypothetical on screen |
| risk-dev month | VM 146.00, 128 GB disk 12.80, public IP 3.65, 1 TU 21.90, 200 GB lake 4.00: running 188.35, stopped in the OS 188.35, deallocated 42.35 |
| dev environment | `rg-risk-dev-data` in `uksouth`, `stwgriskdev` (HNS, Standard_LRS, TLS 1.2, no public blob access), container `landing`; tags `app=risk-platform env=dev owner=priya` |
| sign-in | priya@woodgrovebank.example; profile lists risk-prod (default) and risk-dev; she sets risk-dev |
| break-glass | `breakglass-01`, `breakglass-02`: Global Administrator, cloud-only, phishing-resistant MFA |
| dev ledger | vm-wg-shir-dev 146.00, disk 12.80, pip-wg-shir-dev 3.65, evh-wg-risk-dev 21.90 (untagged), stwgriskdev 4.00; owner priya 166.45, untagged 21.90; budget `risk-dev-monthly` 150 USD monthly, filter env=dev, actual 80% / forecast 100% → email priya; forecast 126% |
| API versions | Storage data plane `x-ms-version` 2026-10-06 (SDK 12.31); Microsoft.Storage control plane `2025-08-01` (CLI 2.91, Bicep 0.48.1) |

## Scene inventory

| Scene id | Shape | Used by |
| --- | --- | --- |
| `risk-question` | Wide World's hierarchy and deals, collateral, the exposure sum, the report test, the ten words | `why-cloud-the-risk-question` |
| `five-sources` | five sources → one spreadsheet → the report, beside the illustrative morning | `why-cloud-one-team-five-sources` |
| `overnight-burst` | workers-per-hour plot, own 16 vs rent 52 worker-hours (hypothetical rate) | `why-cloud-renting-instead-of-owning` |
| `managed-services` | own server → VM → PostgreSQL → Data Factory → Power BI, bank runs / Microsoft runs | `why-cloud-managed-services` |
| `shared-responsibility` | always the bank's / always Microsoft's, who-patches matrix, incidents | `why-cloud-shared-responsibility` |
| `risk-on-azure` | map frame: the finished platform, the course as its route, four kinds of frame | `why-cloud-what-we-will-build` |
| `azure-regions` | UK geography: UK South's three zones (zone 2 lost), UK West, the pair; boundaries and zone-loss tables | `how-azure-runs-regions-and-availability-zones` |
| `ownership-tree` | tenant → management groups → subscriptions → resource groups, four jobs, what an RG is not, placeholders | `how-azure-runs-tenant-management-groups-subscriptions-and-resource-groups` |
| `arm-requests` | clients → Resource Manager (token, RBAC, Policy, locks) → providers; control vs data plane | `how-azure-runs-every-action-is-an-arm-request` |
| `request-anatomy` | map frame: replayed blob read, request_parts.py, the control plane refusing without login (`spine/how-azure-runs/04-anatomy`) | `how-azure-runs-anatomy-of-a-request` |
| `resource-ids` | the landing container's resource ID split, the naming rule, why names matter | `how-azure-runs-resource-ids-and-naming` |
| `what-keeps-charging` | the hypothetical rate card, risk-dev's month running / stopped / deallocated | `how-azure-runs-what-keeps-charging` |
| `project-tour` | IDE: the finished tree, what-each-part-is-for table in the editor's place | `start-the-finished-project-toured` |
| `break-glass` | the tenant's identities (break-glass, daily, workloads), what the highest roles reach, lock it away | `start-the-tenant-and-its-break-glass-accounts` |
| `first-session` | map frame: a staged sign-in profile read by the real CLI (no token), what az login does | `start-a-first-session` |
| `emulators` | IDE: env.sh, the emulator refusing an uppercase name; the emulator list and what none can show | `start-the-emulators-beside-azure` |
| `first-resources` | map frame: infra/01-lake.sh (stops at the sign-in), landing created twice in the emulator | `start-the-first-resources` |
| `cleanup` | IDE: tools/cost_ledger.py (188.35 / 42.35, untagged 21.90), the budget, what deleting a group leaves | `start-budgets-tags-and-cleanup` |

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
npx tsc --noEmit && npm run build && npm run check && npm run check:spine && npm run check:azure
node scripts/snap.mjs <outDir> [slug-prefix …]   # 1920×1080 captures to look at
```

`check` = scene-only content + icon names + plan conformance + `check-render.mjs` (every section at
3840×2160: text leaving its node, clipped content, IDE panes and the map that move).

All are a **floor, not proof** — look at the rendered route.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, spine steps and narration together.
- **No ASCII sketches of scenes.**
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
