import type { Section } from '../types'

// Ch11 §4. Reference: Azure Monitor alerts and action groups; Well-Architected reliability: SLOs and error budgets.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Objectives in the scene are illustrative; targets belong to the owning team and business.
export const slosAlertsAndOwnership: Section = {
  id: 'slos-alerts-and-ownership',
  title: 'Service objectives, alerts, action groups, runbooks and ownership',
  scene: 'ch11-slo-alerts',
  focus: 'slo',
  slide: `## Promises and pages

### Objectives
- An **indicator** is what you measure
- An **objective** is the target, such as **99.9 %**
- The remainder is the **error budget**: 43.2 minutes in 30 days

### Alerts
- Alert on **symptoms users feel**, not every cause
- Fire when the budget **burns fast**
- Too many alerts become **noise**

### The response path
- An **action group** tells **people and systems**
- A **runbook** holds the **first safe steps**
- A **named owner** answers

### Review
- Tune alerts after **every incident**`,
  narration:
    "Telemetry is only useful if it leads to action. Start with an objective. An indicator is what you measure, such as the share of requests that succeed. The objective is the target. In the table, ninety-nine point nine percent over thirty days. The part you are allowed to miss is the error budget. A thirty-day month has forty-three thousand two hundred minutes, so a one tenth of a percent budget is about forty-three minutes. Those numbers are illustrative, and the real targets belong to the owning team and the business. Alerts should follow the objective. Alert on symptoms that users feel, and fire when the budget is burning fast, rather than paging someone for every possible cause. Too many alerts become noise, and noise gets ignored. When an alert fires, an action group decides who and what is told, whether people, a chat channel, or an automated system. A runbook holds the first safe steps, so the person paged does not have to invent them. And someone must own the alert, by name. Finally, review and tune alerts after every incident. Next, the secrets and keys that these systems depend on.",
}
