# Azure — from an empty tenant to a counterparty-risk data platform

**Status: re-planned on 2026-10-22 around one project, built step by step.** This plan is awaiting
the owner's review; no course is authored. Courses are authored one at a time, each reviewed by the
owner on its rendered routes before the next begins. The method is aws-ct's (and python-ct's and
apache-spark-ct's), applied to Azure. The previous 12-chapter plan is in git history; every one of its
topics is kept (map at the end).

## The idea

The course builds **one data platform — Woodgrove Bank's counterparty-risk platform — from an empty
Azure tenant to a production system that is secured, networked, automated, fed by batch and stream,
transformed, published, observed, recoverable and costed**, and every Azure idea is taught at the
moment the platform first needs it. Courses are named by **what we build**, not by service catalogue:

> *Why the cloud → how Azure runs a request → start the project → lock it down → give it a network →
> make it repeatable → land the files → bring the batches in → bring the stream in → transform it in
> Databricks → serve the results → publish to the risk team → operate it → measure, tune and evolve it.*

| Part | For | Leaves you able to |
| --- | --- | --- |
| 0 — The picture (Courses 1–2) | everyone | say what the platform is for, what the cloud changes, and what happens when Azure receives a request |
| I — Build the platform (Courses 3–6) | someone who knows files, processes and basic HTTP | stand up a secured, private, declared Azure environment for a data workload |
| II — Move the data (Courses 7–10) | someone who can deploy to Azure | land files, ingest batches and streams, and run Databricks inside the bank's boundaries |
| III — Publish it (Courses 11–12) | someone who owns a data pipeline | serve results to an API, a dashboard, alerts and a locked report |
| IV — Keep it running (Courses 13–14) | someone who owns a workload | observe, secure and recover it, then tune its cost and justify its architecture |

**Audience.** Learners new to Azure who understand files, processes and applications. IP addressing,
HTTP, DNS, identities and cloud vocabulary are introduced where needed. Reading simple Python, SQL,
shell and JSON/YAML/Bicep helps; the syntax used is explained. No finance background is assumed: the
domain uses ten words, each explained once in Course 1 (below). AWS knowledge, Spark, Kubernetes and
distributed-systems expertise are not prerequisites.

**Scope.** A general Azure course, independent of certification tracks, following one representative
data workload through its lifecycle. No Azure subscription, paid deployment, submitted exercise or
learner monitoring is required; following along is optional. **The Databricks side is out of scope**
— notebooks, Spark, Delta, Unity Catalog grants, Auto Loader and Lakeflow are taught in
`databricks-data-engineer-ct`; this course teaches everything Azure puts around them (below). Also
out of scope: advanced Kubernetes, landing-zone implementation, specialised networking, database
internals, ML/AI, IoT, media and HPC. SQL, Python, Spark, system design and Databricks have their own
courses.

**Target.** Understand how to construct and explain a representative Azure data workload, trace
requests and data across service boundaries, and justify security, reliability, performance,
delivery and cost decisions. The course never claims assessed production competence.

## The domain, in plain words

Woodgrove Bank (a Microsoft fictitious name) finances trade. When an importer buys goods from a
supplier abroad, the bank issues a **letter of credit** — a promise to pay the supplier once the
shipping documents arrive — and the importer repays the bank later. Until it does, the bank is owed
money by that company, its **counterparty**, and what could be lost is the bank's **exposure**.

Companies belong to **groups** (the **hierarchy**); if one fails, its siblings often do too, so the
bank adds exposure up to the group. Against it the bank holds **collateral** (cash, goods it could
sell), counted after a **haircut** (goods may sell for less in a hurry). Each group has a **limit**;
going over it is a **breach**. Every morning the bank files a **large exposures report**: every group
whose net exposure is above 10% of the bank's capital. Once filed it can never be changed.

Those ten words — counterparty, group/hierarchy, letter of credit (a deal), exposure, collateral,
haircut, limit, breach, large exposures report, capital — are the whole vocabulary. The arithmetic is
addition, subtraction and a percentage. No VaR, PFE, CVA or models.

**The problem the platform solves.** The data a risk analyst needs lives in five systems that do not
talk to each other — the on-premises booking system, a hierarchy file, a collateral file, a limits
extract and a market feed. Today they are joined by hand in spreadsheets: the numbers are a day late,
the hierarchy is stale, and the report is assembled on the morning it is due. The platform lands every
source in a lake inside the UK, transforms it nightly (and keeps it fresh through the day) in
Databricks, and publishes by **07:00**: an exposure API and dashboard for the risk team, breach alerts
for credit officers, and a locked report for the regulator.

