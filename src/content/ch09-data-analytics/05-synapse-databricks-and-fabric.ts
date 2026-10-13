import type { Section } from '../types'

// Ch9 §5. Reference: Microsoft Fabric overview; Azure Synapse Analytics; Azure Databricks. Compare Fabric Data Factory separately.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Product direction changes quickly (Fabric versus Synapse); verify current guidance, and treat this section as a map of shapes, not a recommendation.
export const synapseDatabricksAndFabric: Section = {
  id: 'synapse-databricks-and-fabric',
  title: 'Synapse, Azure Databricks and Microsoft Fabric',
  scene: 'ch09-product-choice',
  focus: 'surfaces',
  slide: `## Choosing an analytics platform

### Azure Synapse
- An **Azure resource**: SQL, Spark and pipelines
- Governed by **subscription and RBAC**

### Azure Databricks
- An **Azure resource** for a **Spark lakehouse**
- Has its own **workspace** and catalogue
- A **companion subject**, not covered here

### Microsoft Fabric
- A **SaaS platform** on **OneLake**
- Governed by **tenant settings, workspaces, capacity**
- Its **Data Factory** is a separate product to compare

### Boundaries
- Fabric is **not** just another Azure resource service
- Check **where the bill and the access** are managed
- Product direction **changes**: verify current guidance`,
  narration:
    "Three Microsoft analytics platforms are easy to confuse, and the difference is mainly in the control surface. Azure Synapse Analytics is a set of Azure resources: SQL engines, Spark and pipelines. You govern it the way you govern other Azure resources, through subscriptions, resource groups and role assignments. Azure Databricks is also an Azure resource, hosting a Spark-based lakehouse, with its own workspace and its own catalogue. It deserves a specialist treatment of its own, so we treat it as a companion subject. Microsoft Fabric is different in kind. It is a software-as-a-service platform built around OneLake. You manage it through tenant settings, workspaces and capacities, not through resource groups. It even has its own Data Factory experience, which we should compare separately from the Azure one. So when you evaluate a platform, ask where the bill and the access are managed. And be aware that product direction in this area changes quickly, so verify current guidance rather than trusting a table. Finally, what if the data cannot wait for a nightly run?",
}
