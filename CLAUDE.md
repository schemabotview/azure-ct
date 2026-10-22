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
| 4 | `secure` | Lock it down | 8 | authored, awaiting owner review (no narration audio yet) |
| 5 | `network` | Give it a network | 9 | authored, awaiting owner review (no narration audio yet) |
| 6 | `automate` | Make it repeatable | 8 | authored, awaiting owner review (no narration audio yet) |
| 7 | `land` | Land the files | 8 | authored, awaiting owner review (no narration audio yet) |
| 8 | `batch` | Bring the batches in | 8 | authored, awaiting owner review (no narration audio yet) |
| 9 | `stream` | Bring the stream in | 8 | authored, awaiting owner review (no narration audio yet) |
| 10 | `transform` | Transform it in Databricks | 7 | authored, awaiting owner review (no narration audio yet) |
| 11 | `serve` | Serve the results | 9 | authored, awaiting owner review (no narration audio yet) |
| 12 | `publish` | Publish to the risk team | 9 | planned |
| 13 | `operate` | Operate it | 10 | planned |
| 14 | `evolve` | Measure, tune and evolve it | 9 | planned |

**Scope boundary:** the Databricks side (notebooks, Spark, Delta, Unity Catalog grants, Auto Loader,
Lakeflow) belongs to `databricks-data-engineer-ct`. This course teaches what Azure puts around it.

**Network note (2026-10-22):** this environment's policy denies `learn.microsoft.com`; Microsoft's
emulator images (`mcr.microsoft.com`), PyPI, npm and NuGet are reachable. **The Learn pages' own
sources are reachable on GitHub**: `raw.githubusercontent.com/MicrosoftDocs/<repo>/<branch>/<path>`
for the public repos `azure-docs`, `azure-compute-docs`, `entra-docs`, `azure-management-docs`,
`azure-monitor-docs`, `azure-dev-docs`, `fabric-docs`, `azure-docs-cli` (Key Vault, PostgreSQL,
Cosmos DB, reliability and policy pages live in repos that are not public — web search for those).
Built-in role JSON comes from `azure-docs/articles/role-based-access-control/built-in-roles/*.md`,
built-in policy definitions from `raw.githubusercontent.com/Azure/azure-policy/master/built-in-policies/`.
A local `.tmp/doc.sh` (tree-only clones as a path index, raw fetch for one file) is how facts were
checked; it is not committed. Cite the learn.microsoft.com URL that page publishes as.

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
- **Ids:** `ideFrame` and `mapFrame` name their wrappers `<id>-explorer`, `<id>-centre`, `<id>-side`,
  `<id>-map`; a side pane's own root must not reuse one (use `<id>-pane`) — the renderer hangs.
- **Explorer trees** are generated from the snapshots (`src/scenes/<course>/tree.ts`); a folder marked
  new stays open, so mark files, not a folder of long names (it widens the explorer).
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
- **Event Hubs and Service Bus run in Microsoft's emulators, in Docker** (Event Hubs 2.2.1 with its
  own Azurite, Service Bus 2.0.1 with SQL Server 2022 CU26), started by a step that has
  `eventhubs.json` / `servicebus.json` beside it, on the standard ports, which `env.sh`'s connection
  strings name. Start Docker first (`dockerd`). Their clocks are real: never print an enqueued time,
  and give a step that reads or settles messages `"time": "real"` (no faked clock at all) — a frozen
  clock stalls the SDKs' waits, and a ticking one starts in each process separately, so Azurite's
  clock runs ahead of the reader's and blob-stored partition ownership never looks expired. The
  Service Bus emulator refuses a TTL over 1 h and a duplicate window over 5 min. `{"cosmos": true}`
  starts the Cosmos DB (NoSQL) vNext emulator on 8081 (`COSMOS_ENDPOINT` / `COSMOS_KEY` in env.sh);
  it reports a flat request charge, so RU figures are doc-cited.
- Output is hard-wrapped at the pane's width: 84 columns in an IDE terminal, `"columns": 88` in a map
  frame's side pane (`MAP_SIDE_W` is 853 px; 88 × 9.02 fits). A typed line exactly the pane's width is
  refused as ambiguous.