| Person | What they do on the platform |
| --- | --- |
| Data engineer (`priya`) | builds and runs it — every course follows her work |
| Risk analyst (`omar`) | reads exposure by group, country and trend |
| Credit officer (`sam`) | owns limits and collateral, receives breach alerts |
| Auditor | reads locked reports and logs, changes nothing |

## The spine: `risk-on-azure`

The platform is **one real project that grows**. Every number a frame quotes comes from the fixed
facts table below; exposures are **computed** from `sources/` by `tools/exposure.py`, never typed.

| Course | The platform gains | Its map gains |
| --- | --- | --- |
| 3 `start` | a project, a session, a tagged resource group, a landing container, a cost ledger | the tenant, one subscription, one container |
| 4 `secure` | Entra groups, managed identities, role assignments, two policies, prod and dev subscriptions | groups, identities, the scopes they hold roles at |
| 5 `network` | hub and spoke, subnets, routes, NSGs, private DNS, private endpoints, ExpressRoute to the bank | the private path from on-premises to the lake |
| 6 `automate` | everything above as Bicep, and a pipeline that deploys it with no stored secret | deployments drawn around what they own |
| 7 `land` | the lake account and its zones, access paths, lifecycle, the immutable reports container | the lake |
| 8 `batch` | Data Factory, a self-hosted runtime on two VMs, the TradeBook copy and the file drops | sources → Data Factory → landing |
| 9 `stream` | Event Hubs (Kafka endpoint), Capture, a Service Bus queue for deal steps | the market feed and deal events |
| 10 `transform` | the Databricks workspace inside the spoke, its identity on the lake, its secrets and compute | the Databricks box (its insides: the Databricks course) |
| 11 `serve` | the risk mart on PostgreSQL, a Cosmos DB lookup by group, a cache | the serving stores |
| 12 `publish` | the exposure API on App Service, API Management, breach alerts, the report filer | everything the risk team touches |
| 13 `operate` | telemetry, KQL, alerts on the 07:00 objective, keys, Defender, backups, a DR plan | the controls around everything |
| 14 `evolve` | Front Door for Singapore, a cost month, rightsizing, an ADR and a review | the same map, priced and judged |

The finished project, toured in Course 3 and built from an empty folder from there on:

```
risk-on-azure/
  env.sh                       subscription, Region, and the lines that point at the emulators   (3)
  infra/                       az CLI scripts, one per step, in run order                         (3 → 5)
    01-group.sh                the first tagged resource group                                    (3)
    04-identity.sh             groups, managed identities, role assignments                       (4)
    05-network.sh              hub, spoke, subnets, routes, NSGs, private DNS                     (5)
    teardown.sh                everything above, removed in reverse                               (3 → 5)
  policies/                    role definitions and assignments, Azure Policy as JSON             (4 → 13)
  templates/                   Bicep, one module per concern, prod and dev parameter files        (6 → 14)
    network.bicep  identity.bicep  lake.bicep  ingest.bicep  stream.bicep
    databricks.bicep  serve.bicep  publish.bicep  ops.bicep
  pipeline/                    GitHub Actions: deploy with workload identity federation           (6)
  sources/                     sample TradeBook rows, hierarchy, collateral, limits, price ticks  (7 → 9)
  adf/                         pipelines, datasets, linked services, triggers (JSON)              (8)
  stream/                      the Kafka producer, the Event Hubs consumer, the deal-steps worker (9)
  databricks/                  workspace, access connector and secret-scope configuration         (10)
  serve/                       risk_mart.sql, load.sql, reserve.sql (PostgreSQL 16)               (11)
  api/                         the exposure API, Python                                          (12)
  functions/                   the breach alert                                                   (12)
  filer/                       the report filer, a container image                                (12)
  ops/                         KQL queries, alert rules, runbooks, the restore drill              (13)
  tools/                       exposure stand-in, cost ledger, CIDR plan, models                  (3 → 14)
  docs/adr/                    the serving-layer decision record                                  (14)
```

## The Azure side and the Databricks side

