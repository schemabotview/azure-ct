import type { Section } from '../types'

// Ch11 §2. Reference: Azure Monitor Logs overview; Application Insights data model; Kusto Query Language (KQL) overview.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm the Application Insights table and column names (requests, timestamp, duration) for the workspace-based schema.
export const azureMonitorApplicationInsightsAndKql: Section = {
  id: 'azure-monitor-application-insights-and-kql',
  title: 'Azure Monitor, Application Insights, Log Analytics and introductory KQL',
  scene: 'ch11-kql',
  focus: 'query',
  slide: `## Querying telemetry

### The pieces
- **Azure Monitor** is the umbrella for metrics, logs and alerts
- **Application Insights** collects **app telemetry**
- A **Log Analytics workspace** stores and queries it

### KQL in one query
- Start from a **table**
- **where** filters rows
- **summarize** aggregates, **by** groups
- **order by** sorts the result

### Reading the output
- One row per **name**, with a **count** and a **p95**
- p95 means **95 % of calls were faster**

### Habit
- **Limit the time range** first: it is cheaper and faster`,
  narration:
    "Azure Monitor is the umbrella service for metrics, logs and alerts. Application Insights collects telemetry from your application, such as requests and exceptions, and a Log Analytics workspace stores it and lets you query it. The query language is KQL, and the card shows a first useful query. You start from a table, here the requests table. A where line filters to the last hour. A summarize line aggregates, producing a count and the ninety-fifth percentile of duration, grouped by the request name, and the order by line sorts the slowest first. The table shows the output we would expect from a small synthetic dataset. One row per request name. The order endpoint has two hundred and twelve calls with a ninety-fifth percentile of nineteen hundred milliseconds, which stands out, while the health check is fast. A percentile deserves a note: ninety-fifth percentile means ninety-five percent of calls were faster than that value, which tells you more about the slow tail than an average does. A good habit is to limit the time range first, because it makes queries faster and cheaper. Next, getting the right data collected.",
}