## Verification levels — read before trusting a code card

Every code card declares how it was verified, as the last part of its `filename` after ` · `, and
`npm run check:azure` (`scripts/check-azure.py`) proves the claim:

| level | what it means | what check:azure does |
| --- | --- | --- |
| `runs locally` | real Python or SQL, really run | runs the `.py` card with the SDK environment (or a `.sql` card in a fresh database on the local PostgreSQL 16 cluster); a sibling node `<id>-out` must equal its output exactly |
| `model-checked` | checked offline against Azure's own definitions | `.yml`: actionlint (syntax, expressions, each known action's real inputs); a spine `adf/<folder>/*.json`: walked against azure-mgmt-datafactory's Pipeline/Dataset/LinkedService/Trigger resource models; a spine `.bicepparam`: `bicep build-params` + lint; `.bicep`: `bicep build` + `bicep lint`, any warning fails (Bicep type-checks every property against Azure's API definitions); `.sh`: `bash -n`, and every `az …` line through the CLI's own parser (a command that only wants a sign-in passes; an unknown command or parameter fails); `<package>.<Model>.json`: every key at every depth is a member of that model in `azure-mgmt-<package>` (TypeSpec and msrest models, discriminated subtypes and maps handled); policy JSON: if/then, known effect, well-formed conditions; role JSON: Provider/type/operation actions |
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
| groups | Risk Data Engineers (priya), Risk Analysts (omar), Credit Officers (sam), Risk Auditors (audit-01); daily accounts synced from the bank's directory |
| Conditional Access | admin roles → phishing-resistant MFA; risk data (analysts, officers) → compliant device; legacy sign-in blocked; break-glass excluded from blocks (Entra ID P1) |
| exposure API app | registration "Exposure API", `api://exposure-api`, scope `Exposure.Read`; omar's oid `bbbbcccc-1111-dddd-2222-eeee3333ffff`; dashboard client `00001111-aaaa-2222-bbbb-3333cccc4444`; token 821 chars, 65 min (made locally, labelled) |
| identities | `id-wg-exposure-prod` user-assigned (API + breach function); system-assigned: `adf-wg-risk-prod`, `ac-wg-risk-prod`, `vm-wg-shir-prod-1` |
| role assignments | Risk Data Engineers: Contributor on risk-dev, Reader on risk-prod; Risk Analysts: Storage Blob Data Reader on gold; Risk Auditors: Reader on landing-zones, Blob Data Reader on reports; adf-wg-risk-prod: Blob Data Contributor on landing. Built-in definitions verbatim in `policies/roles/`; answers from `tools/access_check.py` (a model: no deny assignments, no conditions) |
| policies | built-in Allowed locations (`e56962a6-4747-49cd-b67b-bf8b01975c4c`, Indexed, so not resource groups) → uksouth, ukwest; custom "Storage: no public network access" (deny unless publicNetworkAccess = Disabled; missing counts); both at management group woodgrove/landing-zones |
| management groups | woodgrove → platform (platform-connectivity) / landing-zones (risk-prod, risk-dev) |
| PIM | Owner on risk-prod: nobody standing; 3 platform engineers eligible 1 h with approval; break-glass via Global Administrator; access reviews quarterly; Activity Log 90 days |
| address plan | on-premises 10.50.0.0/16; hub `vnet-hub-uks` 10.100.0.0/22 (GatewaySubnet .0.0/27, AzureFirewallSubnet .0.64/26 — firewall 10.100.0.68, snet-dns-inbound .1.0/28 — resolver 10.100.1.4); prod spoke `vnet-risk-prod-uks` 10.110.0.0/20: snet-dbx-host .0.0/26, snet-dbx-container .0.64/26 (Databricks-delegated), snet-pe .1.0/24, snet-app .2.0/26 (App Service-delegated), snet-shir .3.0/27; dev spoke 10.120.0.0/20 (not peered with prod); 5 addresses reserved per subnet |
| network rules | all subnets private (`--default-outbound-access false`); `rt-risk-prod-spoke` 0.0.0.0/0 → firewall 10.100.0.68 on app, shir, pe; `nsg-snet-pe`: 100 app→5432, 110 Databricks (10.110.0.0/25)→443, 120 shir→443, 4096 deny VirtualNetwork; private zones blob, dfs, vaultcore, servicebus, postgres linked to spoke + hub; lake private endpoints `pe-stwgriskprod-blob` 10.110.1.4, `-dfs` 10.110.1.5; lake public network access Disabled |
| peak sizing | Databricks 17 addresses per subnet (16 workers + driver); 9 private endpoints; app 20 (10 instances × 2 in a scale); shir 2 |
| front of the dashboard | now: private Application Gateway (London, internal); Course 14: Front Door with a Private Link origin (Singapore joins) |
| hybrid | ExpressRoute in London via the hub gateway (not encrypted by default); site-to-site VPN as backup; spoke-to-hub peering with gateway transit; platform team owns the hub (`rg-hub-net`) |
| templates | `templates/main.bicep` (subscription scope: rg-risk-<env>-net / -data, modules network, lake, vault, runtime); subnets are child resources, `@batchSize(1)`; `prod.bicepparam` / `dev.bicepparam` (10.110 / 10.120); runtime admin `shiradmin`, password from `az.getSecret(..., kv-wg-risk-<env>, runtime-admin-password)`; vault `enabledForTemplateDeployment` |
| drift (model) | stwgriskprod TLS lowered to 1.0 by hand → Modify back to 1.2; `stwgscratch` made by hand → Ignore (incremental) / Delete (complete) |
| pipeline | GitHub repo `woodgrove-example/risk-on-azure`; `deploy.yml` build → dev → prod (prod environment needs a reviewer); `release.yml` reusable; identities `risk-deploy-dev` / `risk-deploy-prod`, federated subject `repo:woodgrove-example/risk-on-azure:environment:<env>`, Contributor on own subscription only; release order infra → Databricks bundle → Data Factory (triggers stopped); deployment name `risk-<env>-<sha7>`, `out/SHA256SUMS` |
| lake zones | containers `landing` (as delivered, 30 days), `bronze` (kept; cool > 30 d, cold > 90 d), `silver`, `gold`; blob + container soft delete 14 days; HNS: no blob versioning, soft delete does not keep overwrites; landing is write-once (`<source>/<date>/<file>`) |
| collateral file | `collateral_20261013.csv`, 19:00, six rows COL-7001…7006 (C-101 cash 0.50 / warehouse goods 1.00 haircut 0.40; C-201 receivables 2.40; C-301 vessel mortgage 6.00, redelivered as 5.40; C-501 cash 0.80; C-502 standby LC 1.50); drop SAS create+write on landing, 30 min (emulated) |
| lifecycle model | bronze 2 GB/day, a year: hot 62 / cool 120 / cold 548 GB = 4.63 vs all hot 14.60 USD/month; landing 60 GB 1.20 (**hypothetical**: hot 0.020, cool 0.010, cold 0.004 per GB-month) |
| reports | account `stwgreports<env>` (GZRS, no HNS), container `large-exposures`, container-level WORM 2,557 days (seven years, assumed bank rule), locked by `infra/07-lock-reports.sh` |
| collateral share | account `stwgcollat<env>` (ZRS), share `collateral` 100 GiB SMB, Microsoft Entra Kerberos (`AADKERB`), default share permission None, role Storage File Data SMB Share Contributor |
| TradeBook deals | `data/tradebook.sql` (local PostgreSQL 16 stand-in, `trade.deals`), 12 Oct: LC-1987 C-101 3.00, LC-1990 C-201 4.00, LC-1995 C-202 1.20, GT-2001 C-301 5.50, LC-2003 C-102 2.50, LC-2007 C-302 0.90, TL-2010 C-401 3.30, LC-2011 C-101 2.00, LC-2015 C-501 2.20, LC-2020 C-502 1.80 (10 deals, 26.40); 13 Oct: + LC-2041 C-101 2.00 (14:05), LC-1995 → 1.50 (11:20), LC-2007 deleted |
| batch copy | factory `adf-wg-risk-prod`, runtime `ir-bank`; pipeline `copy_tradebook` (tumbling window `tr_tradebook_daily`, 24 h, delay 5 min, retry 2 × 600 s) → `bronze/tradebook/deals/<window start>/deals.parquet`: first load 10 rows, 13 Oct 2 rows; reconcile TradeBook 10 / 27.80 vs lake 11 / 28.70 (LC-2007) |
| arriving files | `load_landing_file` (Get Metadata → If → Copy or Fail `ContractBroken`), storage event triggers `tr_hierarchy_arrives` / `tr_collateral_arrives` (`/landing/blobs/<source>/`, `.csv`, ignore empty); `contracts/hierarchy.json`; `hierarchy_20261014.csv` refused (cpty_id, lei, three-letter countries) |
| factory identity | linked services `ls_lake` / `ls_keyvault` (managed identity), `ls_tradebook` (user `adf_reader`, Key Vault secret `tradebook-adf-reader`); roles Key Vault Secrets User on the vault, Blob Data Contributor on landing and bronze; deployer gets RBAC Administrator conditioned to those two roles (`infra/08-deploy-can-assign.sh`) |
| streams | namespace `evh-wg-<role>-<env>` → `evh-wg-risk-prod` Standard, 2 TUs, auto-inflate to 4, Kafka on, local auth off; hubs `fx-rates` (key: pair) and `deal-events` (key: deal), 4 partitions, 1 day, group `exposure-intraday`; Capture → bronze, Avro, 300 s / 300 MB, as the namespace's identity |
| stream runs (emulated) | AMQP keys: GBPUSD → partition 3, EURUSD 1, SGDUSD 2, deal events → 0; Kafka (`feeds/market_producer.py`, `data/fx_20261013.csv`): SGDUSD 0, GBPUSD 1 (×3), EURUSD and INRUSD 3; checkpoints: 3 events, then LC-2042 (partition 2) only |
| deal steps | Service Bus `sb-wg-risk-<env>` Standard, queue `deal-steps` (sessions, duplicate detection 10 min — emulator 5, lock 30 s, 3 deliveries, TTL 1 day — emulator 1 h); LC-2041 booked / documents-checked / issued (retry dropped), LC-2042 issued dead-lettered (MaxDeliveryCountExceeded) |
| stream model | 08:00 burst 2,600 events/s × 5 s: 2 TUs refuse 600/s, in by 7 s; 3 TUs none, 5 s; 14:00 minute open to 14:01:10 (SGDUSD at 14:01:24 too late); 4 deal events, 3 kept |
| workspace | `dbw-wg-risk-<env>` Premium, managed group `rg-dbw-wg-risk-<env>-managed`, VNet-injected (`snet-dbx-host` / `snet-dbx-container`, NSG `nsg-snet-dbx`), no public IP, public access off, `NoAzureDatabricksRules`, private endpoint `pe-dbw-wg-risk-<env>` (`databricks_ui_api`) in snet-pe; access connector `ac-wg-risk-<env>` (Blob Data Contributor on the lake); URL `adb-1234567890123456.7.azuredatabricks.net` (illustrative) |
| Databricks secrets | Key Vault-backed scopes need access policies, so a second vault `kv-wg-dbx-<env>` (access policies, trusted services); scope `risk-kv`, READ for Risk Data Engineers only; secret `tradebook-dbx-reader` |
| Databricks compute | Standard_D4ds_v5 (4 vCPU), DDSv5 quota 100 (assumed); overnight 16 workers + driver 00–02 (68 vCPU), by day intraday 2 + driver and three engineers' 4-worker clusters (18 nodes, 72 vCPU; 41 addresses spare); policy `policies/databricks/overnight-job.json` (Spot with fallback, driver on demand, tags); **hypothetical** Spot 0.06/h, DBU 0.15, 0.75 DBU per node-hour (assumed): night VMs 6.80 → 2.32, overnight 6.14 a run / 184.35 a month, intraday 9.38 / 206.25, total 390.60 |
| nightly pipeline | `nightly`: ExecutePipeline copy_tradebook → DatabricksJob `BuildExposure` (job 481516234200, `business_date`), linked service `ls_databricks` (MSI); `tr_tradebook_daily` now starts `nightly`; the intraday job uses Databricks' own scheduler |
| risk mart | `psql-wg-riskmart-<env>` PostgreSQL 16, General Purpose Standard_D2ds_v5, zone 1 + ZoneRedundant standby zone 3, 128 GB, 14-day geo-redundant backups, Entra only, private endpoint; `sql/mart.sql` (schema `mart`: groups, exposure 13 Oct, reservations, view headroom); limits G-WW 10.00 / G-FAB 8.00 / G-CON 6.00 / G-TAIL 4.00 / G-NW 5.00, net 8.40 / 3.70 / 1.30 / 3.30 / 1.85, headroom 1.60 / 4.30 / 4.70 / 0.70 / 3.15 |
| reservations | two 1.00 at once against 1.60: READ COMMITTED both commit (−0.40), SERIALIZABLE B refused (40001), finds 0.60; lost reply retried: no key 2 rows (1.00), key `req-7f3a` 1 row (0.50) |
| group lookup | `cosmos-wg-risk-<env>` NoSQL, Session, Entra only, private, db `risk`, container `groups` (/groupId), autoscale 4,000 RU/s; emulator vNext EN20261008 (flat request charge); hot partition model 1,200 → 3,000 lookups/s, 40% one group → 1,200 RU/s vs 1,000 share; ETag 412 for the second editor; batch add C-103 + members 3 applied, add C-101 409 none |
| cache | `redis-wg-risk-<env>` Azure Managed Redis Balanced_B1, keys off; model TTL 60 s: stale 10–60 s, delete-on-write fresh from 10 s |
| TradeBook move | target `psql-wg-tradebook-prod`, migration `tradebook-2026-11` online from 10.50.12.7 (`infra/11-migrate-tradebook.sh`, `infra/migration-tradebook.json`); cutover Saturday 06:00, old server kept read-only a month |
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
| `people-signin` | map frame: infra/04-groups.sh, the four groups, Conditional Access, authn vs authz | `secure-people-and-sign-in` |
| `app-tokens` | IDE: tools/token_claims.py (a locally made token decoded, tampered, refused); app object vs service principal | `secure-applications-and-tokens` |
| `managed-identities` | map frame: infra/04-identities.sh, the workload identities, system- vs user-assigned | `secure-managed-identities` |
| `role-assignments` | IDE: policies/assignments.py + tools/access_table.py (the RBAC model's answers), scopes reach down | `secure-role-based-access` |
| `two-planes` | IDE: tools/access_check.py + planes.py: Contributor cannot read a blob, but can list keys | `secure-control-plane-and-data-plane` |
| `policy-deny` | IDE: policies/storage-private.json + tools/policy_check.py over five proposed resources | `secure-azure-policy` |
| `environments` | map frame: infra/04-management-groups.sh, what lands where, what a subscription isolates | `secure-management-groups-and-environments` |
| `privileged-access` | PIM activation steps, access reviews, landing-zone ownership, standing vs eligible Owner, audit trail | `secure-privileged-access-and-audit` |
| `cidr-plan` | IDE: tools/cidr_plan.py (no overlaps, usable counts), CIDR and ports tables | `network-addresses-cidr-and-ports` |
| `spoke-subnets` | map frame: infra/05-network.sh (private, delegated subnets) + tools/subnet_fit.py (a sizing model) | `network-a-spoke-for-the-platform` |
| `routes` | map frame: infra/05-routes.sh + tools/route_pick.py (longest prefix, UDR > BGP > system), ways out | `network-routes-and-outbound-access` |
| `traffic-filters` | map frame: infra/05-nsg.sh + tools/nsg_check.py (six flows, AllowVnetInBound trap) | `network-network-security-groups` |
| `dns-names` | map frame: infra/05-dns.sh + tools/resolve.py (one name, three vantage points) | `network-names-inside-and-outside` |
| `tls-path` | map frame: hop-by-hop TLS, certificates, private is not encrypted | `network-tls-along-the-path` |
| `private-endpoints` | map frame: infra/05-private-endpoints.sh + tools/reach.py; private vs service endpoint | `network-private-endpoints-and-service-endpoints` |
| `front-door-choice` | Load Balancer / Application Gateway / Front Door / Traffic Manager, the dashboard's answer in two steps | `network-load-balancer-application-gateway-or-front-door` |
| `hybrid-links` | map frame: infra/05-peering.sh, ways to join networks, ExpressRoute + VPN backup | `network-reaching-the-bank` |
| `script-rerun` | map frame: infra/05-network.sh + tools/script_rerun.py (a model): refused / unchanged / left alone | `automate-when-the-scripts-stop-scaling` |
| `bicep-arm` | IDE: modules/network.bicep, bicep build + tools/arm_summary.py; Bicep → ARM table | `automate-bicep-and-arm` |
| `bicep-modules` | IDE: main.bicep (subscription scope, three modules), its nested deployments; scopes | `automate-modules-references-and-scopes` |
| `bicep-params` | IDE: prod.bicepparam, build-params shows the Key Vault reference; prod vs dev | `automate-parameters-outputs-and-secrets` |
| `what-if` | IDE: tools/whatif.py (a model) in incremental and complete mode; drift; replacements | `automate-what-if-drift-and-replacement` |
| `pipeline-identity` | IDE: release.yml (OIDC) + tools/oidc_subject.py (a model of the subject match) | `automate-a-pipeline-with-no-stored-secret` |
| `data-release` | map frame: the future release.yml (model-checked, actionlint), release order, ADF from git | `automate-releasing-data-code` |
| `promotion` | map frame: deploy.yml build once, infra/06-build.sh checksums; Bicep vs Terraform | `automate-one-artefact-two-environments` |
| `storage-kinds` | object / file / block lists, what survives what, which the platform uses | `land-object-file-and-block` |
| `lake-zones` | map frame: lake.bicep (HNS, soft delete, four zone containers) + the zones made and the hierarchy file landed in Azurite | `land-the-lake-account` |
| `drop-sas` | IDE: tools/drop_sas.py — write-only SAS: write ok, read/list 403, expired 403 (emulated) | `land-who-may-write-a-file` |
| `two-deliveries` | IDE: tools/two_deliveries.py — overwrite + ETag 412, write-once 409, lease 412 (emulated) | `land-two-writers-one-file` |
| `lake-lifecycle` | IDE: lifecycle.bicep + tools/lifecycle_plan.py (a model); tiers; recovery without versions | `land-versions-soft-delete-and-lifecycle` |
| `locked-reports` | map frame: reports.bicep (WORM 2,557 d) + 07-lock-reports.sh; what a locked policy allows | `land-reports-nobody-can-change` |
| `files-and-disks` | map frame: share.bicep (Entra Kerberos), reaching the share, the runtime VMs' disks | `land-files-and-disks` |
| `storage-redundancy` | LRS / ZRS / GRS / GZRS table, a failover, what redundancy does not undo | `land-redundancy-and-restore` |
| `adf-parts` | IDE: adf/pipeline/copy_tradebook.json + tools/adf_parts.py (follows the git JSON's references) | `batch-data-factorys-parts` |
| `bank-runtime` | map frame: factory.bicep (MI, private, ir-bank); running the runtime's two VMs | `batch-a-runtime-inside-the-bank` |
| `copy-tradebook` | IDE: tools/copy_window.py runs the pipeline's own query on PostgreSQL 16 into Azurite: 10 then 2 rows | `batch-copying-tradebook` |
| `files-arrive` | map frame: tr_collateral_arrives.json + tools/route_event.py (a model of the event match) | `batch-files-that-arrive` |
| `file-contract` | IDE: tools/check_contract.py: 13 Oct agreed, 14 Oct refused | `batch-a-files-contract` |
| `reconcile-tradebook` | IDE: tools/reconcile.py (PostgreSQL vs bronze): LC-2007 deleted, still in the lake; window vs CDC | `batch-batch-cdc-and-reconciliation` |
| `rerun-window` | IDE: tools/rerun_window.py (Azurite): append 3 rows vs replace 2 | `batch-reruns-without-duplicates` |
| `pipeline-secrets` | IDE: ls_tradebook.json (Key Vault secret), adf_parts --credentials; the factory's roles | `batch-secrets-and-identities-for-pipelines` |
| `why-stream` | Wide World's 14 October intraday, batch vs stream, the two streams | `stream-why-a-stream` |
| `event-hubs` | map frame: streaming.bicep + tools/send_events.py in the Event Hubs emulator (partition keys) | `stream-event-hubs` |
| `kafka-endpoint` | IDE: feeds/market_producer.py, unchanged, to the emulator's Kafka endpoint; what the properties change | `stream-the-kafka-endpoint` |
| `stream-checkpoints` | IDE: tools/intraday_reader.py with blob checkpoints: 3 events, restart reads 1 | `stream-consumers-and-checkpoints` |
| `stream-capture` | map frame: Capture in streaming.bicep (Avro to bronze, namespace identity) | `stream-capture-to-the-lake` |
| `four-ways` | Queue Storage / Service Bus / Event Grid / Event Hubs, and each one's job here | `stream-queue-storage-service-bus-event-grid-or-event-hubs` |
| `deal-steps` | IDE: tools/deal_steps.py in the Service Bus emulator: sessions, duplicate dropped, dead letter | `stream-service-bus-for-deal-steps` |
| `stream-rules` | IDE: tools/stream_rules.py (a model): throttling, late events, duplicates | `stream-late-duplicate-and-throttled` |
| `dbx-workspace` | map frame: databricks.bicep (connector, workspace); what Azure creates; this course vs the Databricks course | `transform-the-workspace-as-an-azure-resource` |
| `dbx-network` | map frame: the NSG on the Databricks subnets + tools/dbx_capacity.py; three private paths | `transform-databricks-in-the-network` |
| `dbx-lake` | IDE: access connector and its lake role, bicep build + arm_summary; Azure role to a Unity Catalog grant | `transform-reaching-the-lake` |
| `dbx-secrets` | IDE: infra/10-secret-scope.sh (Databricks CLI), tools/secret_read.py; why a second vault | `transform-secrets-and-people` |
| `dbx-compute` | IDE: the overnight cluster policy + tools/compute_plan.py (quota, Spot) | `transform-compute-on-the-azure-bill` |
| `who-starts-the-job` | map frame: adf/pipeline/nightly.json (DatabricksJob); Data Factory vs Databricks' scheduler | `transform-who-starts-the-job` |
| `night-cost` | IDE: tools/night_cost.py (hypothetical VM + DBU prices) | `transform-what-a-night-costs` |
| `who-needs-what` | three readers' asks, which store answers which, one rule | `serve-who-needs-what` |
| `relational-choices` | Azure SQL / MI / SQL on a VM / PostgreSQL flexible server; why PostgreSQL | `serve-relational-choices` |
| `risk-mart` | map frame: mart.bicep + sql/mart.sql on local PostgreSQL 16 (headroom view); failures | `serve-the-risk-mart` |
| `two-deals-one-limit` | IDE: tools/reserve_headroom.py — READ COMMITTED overbooks, SERIALIZABLE refuses | `serve-two-deals-one-limit` |
| `retry-safely` | IDE: tools/retry_safely.py — lost reply, retry with and without an idempotency key | `serve-connections-and-credentials` |
| `group-lookup` | IDE: tools/group_lookup.py in the Cosmos emulator; RU costs (doc); hot partition model | `serve-a-lookup-by-group` |
| `cosmos-concurrency` | IDE: tools/group_update.py — ETag 412, transactional batch all-or-none; consistency levels | `serve-consistency-and-concurrency-in-cosmos-db` |
| `cache-headroom` | IDE: tools/cache_headroom.py (a model): TTL vs delete-on-write | `serve-caching-the-headroom` |
| `moving-tradebook` | map frame: infra/11-migrate-tradebook.sh, the cutover weekend, what the service does | `serve-moving-tradebook` |

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