| This course (Azure) | `databricks-data-engineer-ct` |
| --- | --- |
| the workspace as an Azure resource; what Azure creates; the managed resource group | notebooks, Spark, Delta tables, medallion design |
| VNet injection, secure cluster connectivity, private link | Unity Catalog grants, locations, three-part names |
| the access connector's managed identity and its role on the lake | storage credentials and external locations, from the catalog side |
| Key Vault-backed secret scopes; Entra groups synced into the workspace | using secrets and groups in code |
| VM families, quotas, Spot, cluster policies, DBUs and VMs on the Azure bill | cluster sizing, tuning, Photon |
| Data Factory starting a Databricks job, against Databricks' own scheduler | Lakeflow jobs and pipelines, Auto Loader, the Kafka source |

The notebook is **one box on the map**, labelled with the Databricks course. Its output — exposure per
group per business date — is reproduced in this repo by `tools/exposure.py` (plain Python over
`sources/`, labelled "stand-in for the Databricks job"), so every number downstream is computed.

## Building the infrastructure: the CLI first, then Bicep

**Courses 3–5 build the platform imperatively, one script per step, with the real Azure CLI.** Every
change is visible as a command, which is what makes Course 2's "every action is an ARM request"
concrete. The scripts teach the habits real ones need: `--query` and `-o tsv` to capture ids, a tag on
every resource, and a `teardown.sh` that grows with them.

**Course 6 opens by re-running `05-network.sh`** — the conflict it produces is the reason templates
exist. From there everything is declared in Bicep, and every later course adds a module rather than a
script. The CLI stays for what it is for: reading state, the data plane (`az storage blob upload`,
sending an event) and investigating.

**Why not the portal.** A click leaves nothing that can be replayed or checked. One concept frame in
Course 2 shows that the portal, the CLI and the SDKs are clients of the same Resource Manager API.

## Three kinds of frame, plus one

Every section is **one full-screen frame and one narration** (90–180 s), no slide.

1. **Map frame** (`map`) — the platform's architecture diagram, ONE fixed layout that grows through the
   course. A part not built yet trades its Azure icon for a grey outline; what this section adds is
   marked, the rest dimmed; an alternative is drawn beside the map, never inside it.
2. **Map + terminal frame** (`map+term`) — the map on the left, the script being run over its output on
   the right.
3. **IDE frame** (`ide`) — the python-ct / Spark template (explorer | editor over terminal | side pane)
   where the point is a FILE: a policy, a Bicep module, a pipeline, a consumer, the API, a query.
4. **Concept frame** (`concept`) — where there is no command at all: a zone failing, a token's path, a
   responsibility split, recovery strategies on a cost/recovery axis.

## How a section teaches

- **Objective → mental model → worked example → misconception or contrast → bridge.** One step per
  section: a section makes one change to the platform and shows its effect.
- **Code is executed, not pasted.** The project lives in this repo as snapshots, one per section that
  changes it (`spine/<course>/<step>/`: `project/`, `session.txt`, `step.json`). Scenes import the
  files with `?raw`, and `npm run check:spine` replays every step in a fresh copy against fresh
  emulators and fails on any difference.
- **Failure is taught, not hidden.** The Contributor who cannot read a blob, the file delivered twice,
  the consumer that restarts, the two reservations that would breach a limit, the late report.
- **Access, logs, cost and failure boundaries arrive with the first operation that has them**, and
  are deepened later. Variants are labelled before behaviour is claimed (Azure SQL Database vs
  Managed Instance vs SQL Server on a VM; PostgreSQL Flexible Server HA modes; Cosmos DB API and
  consistency level; Functions hosting plan; Queue Storage vs Service Bus vs Event Grid vs Event Hubs).
- **The Well-Architected pillars are recurring questions**, asked of decisions, not a checklist.
- **Narration explains; the frame shows.** It never reads a command aloud character by character, and
  spells acronyms for the speech engine.

## What the emulators are, and what they cannot show

There is no Azure subscription behind this course. Terminals run **real clients against local
emulators**, all of Microsoft's own where one exists, and every such pane is labelled **emulated**:

| emulator | stands in for | used from |
| --- | --- | --- |
| Azurite | Blob, Queue and Table storage | Course 3 |
| Event Hubs emulator | Event Hubs, AMQP and (to verify) the Kafka endpoint | Course 9 |
| Service Bus emulator | Service Bus queues, sessions, dead letters | Course 9 |
| Cosmos DB emulator (Linux, vNext) | Cosmos DB for NoSQL | Course 11 |
| PostgreSQL 16 (real, local) | TradeBook on-premises and Azure Database for PostgreSQL | Courses 8, 11 |
| Kusto emulator | KQL against Log Analytics-shaped tables | Course 13 |

