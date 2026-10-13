# Azure — From Cloud Foundations to Advanced Application and Operations

## Audience and prerequisites

For learners new to Azure who understand basic files, processes, and applications. Introduce HTTP, IP addressing, DNS, identities, and cloud vocabulary locally. Simple Python, SQL, and JSON/YAML reading is helpful; explain the syntax used in examples. AWS knowledge, advanced networking, and Kubernetes experience are not prerequisites.

Scope: the lifecycle of a representative Azure application, from resource ownership and safe access through hosting, data, integration, delivery, operations, and architectural evolution. This course is independent of certification tracks. Use annotated commands, policies, code, queries, templates, diagrams, calculations, and failure traces. No paid account, submitted exercises, or monitored assessments are required; following examples is optional.

Reference surface: official Microsoft documentation researched on **2026-10-12**. Azure has no single platform version. Identify Region, SKU, runtime, API version, and feature eligibility for concrete examples. Verify current availability, retirement notices, quotas, and prices when lessons are authored. Core teaching does not depend on previews.

Target: understand how to construct and explain representative Azure workloads, trace their requests and data, and justify implementation and operational choices. Completion does not establish assessed production competence.

Structure: **12 chapters**, with **6, 8, 6, 9, 7, 7, 8, 9, 6, 7, 10, and 7 sections**. Counts follow conceptual weight rather than quotas or equal teaching duration.

## Learning spine

Understand resource ownership → establish identities and governance → follow a small managed application → explain network paths and compute alternatives → persist data → connect background workflows → derive analytical views → reproduce delivery → operate and recover → justify the evolved architecture.

Recurring example: an online retail application serves products, accepts orders, stores transactions, triggers fulfilment, and produces business summaries. Begin with an App Service request-to-response path. Compare VM, container, and event-driven alternatives as requirements evolve; do not accumulate every service into one architecture.

Teaching method: objective → mental model → annotated example and expected behaviour → alternative or failure contrast → explanation summary → bridge. Introduce permissions, logs, costs, and failure boundaries with the first workload, then deepen them. Distinguish resource management from data access early. Use Azure Well-Architected questions throughout the course.

## Chapter 1 — Azure Foundations and Resource Ownership

Objective: Explain the Azure operating model and locate resources within organisational, deployment, billing, and failure boundaries.

1. Cloud services, shared responsibility, and IaaS/PaaS/SaaS operating models
2. Regions, Availability Zones, service availability, and failure boundaries
3. Entra tenants, subscriptions, resource groups, and their distinct responsibilities
4. Azure Resource Manager, resource providers, and management operations
5. Portal, Azure CLI, Cloud Shell, resource IDs, and an annotated first request
6. Billing awareness, tags, budgets, resource lifecycle, and cleanup

Worked illustrations: A tenant/subscription/resource-group tree; a product-page request diagram; an annotated CLI call and resource ID; a hypothetical resource-cost ledger. Explain why a resource group is not a network boundary, a budget alert is not a universal spending cap, and deleting an application does not necessarily remove all its dependencies or charges.

Outcome: Locate a workload's resources, explain who manages and pays for them, and interpret a basic management request and lifecycle.

Bridge: Resource ownership needs explicit access rules; next we establish identities, permissions, and governance.

## Chapter 2 — Identity, Access, and Governance

Objective: Explain how people and applications obtain access and how governance constrains resource configuration.

1. Microsoft Entra identities, authentication, federation, and MFA
2. Application registrations, service principals, tokens, and application access
3. System-assigned and user-assigned managed identities and their lifecycles
4. Azure RBAC role definitions, assignments, scopes, and inheritance
5. Control-plane versus data-plane permissions and service-specific authorisation
6. Azure Policy definitions, assignments, effects, compliance, and remediation
7. Management groups, subscription organisation, and environment isolation
8. Privileged access, access reviews, audit ownership, and landing-zone boundaries

Worked illustrations: A scoped role matrix; an application obtaining a token through managed identity; a blob read denied despite resource-management access; an RBAC-versus-Policy comparison; an inherited policy assignment. Explain that a managed identity still needs suitable permissions and that Policy compliance does not prove application security. Label licensing and service eligibility for privileged-access examples.

