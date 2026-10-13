import type { Section } from '../types'

// Ch11 §3. Reference: Azure Monitor diagnostic settings; Activity Log; platform logs and metrics collection.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Retention defaults for platform metrics and Activity Log are time-limited and change; confirm before stating numbers.
export const diagnosticSettingsAndActivityLog: Section = {
  id: 'diagnostic-settings-and-activity-log',
  title: 'Diagnostic settings, Activity Log and audit evidence',
  scene: 'ch11-diagnostics',
  focus: 'sources',
  slide: `## What is actually recorded

### Available is not collected
- **Platform metrics**: collected for a limited time
- **Activity Log**: control-plane events, kept briefly
- **Resource logs**: **not collected** until you configure them
- **App telemetry** needs an SDK or an agent

### Diagnostic settings
- Route a resource's logs to **Log Analytics**, **storage** or **Event Hubs**
- Set them per resource, ideally with **policy**
- **Alert** when logging is switched off

### Audit evidence
- The Activity Log shows **who changed what, and when**
- It records **management actions**, not data reads

### Check
- Confirm the **scope and retention** match what an audit needs`,
  narration:
    "A common surprise during an investigation is discovering the data you need was never kept. The table is the antidote. Platform metrics are collected automatically, but only for a limited time. The Activity Log records control-plane events across the subscription, and is kept briefly. Resource logs, the detailed logs from services such as storage or databases, are not collected at all until you configure a diagnostic setting. And application telemetry needs an SDK or an agent. In short, telemetry being available is not the same as it being collected and retained. A diagnostic setting routes a resource's logs to a destination: a Log Analytics workspace if you want to query and alert, a storage account for cheap long retention, or Event Hubs to stream to another system. Set them per resource, and ideally enforce them with policy so nothing is missed. The Activity Log entry in the card is audit evidence. It shows who made a role assignment, and when. But it records management actions, not data reads. Before an audit, check the scope and the retention actually match the question. Now, turning signals into promises and alerts.",
}