**The control plane has no emulator.** Azure has no equivalent of moto: creating a VNet, assigning a
role or deploying a template cannot produce real output here. Control-plane claims are therefore
**model-checked**, never shown as captured output: Bicep is compiled and linted by the real Bicep CLI,
which type-checks every resource and property against Azure's published API definitions; every `az`
command and parameter is checked against the CLI's own command table; Data Factory JSON is validated
against its SDK models. A response card shows **invented but shape-checked** values.

| claim | how it is shown |
| --- | --- |
| the API's and the tools' own behaviour | runs locally, really (`runs locally`) |
| blobs, SAS, ETags, leases; events, partitions, checkpoints; locks, dead letters; RU charges, 429s | the emulator (`emulated`) |
| SQL results | PostgreSQL 16, labelled "PostgreSQL, not Azure Database for PostgreSQL" |
| KQL results | the Kusto emulator, labelled "not Log Analytics" |
| Bicep, `az` commands, ADF pipelines, policy JSON | the Bicep CLI, the CLI command table, the SDK models (`model-checked`) |
| RBAC and Policy outcomes, private link, failover, Front Door | a labelled model in `tools/`, or Microsoft documentation cited in the scene (`doc-cited`) |
| the Databricks job's output | `tools/exposure.py`, labelled "stand-in for the Databricks job" |

Gaps known now, each to be said on the frame that meets it: Azurite has no hierarchical-namespace
(`dfs`) endpoint, so ADLS ACLs are doc-cited; the Cosmos DB vNext emulator is a preview with a
narrower feature set (each feature used is checked against it); Data Factory has no emulator, so the
incremental-copy logic runs locally in Python and the pipeline JSON is model-checked.

**Replay normalisations**, stated once and applied everywhere: an emulator's endpoint becomes the real
service endpoint the same call has on Azure (`127.0.0.1:10000/devstoreaccount1` →
`https://stwgriskprod.blob.core.windows.net`), except on a line that sets it; random request ids and
GUIDs become stable ones from the facts table; the clock is frozen at the step's time. A SAS token or
key is always printed with its signature redacted. Nothing else in an output is edited.

## The courses — 14 courses, 111 sections

### Part 0 — The picture

**1. `why-cloud` · Why the cloud · 6 sections**
1. The risk question — counterparty, group, deal, exposure, collateral, haircut and limit, on one worked example · concept
2. One team, five sources, one spreadsheet — the risk analyst joining by hand, and the morning the report is late · concept
3. Renting instead of owning — an overnight burst of compute, and paying only for the hours it runs · concept
4. Managed services — IaaS, PaaS and SaaS, from the integration VM to Data Factory to Power BI · concept
5. Shared responsibility — what Microsoft runs and what the bank still owns, across VMs, PostgreSQL, Databricks and Storage · concept
6. What we will build — the finished platform on one map, and the course as its route · map

**2. `how-azure-runs` · How Azure runs a request · 6 sections**
1. Regions and availability zones — UK South's three zones, UK West's none, and which failure each boundary contains · concept
2. Tenant, management groups, subscriptions and resource groups — who owns, pays for and governs the platform · concept
3. Every action is an ARM request — the portal, the CLI and the SDKs as clients of Resource Manager and its providers · concept
4. Anatomy of a request — token, resource ID, API version and the data-plane endpoint in one call · map+term
5. Resource IDs and naming — one storage account named across subscription, group and provider · concept
6. What keeps charging — per hour, per GB, per unit, and what bills when nothing runs · concept

### Part I — Build the platform

**3. `start` · Start the project · 6 sections**
1. The finished project, toured — every folder in risk-on-azure, and what it is for · ide
2. The tenant and its break-glass accounts — Global Administrator, MFA, and why nobody works as one · concept
3. A first session — az login, the token it caches, and az account show · map+term
4. The emulators beside Azure — Azurite, Event Hubs, Service Bus, Cosmos DB and PostgreSQL, and what none of them can show · ide
5. The first resources — a tagged resource group, a storage account declared, a landing container created · map+term
6. Budgets, tags and cleanup — the cost ledger, a budget that is not a cap, and what deleting a resource group leaves behind · ide