Outcome: Interpret an identity-to-resource access path, distinguish authentication from authorisation and governance, and explain a denied operation using its scope and data-plane assumptions.

Bridge: With ownership and access established, next we follow a small application on managed hosting.

## Chapter 3 — A First Managed Application

Objective: Explain a concrete web application lifecycle before exploring more infrastructure choices.

1. HTTP requests, application processes, configuration, and dependency calls
2. App Service apps, plans, shared capacity, and runtime choices
3. Application deployment, startup, environment configuration, and release artefacts
4. Managed identity, Key Vault references, and application-secret boundaries
5. Logs, health checks, scale-up/scale-out, and capacity introduction
6. Deployment slots, traffic transitions, and managed-hosting responsibilities

Worked illustrations: An annotated Python endpoint and response; a deployment/configuration sketch; startup logs; a failed dependency call; a staging-slot comparison. Use standard App Service hosting as the core example. State SKU eligibility for slots and scaling rather than implying every tier supports them. Introduce identity-based dependency access without requiring the learner to understand private networking yet.

Outcome: Explain where application code runs, how configuration and identity reach it, and what evidence distinguishes a deployment problem from a dependency failure.

Bridge: A working endpoint does not explain its network path; next we trace incoming requests and outgoing connections.

## Chapter 4 — Networking and Request Delivery

Objective: Trace application traffic and distinguish reachability, filtering, name resolution, and access control.

1. IP addresses, CIDR ranges, ports, protocols, and subnet foundations
2. Virtual networks, subnets, interfaces, and address planning
3. System/user-defined routes, outbound connectivity, and NAT choices
4. Network security groups, stateful filtering, and rule scope
5. Public/private DNS, resolution paths, and custom-name dependencies
6. TLS, certificates, termination, and encryption across hops
7. Load Balancer, Application Gateway, and Front Door selection
8. Private endpoints, service endpoints, and App Service VNet integration
9. Peering, hub-spoke, VPN, ExpressRoute, and hybrid-network boundaries

Worked illustrations: Browser → DNS → Front Door or gateway → application → private database diagrams; a CIDR calculation; annotated routes and NSG rules; a private-endpoint DNS failure. Distinguish App Service outbound VNet integration from inbound private access. Explain why a private endpoint does not itself disable a service's public endpoint or grant permission to its data. Avoid relying on implicit/default outbound connectivity.

Outcome: Trace a request and return path, compare delivery options, and identify whether an observed failure concerns DNS, routing, filtering, TLS, or authorisation.

Bridge: The request path is clear; next we compare alternative execution environments and their capacity responsibilities.

## Chapter 5 — Compute Alternatives and Elastic Capacity

Objective: Select compute from workload requirements and explain scaling, replacement, and operational responsibility.

1. Compute decisions: control, workload shape, latency, portability, and operations
2. Virtual machines, images, disks, lifecycle, managed access, and patching
3. VM Scale Sets, health replacement, zones, and capacity allocation
4. Container images, Azure Container Registry, and supply-chain boundaries
5. Azure Container Apps, revisions, ingress, jobs, and scaling choices
6. AKS and Kubernetes: orchestration needs and operational complexity
7. Autoscaling signals, statelessness, graceful shutdown, and capacity delays

Worked illustrations: A VM configuration and container-image/deployment sketch; a traffic-to-capacity timeline; a replacement instance losing local session state; alternative hosting for the same order API. Compare App Service, VMs, and Container Apps before introducing AKS as a justified choice. Distinguish infrastructure availability from application correctness and account for quotas and interruptions in capacity reasoning.

Outcome: Justify a provisional compute model, interpret its deployment artefacts, and explain how scaling and replacement affect the application and its dependencies.

Bridge: Replaceable execution needs deliberate persistence; next we examine storage interfaces and data-protection choices.

## Chapter 6 — Storage and Data Protection

Objective: Choose storage and access controls while separating persistence, redundancy, retention, and recovery.

