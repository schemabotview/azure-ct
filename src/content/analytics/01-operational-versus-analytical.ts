import type { Section } from '../types'

// Ch9 §1. Reference: Azure Architecture Center: online transaction processing vs online analytical processing.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const operationalVersusAnalytical: Section = {
  id: 'operational-versus-analytical',
  title: 'Operational versus analytical requirements',
  scene: 'oltp-olap',
  focus: 'contrast',
  slide: `## Two jobs for the same data

### Operational systems
- Serve the **application**: one order by key
- Hold **current state**, optimised for small writes
- Must answer **immediately**

### Analytical systems
- Serve **people and reports**: scan and aggregate
- Keep **history**, often years
- **Freshness** of minutes to a day is usually fine

### Why not one database?
- Heavy analytical queries **slow** the application
- Operational schemas are **awkward** to analyse
- History is **overwritten** in place

### The bridge
- Copy data out on a **schedule or stream**
- Shape it for **analysis**, then serve it`,
  narration:
    "So far we have built the operational side of our shop: an application that takes orders and stores them. Now the business asks different questions. Which products sold best last quarter? What was revenue by region each week? Did last month's numbers change? Those are analytical questions, and the table shows how they differ from the operational ones. An operational system serves the application: fetch one order by key, write a small change, answer immediately, and hold only the current state. An analytical system serves people and reports. It scans and aggregates over a lot of rows, keeps years of history, and can often tolerate results that are minutes or even a day old. You might wonder why not simply run reports on the operational database. There are three reasons. Heavy queries slow the application down. Operational schemas, which are normalised for writes, are awkward to analyse. And history is overwritten in place, so last month's value is gone. The usual answer is to copy data out, shape it for analysis, and serve it from a separate system. First, how the data gets there.",
}