**4. `secure` · Lock it down · 8 sections**
1. People and sign-in — Entra users and groups, MFA, Conditional Access, and the four roles that touch risk data · map
2. Applications and tokens — app registrations, service principals, and what a token claims · ide
3. Managed identities — system- and user-assigned, for Data Factory, the access connector and the API, and how each one ends · map
4. Role-based access — role definitions, assignments, scopes and inheritance for the platform's groups · ide
5. Control plane and data plane — a Contributor who cannot read a blob, and a Storage Blob Data Reader who can · ide
6. Azure Policy — UK regions only, no public storage access, and what compliance does not prove · ide
7. Management groups and environments — platform, prod and dev subscriptions, and what a subscription isolates · map
8. Privileged access and audit — PIM, access reviews, landing-zone boundaries, and who owns the audit trail · concept

**5. `network` · Give it a network · 9 sections**
1. Addresses, CIDR and ports — the hub, the prod and dev spokes, and the bank's on-premises range · ide
2. A spoke for the platform — subnets for Databricks, private endpoints, the app and the integration runtime · map+term
3. Routes and outbound access — system routes, a user-defined route to the hub, NAT gateway, and default outbound access going away · map+term
4. Network security groups — stateful rules, their scope, and what Databricks' delegated subnets need · map+term
5. Names inside and outside — public DNS, private DNS zones, and how a privatelink name resolves · map+term
6. TLS along the path — certificates, where encryption ends, and why a private path is not an encrypted one · map
7. Private endpoints and service endpoints — storage, Key Vault, Event Hubs and PostgreSQL off the internet · map+term
8. Load Balancer, Application Gateway or Front Door — choosing the front of the exposure dashboard · concept
9. Reaching the bank — peering, hub and spoke, VPN and ExpressRoute to TradeBook on-premises · map

**6. `automate` · Make it repeatable · 8 sections**
1. When the scripts stop scaling — the network script run twice, and the conflict it produces · map+term
2. Bicep and ARM — declarative resources, API versions and what a deployment owns · ide
3. Modules, references and scopes — the spoke, the lake and Key Vault as modules, deployed to a group and a subscription · ide
4. Parameters, outputs and secrets — prod and dev parameter files, and a Key Vault reference instead of a password · ide
5. What-if, drift and replacement — what a change will do before it does it, and the properties that recreate a resource · ide
6. A pipeline with no stored secret — GitHub Actions, workload identity federation and a deployment identity · ide
7. Releasing data code — Data Factory from its git branch, a Databricks bundle, and the order they must land in · map
8. One artefact, two environments — promotion from dev to prod, provenance, and where Terraform fits · map

### Part II — Move the data

**7. `land` · Land the files · 8 sections**
1. Object, file and block — what each interface is, and what survives what · concept
2. The lake account — a storage account with a hierarchical namespace, and landing, bronze, silver and gold · map+term
3. Who may write a file — managed identities, RBAC, ACLs, a user-delegation SAS for a source drop, and account keys switched off · ide
4. Two writers, one file — ETags, conditional writes and leases when a file is delivered twice · ide
5. Versions, soft delete and lifecycle — access tiers, lifecycle rules, and recovering an overwritten file · ide
6. Reports nobody can change — immutable, time-based retention for the large exposures report · map
7. Files and disks — Azure Files for the collateral team's share, and managed disks on the integration VMs · map
8. Redundancy and restore — LRS, ZRS and GRS, account failover, and what redundancy does not restore · concept

**8. `batch` · Bring the batches in · 8 sections**
1. Data Factory's parts — pipelines, activities, datasets, linked services and triggers · ide
2. A runtime inside the bank — the self-hosted integration runtime on two VMs: images, disks, patching and access · map
3. Copying TradeBook — an incremental copy by watermark, run locally against PostgreSQL 16 · ide
4. Files that arrive — the hierarchy and collateral drops, and a storage-event trigger through Event Grid · map+term
5. A file's contract — columns, types, and the hierarchy file that changed shape · ide
6. Batch, CDC and reconciliation — counting rows and summing amounts against TradeBook · ide
7. Reruns without duplicates — idempotent loads, a pipeline that fails halfway, and running it again · ide
8. Secrets and identities for pipelines — linked services through Key Vault, and Data Factory's managed identity · ide

