import type { Section } from '../types'

// Ch9 §4. Reference: Azure Data Factory pipelines and activities; Microsoft Purview data catalog and lineage.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm current product names and the relationship between Data Factory, Fabric Data Factory and Purview.
export const dataFactoryPipelinesAndGovernance: Section = {
  id: 'data-factory-pipelines-and-governance',
  title: 'Data Factory pipelines, orchestration, catalog and governance',
  scene: 'data-factory',
  focus: 'owners',
  slide: `## Pipelines

### What a pipeline is
- A chain of **activities** on a **trigger**
- **Copy** moves data; others run **transformations**
- Data Factory **orchestrates**; other engines **compute**

### Operating it
- **Parameters** keep one pipeline reusable across environments
- **Alerts** on failure, with a named **owner**
- **Retries** for transient faults

### Cost
- You pay for **activity runs** and **data movement**

### Governance
- A **catalogue** records what data exists and who owns it
- **Lineage** shows where a number came from
- These are **separate responsibilities** from running the pipeline`,
  narration:
    "Moving data reliably needs orchestration, and Azure Data Factory is the service we will use as the concrete example. A pipeline is a chain of activities started by a trigger, such as a nightly schedule. The card shows a trimmed Copy activity, which reads from a SQL dataset and writes Parquet to the lake. The diagram shows the whole nightly pipeline. Copy the orders to the raw zone, transform them into the curated zone, load a summary table, and alert somebody if any step fails. Note the division of labour: Data Factory orchestrates and moves data, while other engines do heavier computation. A few habits make pipelines dependable. Use parameters, so the same pipeline works in development and production. Add alerts, with a named person who owns them. And configure retries for transient faults. You pay for activity runs and data movement, so avoid chatty pipelines. Then there is governance, which is a separate job from running the pipeline. A catalogue records what data exists, what it means and who owns it. Lineage shows where a number came from. Without them, the lake becomes a swamp. Which analytics platform sits on top is the next choice.",
}