1. Object, file, and block storage: interfaces and persistence boundaries
2. Storage accounts, Blob containers, object operations, and access paths
3. Managed identities, RBAC, SAS, account keys, and least-privilege access
4. Blob consistency, ETags, conditional operations, leases, and concurrent writers
5. Access tiers, lifecycle, versioning, soft delete, and immutable retention
6. Azure Files and managed disks: sharing, attachment, and workload choices
7. LRS/ZRS/GRS variants, replication, failover, backups, and restore boundaries

Worked illustrations: An annotated upload and scoped SAS; conflicting writes with an ETag precondition; a blob deletion/version timeline; a disk lifecycle; a redundancy-choice diagram. Explain strong consistency without implying multi-object transactions. Specify storage-account type and feature compatibility. Separate protection from hardware failure from recovery after deletion, corruption, or compromise; asynchronous geo-replication does not imply zero data loss.

Outcome: Explain a storage operation and permission path, justify a storage/protection choice, and identify the assumptions needed to claim recoverability.

Bridge: Storage preserves objects and files; next we organise transactional and queryable application state.

## Chapter 7 — Databases and Application State

Objective: Match access patterns and correctness requirements to database and caching choices.

1. Data models, access patterns, transactions, latency, growth, and ownership
2. Azure SQL Database, SQL Managed Instance, and SQL Server on VMs
3. Azure Database for PostgreSQL and managed relational-service selection
4. Transactions, connection pools, authentication, and application retry boundaries
5. Availability, read replicas, backups, restore, and deployment-specific behaviour
6. Cosmos DB APIs, partition keys, indexing, throughput, and hot partitions
7. Cosmos DB consistency, concurrency, transactions, and multi-region trade-offs
8. Caching, invalidation, and database migration/cutover choices

Worked illustrations: SQL for an order transaction and expected rows; a connection-exhaustion trace; a replica-lag case; Cosmos DB partition sketches and contrasting read sequences; a stale-cache timeline. Use Cosmos DB for NoSQL as the concrete core API and label transaction/consistency scope. Compare Azure Managed Redis for current caching choices and treat Azure Cache for Redis as a retirement/migration context requiring current verification, rather than a default new deployment.

Outcome: Explain an application data-access sequence, compare database models, and distinguish transaction correctness, read scaling, availability, cache freshness, and recovery.

Bridge: Durable state supports processes across service boundaries; next we connect APIs, functions, messages, and events.

## Chapter 8 — APIs, Functions, and Asynchronous Workflows

Objective: Explain synchronous and asynchronous execution, including acknowledgement, retries, and duplicate effects.

1. API Management, contracts, authentication, policies, and throttling
2. Functions triggers, bindings, handlers, and execution boundaries
3. Functions hosting plans, scaling, concurrency, networking, and identity
4. Queue Storage versus Service Bus: workload and capability differences
5. Service Bus locks, settlement, sessions, dead letters, and duplicate detection
6. Event Grid event distribution, subscriptions, and delivery handling
7. Event Hubs partitions, ordering scope, consumer groups, and checkpoints
8. Logic Apps and Durable Functions: orchestration and compensation choices
9. Retries, idempotency, replay, poison messages, and backpressure

Worked illustrations: An annotated Python handler; an API-to-queue diagram; a lock expiring after a successful database update; duplicate fulfilment; a lagging stream consumer; an orchestration failure timeline. Make the Functions hosting plan and binding-specific retry owner explicit; evaluate Flex Consumption for a new serverless example where eligible. Explain why duplicate detection, ordered sessions, or checkpoints alone cannot establish exactly-once business effects. Durable orchestrator examples need replay-safe code and explicit activity-side effects.

Outcome: Interpret a workflow's delivery and retry paths, compare messaging services, and explain where durable state, idempotency, and recovery handling belong.

Bridge: Operational changes also feed analytical consumers; next we follow them into queryable historical data.

## Chapter 9 — Data Integration and Analytical Workloads

Objective: Explain a bounded analytical pipeline and distinguish the products that can implement it.