**9. `stream` · Bring the stream in · 8 sections**
1. Why a stream — prices and deal events that cannot wait for the night · concept
2. Event Hubs — namespaces, hubs, partitions and partition keys for fx-rates and deal-events · map+term
3. The Kafka endpoint — the bank's existing producer, moved by changing its configuration · ide
4. Consumers and checkpoints — consumer groups, offsets in storage, and a reader that restarts · ide
5. Capture to the lake — every event in bronze, with no consumer to run · map
6. Queue Storage, Service Bus, Event Grid or Event Hubs — four ways to move a message, and which job each fits · concept
7. Service Bus for deal steps — sessions per deal, locks, settlement, dead letters and duplicate detection · ide
8. Late, duplicate and throttled — ordering scope, late events, throughput units and backpressure · ide

**10. `transform` · Transform it in Databricks · 7 sections**
1. The workspace as an Azure resource — what Azure creates, the managed resource group, and what the Databricks course covers · map
2. Databricks in the network — VNet injection, secure cluster connectivity and private link · map+term
3. Reaching the lake — the access connector's identity, its role on the lake, and what Unity Catalog does with it · ide
4. Secrets and people — a Key Vault-backed secret scope, and Entra groups synced into the workspace · ide
5. Compute on the Azure bill — VM families, quotas, Spot and cluster policies · ide
6. Who starts the job — Data Factory calling a Databricks job, against Databricks' own scheduler · map
7. What a night costs — DBUs and VMs for the overnight run, from the hypothetical rate card · ide

### Part III — Publish it

**11. `serve` · Serve the results · 9 sections**
1. Who needs what — the API, the analysts' reports and the regulator's file, and what each asks of a store · concept
2. Relational choices — Azure SQL Database, SQL Managed Instance, SQL Server on a VM and PostgreSQL Flexible Server · concept
3. The risk mart — PostgreSQL Flexible Server, its tier, zone-redundant HA, backups and point-in-time restore · map+term
4. Two deals, one limit — two reservations against Wide World's headroom at once, and the transaction that refuses the second · ide
5. Connections and credentials — pools, Entra authentication, and retrying only what is safe to retry · ide
6. A lookup by group — Cosmos DB, the partition key /groupId, request units, and one giant group as a hot partition · ide
7. Consistency and concurrency in Cosmos DB — consistency levels, ETags and a transactional batch · ide
8. Caching the headroom — a cache in front of the mart, invalidation, and how stale is too stale · ide
9. Moving TradeBook — migrating the on-premises database, cutover, and what the migration service does and does not do · map

**12. `publish` · Publish to the risk team · 9 sections**
1. The exposure API — the app run locally against the mart, its routes and its health check · ide
2. App Service — plans, runtimes, deployment, startup and app settings · map+term
3. Settings without secrets — managed identity and Key Vault references in the app · ide
4. Logs, scale and slots — health checks, scale up and out, and a slot swap for a new release · map
5. Other ways to run it — a VM, a scale set, Container Apps, AKS and Functions for the same API · concept
6. One door for other teams — API Management, a contract, authentication and throttling · map+term
7. Breach alerts — an Event Grid event, a Function, its hosting plan, and the credit officer's message · ide
8. The breach workflow — Logic Apps or Durable Functions, escalation and compensation · ide
9. The morning report and the analysts — the filer as a Container Apps job from ACR, and Power BI, Fabric, Synapse or Databricks SQL · map

### Part IV — Keep it running

**13. `operate` · Operate it · 10 sections**
1. Metrics, logs and traces — one late night seen three ways, correlation and retention · map
2. Azure Monitor and KQL — Log Analytics, Application Insights and a first query, run in the Kusto emulator · ide
3. Diagnostic settings and the Activity Log — what is collected, where it goes, and who changed a firewall rule · ide
4. The 07:00 objective — a deadline as a service objective, alerts, action groups, runbooks and owners · ide
5. Keys and rotation — Key Vault, customer-managed keys, and a secret rotated under a running pipeline · ide
6. Defender, Sentinel and WAF — what each detects or blocks, and what none of them fix · map
7. An incident — a leaked SAS token: detect, contain, rotate, and who patches what · ide
8. Backups that restore — Azure Backup, service-native backups, an isolated copy, and a restore drill · ide
9. Recovery objectives — RTO, RPO, dependency order, and failing over from UK South to UK West · concept
10. Quotas and throttling — limits, 429s from Cosmos DB, retries with jitter, and testing resilience · ide

