import type { Section } from '../types'

// Ch11 §1. Reference: Azure Monitor overview; Application Insights distributed tracing; structured logging guidance.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const metricsLogsTracesAndCorrelation: Section = {
  id: 'metrics-logs-traces-and-correlation',
  title: 'Metrics, structured logs, traces, correlation and retention',
  scene: 'signals',
  focus: 'join',
  slide: `## Three signals

### Metrics
- **Numbers over time**: request rate, CPU, errors
- Cheap, aggregated, great for **alerts**

### Logs
- **One event** with full detail
- Write them **structured**, as fields, so they can be queried

### Traces
- The path of **one request** across services
- Show **where the time went**

### Correlation
- One **ID** on the request, the dependency call and the log line
- Lets you move from a **symptom** to a **cause**

### Retention
- Keeping everything **forever costs money**
- Decide **how long** each signal is useful`,
  narration:
    "When something goes wrong in production, you need evidence, and Azure Monitor deals with three kinds. Metrics are numbers over time, such as request rate and CPU. They are cheap, they aggregate well, and they suit alerts, because they answer the question: is it healthy? Logs record a single event with full detail, answering: what happened? Write them structured, as fields rather than free text, like the card, so that you can query them. And traces follow one request across several services, answering: where did the time go? What ties the three together is a correlation identifier. In the diagram, the request, the dependency call and the log line all carry the same operation identifier, so from a slow request you can find the exact failed call to the catalogue and the error it logged. Without that identifier, you are guessing which log line belongs to which request. One more decision belongs here: retention. Keeping every signal forever costs real money, so decide how long each one remains useful. Next, how to ask questions of all this data.",
}