1. Operational versus analytical requirements: history, freshness, and query shape
2. Batch ingestion, CDC, transfer, reconciliation, and source contracts
3. ADLS Gen2 layout, formats, partitioning, RBAC, and ACL boundaries
4. Data Factory pipelines, orchestration, catalog, and governance responsibilities
5. Synapse, Azure Databricks, and Microsoft Fabric selection and product boundaries
6. Streaming analytics, late data, duplicates, and freshness/cost trade-offs

Worked illustrations: Order changes → ADLS Gen2 → transformation → SQL summary diagram; a pipeline configuration sketch; before/after analytical rows; partition-pruning and late-event contrasts. Use Azure Data Factory as the concrete pipeline illustration and compare Fabric Data Factory separately. Explain Azure resource/subscription controls versus Fabric tenant/workspace/capacity and OneLake concepts. Treat Azure Databricks as a companion specialist subject. Explain RBAC/ACL evaluation under the selected authentication method rather than assuming every request requires both grants.

Outcome: Trace records into an analytical result, compare product choices, and identify data quality, freshness, layout, identity, and billing assumptions.

Bridge: The application and data paths are understandable; next we reproduce and change their infrastructure and software safely.

## Chapter 10 — Infrastructure and Software Delivery

Objective: Explain infrastructure deployment and application release as reviewable changes with explicit state boundaries.

1. ARM and Bicep: declarative resources, ownership, and API versions
2. Resources, modules, references, dependencies, and deployment scopes
3. Parameters, outputs, configuration, and secret-reference handling
4. What-if, drift, replacement/deletion implications, and preview limitations
5. CI/CD artefacts, deployment identities, and workload identity federation
6. Slots, canaries, rollback, schema compatibility, and stateful changes
7. Environment promotion, provenance, and Terraform selection boundaries

Worked illustrations: Annotated Bicep for a small workload; a what-if change preview; a failed release; a slot traffic transition; separate development/production deployment identities. Explain why what-if cannot guarantee deployment success or capture every runtime consequence, and why application rollback does not necessarily undo database changes. Distinguish ordinary incremental deployment from explicit resource-deletion management. Do not embed secret values in templates, outputs, or build logs.

Outcome: Interpret deployment artefacts, explain a proposed change and its limitations, and identify identity, dependency, state, and rollback assumptions requiring review.

Bridge: Reproducible delivery supports operations; next we connect telemetry to diagnosis, security, and recoverability.

## Chapter 11 — Observability, Security, and Recovery

Objective: Explain how to detect, investigate, contain, and recover from operational failures.

1. Metrics, structured logs, traces, correlation, and retention choices
2. Azure Monitor, Application Insights, Log Analytics, and introductory KQL
3. Diagnostic settings, Activity Log, collection scope, and audit evidence
4. Service objectives, alerts, action groups, runbooks, and ownership
5. Key Vault, encryption keys, secret rotation, and access dependencies
6. Defender for Cloud, Microsoft Sentinel, WAF, and security-service boundaries
7. Incident diagnosis, containment, privileged access, and patch responsibilities
8. Azure Backup, service-native backups, isolated copies, and restore validation
9. RTO/RPO, dependency recovery, regional failover/failback, and Site Recovery boundaries
10. Quotas, throttling, retries, dependency failures, and resilience validation

Worked illustrations: KQL over a small synthetic log table and expected output; a latency incident correlated with a dependency trace; an audit event with its collection assumptions; a broken secret rotation; a compromised-identity containment sequence; a restore timeline. Distinguish telemetry availability from configured export/retention and detection from prevention. Separate backup/restore, high availability, and disaster recovery. Do not assume a paired Region automatically provides application failover, identical capacity, or zero-data-loss recovery.

Outcome: Interpret operational evidence, explain an incident/recovery sequence, and assess whether a workload's security and recovery claims are supported by configured controls and validation evidence.

Bridge: With behaviour observable and recovery explicit, next we use evidence to optimise and evolve the architecture.

## Chapter 12 — Optimisation and Architecture Evolution