**14. `evolve` · Measure, tune and evolve it · 9 sections**
1. Measure before tuning — the overnight run's stages, distributions and the real bottleneck · ide
2. Front Door and caching — the Singapore office, cache keys, and why past reports cache and today's exposure never does · map
3. Who pays for what — cost allocation by tag, budgets and billing scope · ide
4. Rightsizing and commitments — idle capacity, reservations, savings plans and Spot for the night · ide
5. Sustainability trade-offs — less compute, less data kept, and proxies rather than carbon numbers · ide
6. Four ways to run one API — VM, PaaS, containers and serverless compared under stated assumptions · concept
7. Requirements and a decision record — an ADR for the serving layer, musts and wants · ide
8. Migration, cutover and regions — moving the overnight run, a second region, and their rollback boundaries · map
9. A Well-Architected review — evidence per pillar, and a prioritised list · ide

Frame split as planned: 52 `ide`, 22 `concept`, 21 `map`, 16 `map+term` — confirmed when Course 1 is
drawn.

## The fixed example (frozen: frames quote these numbers)

Extend this table — never change a value a frame already quotes. Values marked *(set in N)* are fixed
when that course is authored.

| fact | value |
| --- | --- |
| bank | Woodgrove Bank (Microsoft fictitious name); capital **USD 80.0m** → large-exposures threshold 10% = **USD 8.0m** |
| tenant | `woodgrovebank.example`; tenant and subscription GUIDs are Microsoft-documentation-style placeholders (`aaaabbbb-0000-cccc-1111-dddd2222eeee`) |
| subscriptions | `risk-prod`, `risk-dev`, `platform-connectivity` (hub) under management groups `woodgrove` → `platform` / `landing-zones` |
| Regions | `uksouth` (three availability zones), paired with `ukwest` (none) — data must stay in the UK |
| people | `priya` (data engineer, group Risk Data Engineers), `omar` (Risk Analysts), `sam` (Credit Officers), Risk Auditors |
| groups and limits | Wide World Group 10.0, Fabrikam Holdings, Contoso Shipping, Tailspin Traders, Northwind Group *(limits and companies set in 1)*; USD m |
| worked example | Wide World Importers (UK), in Wide World Group (limit 10.0): open deals 7.5 + new letter of credit LC-2041 2.0; collateral cash 0.5 (haircut 0%) + warehouse goods 1.0 (haircut 40% → 0.6); net exposure 9.5 − 1.1 = **8.4** — within the limit, above the 8.0 threshold, so on the report |
| the race | LC-2041 2.0 and BG-2042 1.8 reserved against Wide World at the same moment: each sees headroom 3.6 and passes; together net 10.2 > 10.0. With the transaction the second is refused (headroom 1.6) |
| sources | TradeBook (on-premises PostgreSQL, `tradebook.dc.woodgrovebank.example`, 10.50.0.0/16); hierarchy file 18:00; limits extract 18:30; collateral file 19:00; Kafka topics `fx-rates` and `deal-events` *(rates set in 9)* — London time |
| the night | business date 2026-10-13; Data Factory 22:30 → Databricks job → risk mart load → report filed; **deadline 07:00** |
| lake | storage account `stwgriskprod` (hierarchical namespace), containers `landing`, `bronze`, `silver`, `gold`, `reports` (immutable) |
| network | hub `vnet-hub-uks`, prod spoke `vnet-risk-prod-uks`, dev spoke, on-premises 10.50.0.0/16 over ExpressRoute *(CIDRs set in 5)* |
| names | resource names follow `<type>-wg-<role>-<env>` (`kv-wg-risk-prod`, `evh-wg-risk-prod`, `dbw-wg-risk-prod`, `psql-wg-riskmart-prod`, `app-wg-exposure-prod`) *(each set where it is created)* |
| rate card | **hypothetical**, USD, always labelled so on screen *(set in 2)* |

## Decisions (resolved with the owner, 2026-10-22)

1. **One project, a data platform.** Counterparty risk for trade finance, kept to ten plain words;
   data arrives by batch (Data Factory) and stream (Event Hubs, Kafka endpoint), is transformed in
   Databricks, and is published to the risk team.
2. **Azure side only.** Databricks' insides belong to `databricks-data-engineer-ct`.
3. **14 courses.**
4. **PostgreSQL** is the relational engine: TradeBook on-premises and the risk mart, both real
   PostgreSQL 16 locally.
