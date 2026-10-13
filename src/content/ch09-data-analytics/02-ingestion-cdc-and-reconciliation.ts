import type { Section } from '../types'

// Ch9 §2. Reference: Azure Data Factory incremental loading patterns; change data capture overview.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm CDC availability for the chosen source and the watermark-pattern limitations noted in the scene.
export const ingestionCdcAndReconciliation: Section = {
  id: 'ingestion-cdc-and-reconciliation',
  title: 'Batch ingestion, change data capture and reconciliation',
  scene: 'ch09-ingestion',
  focus: 'checks',
  slide: `## Moving data out

### Four methods
- **Full load**: simple, but costly at scale
- **Watermark**: rows changed since the last run
- **CDC**: read the source's **change log**, including deletes
- **Event stream**: consume changes as they happen

### The watermark trap
- It **misses hard deletes**
- A change that skips the **timestamp** is lost
- Use a **half-open window** so no row is counted twice

### Source contracts
- Agree **columns, meaning and change rules** with the owner
- A silent schema change **breaks** the pipeline

### Reconciliation
- Compare **row counts** and **totals** with the source
- A pipeline that ran is **not proof** it is right`,
  narration:
    "How does data get from the operational database into analytics? The table lists four methods. A full load copies everything each time. It is simple, but gets expensive as the data grows. A watermark approach copies only the rows changed since the last run, like the query in the card, which uses a half-open window so no boundary row is counted twice or skipped. Its weakness is that it misses hard deletes, and any change that does not update the timestamp. Change data capture reads the source's change log, so it sees inserts, updates and deletes accurately, at the cost of more setup and sensitivity to schema changes. An event stream consumes changes as they happen, and brings duplicates and ordering questions of its own. Whichever you choose, agree a source contract with the owner of the data: which columns, what they mean, and how changes will be announced, because a silent schema change breaks the pipeline. And reconcile. Compare row counts and totals with the source, so you can show the numbers match. A pipeline that ran successfully is not proof that it ran correctly. Next, where does the data land?",
}