Objective: Integrate performance, economics, reliability, and business requirements into architectural decisions.

1. Performance measurements, latency distributions, throughput, and bottlenecks
2. Caching, Front Door/edge delivery, cache keys, and freshness consequences
3. Cost allocation, budgets, billing scope, and workload cost drivers
4. Rightsizing, scaling, commitments, utilisation, and sustainability trade-offs
5. VM, PaaS, container, and serverless architecture comparisons
6. Migration, cutover, regional evolution, and architecture decision records
7. Integrated Azure Well-Architected review and prioritised improvements

Worked illustrations: A latency breakdown; an assumption-based monthly cost comparison including logs, backups, data transfer, storage, and idle capacity; alternative order-platform diagrams; a migration with reconciliation and rollback limits. Review reliability, security, cost optimisation, operational excellence, and performance efficiency together. Explain sustainability alongside utilisation and operational constraints; lower price alone does not prove lower environmental impact. Prioritise measured improvements rather than prescribe a universal architecture.

Outcome: Present and critique a coherent Azure design, justify its service and operational choices, and explain a staged evolution under explicit requirements and assumptions.

Bridge: Continue through optional implementation, current service documentation, operational practice, and specialist study. Production responsibility requires demonstrated deployment, security, incident, and recovery competence beyond following worked explanations.

## Sources and scope

Official conceptual sources inspected on 2026-10-12:

- [Resource organisation](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources), [control/data planes](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane), [RBAC](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview), [managed identities](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview), and [Azure Policy](https://learn.microsoft.com/en-us/azure/governance/policy/overview).
- [Compute selection](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree), [App Service](https://learn.microsoft.com/en-us/azure/app-service/overview), [VNet integration](https://learn.microsoft.com/en-us/azure/app-service/overview-vnet-integration), and [private endpoints](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview).
- [Storage redundancy](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy), [Blob concurrency](https://learn.microsoft.com/en-us/azure/storage/blobs/concurrency-manage), [data models](https://learn.microsoft.com/en-us/azure/architecture/data-guide/technology-choices/understand-data-store-models), [Cosmos DB consistency](https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels), and [cache retirement guidance](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/retirement-faq).
- [Messaging choices](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/messaging), [Functions hosting](https://learn.microsoft.com/en-us/azure/azure-functions/functions-scale), and [Service Bus settlement](https://learn.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement).
- [ADLS access](https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-access-control-model), [Fabric overview](https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview), [Bicep](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview), and [what-if](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-what-if).
- [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/overview), [log queries](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-query-overview), [Backup](https://learn.microsoft.com/en-us/azure/backup/backup-overview), [business continuity/recovery](https://learn.microsoft.com/en-us/azure/reliability/concept-business-continuity-high-availability-disaster-recovery), [Cost Management](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/overview-cost-management), and [Well-Architected](https://learn.microsoft.com/en-us/azure/well-architected/).

Book comparison: Lars Klint's [Microsoft Azure in Action](https://www.manning.com/books/microsoft-azure-in-action), October 2025, was inspected through publisher description and topic coverage. Iain Foulds's [Learn Azure in a Month of Lunches, second edition](https://www.oreilly.com/library/view/learn-azure-in/9781617297625/), July 2020, was inspected through publisher contents. Full texts were not accessed. Use these as coverage and teaching-sequence comparisons; current primary documentation governs names, capabilities, and behaviour. Detailed tracking and the coverage map are in [README.md](../README.md).

Boundaries: representative application/platform reasoning, not an exhaustive Azure catalogue. Deep Entra administration, enterprise landing zones, advanced hybrid networks, Kubernetes administration, specialist databases/analytics, ML/AI, IoT, media, and HPC are deferred. SQL, Python, Spark, system design, and Databricks have companion plans. Fabric is introduced as a distinct product choice, not treated as an interchangeable Azure resource service.

This is a teaching plan, not completed lessons or executed deployments. Every configuration, code example, detailed guarantee, retirement timeline, SKU dependency, quota, and price requires verification against the selected service and Region when lessons are authored.