5. **Emulators, as aws-ct did with moto** — no Azure subscription; the control plane is model-checked.
6. **Reset.** The previous 12-chapter, 90-section, slide-based course (and its narration) is deleted,
   kept in git history.

## Open for the owner

1. **111 sections**, up from 90: Course 1 gains the domain (§1), `start` the project and emulators,
   `transform` is new (the Azure side of Databricks), and the old App Service, Compute and Integration
   chapters are spread over `publish`, `batch` and `stream`.
2. **The Kafka endpoint on the Event Hubs emulator** is unverified; if it is absent, a local Kafka
   broker stands in for `stream` §3, labelled.
3. **Power BI / Fabric depth.** One section (`publish` §9) chooses between them; building a report is
   out of scope.

## Old chapter → new course

| Previous chapter | Now |
| --- | --- |
| 1 Foundations (6) | `why-cloud` 3–5, `how-azure-runs` 1–6, `start` 2–3, 6 |
| 2 Identity, Access, and Governance (8) | `secure` 1–8 |
| 3 A First Managed Application (6) | `publish` 1–4 |
| 4 Networking and Request Delivery (9) | `network` 1–9 |
| 5 Compute Alternatives and Elastic Capacity (7) | `batch` 2 (VMs), `publish` 4–5, 9 (scale sets, ACR, Container Apps, AKS, autoscaling), `evolve` 6 |
| 6 Storage and Data Protection (7) | `land` 1–8 |
| 7 Databases and Application State (8) | `serve` 1–9 |
| 8 APIs, Functions, and Asynchronous Workflows (9) | `publish` 6–8 (APIM, Functions, Logic Apps / Durable), `stream` 6–8 (Queue vs Service Bus, Event Hubs, retries), `batch` 4, 7 (Event Grid, idempotency) |
| 9 Data Integration and Analytical Workloads (6) | `why-cloud` 2, `land` 2–3, `batch` 1, 3, 6, `stream` 1, 8, `transform` 1, `publish` 9 |
| 10 Infrastructure and Software Delivery (7) | `automate` 2–8, `publish` 4 (slots) |
| 11 Observability, Security, and Recovery (10) | `operate` 1–10 |
| 12 Optimisation and Architecture Evolution (7) | `evolve` 1–9 |

New with the spine: `why-cloud` 1, 6, `start` 1, 4, 5, `automate` 1, 7, `transform` 2–7 — the domain,
the project, the emulators, and the Azure side of Databricks.

## Sources and scope

The previous plan's sources still govern coverage (official Microsoft documentation inspected on
2026-10-12): [resource organisation](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources),
[control and data planes](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane),
[RBAC](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview),
[managed identities](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview),
[Azure Policy](https://learn.microsoft.com/en-us/azure/governance/policy/overview),
[compute selection](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree),
[App Service](https://learn.microsoft.com/en-us/azure/app-service/overview),
[private endpoints](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview),
[storage redundancy](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy),
[Blob concurrency](https://learn.microsoft.com/en-us/azure/storage/blobs/concurrency-manage),
[ADLS access control](https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-access-control-model),
[Cosmos DB consistency](https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels),
[messaging choices](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/messaging),
[Functions hosting](https://learn.microsoft.com/en-us/azure/azure-functions/functions-scale),
[Service Bus settlement](https://learn.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement),
[Fabric](https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview),
[Bicep](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview),
[what-if](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-what-if),
[Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/overview),
[Backup](https://learn.microsoft.com/en-us/azure/backup/backup-overview),
[business continuity](https://learn.microsoft.com/en-us/azure/reliability/concept-business-continuity-high-availability-disaster-recovery),
[Cost Management](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/overview-cost-management)
and the [Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/).
To be added when the courses that need them are authored: Data Factory (self-hosted integration
runtime, incremental copy, storage-event triggers), Event Hubs (Kafka endpoint, Capture), Azure
Databricks (VNet injection, access connector, secret scopes), and the emulators' own documentation.

Book comparison (coverage checks only): Lars Klint's *Microsoft Azure in Action* (2025) and Iain
Foulds's *Learn Azure in a Month of Lunches*, 2nd ed. (2020). Current primary documentation governs
every technical claim; Regions, SKUs, runtimes, API versions, retirements, quotas and prices are
re-checked when the section that quotes them is authored.

This document plans teaching material; it does not contain the completed lessons or executed
deployments.
