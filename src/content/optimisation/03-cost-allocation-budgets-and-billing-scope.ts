import type { Section } from '../types'

// Ch12 §3. Reference: Microsoft Cost Management overview; cost analysis scopes; tagging for cost allocation.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Billing hierarchy names depend on the agreement type (Enterprise Agreement, Microsoft Customer Agreement, pay-as-you-go).
export const costAllocationBudgetsAndBillingScope: Section = {
  id: 'cost-allocation-budgets-and-billing-scope',
  title: 'Cost allocation, budgets, billing scope and workload cost drivers',
  scene: 'cost-scopes',
  focus: 'scopes',
  slide: `## Understanding the bill

### Cost drivers
- **Compute**: size multiplied by time reserved
- **Storage**: GB kept, plus operations
- **Data transfer**: bytes **leaving** a region
- **Logs**: GB **ingested** and retained
- **Idle capacity**: headroom nobody uses

### Where to look
- Cost can be viewed by **billing account, subscription, resource group, tag**
- **Tags** must be applied to be useful, and policy can enforce them

### Controls
- **Budgets** alert; they do **not** cap spending
- **Anomaly alerts** catch sudden jumps
- Review cost **with the workload owner**
- Cost data **arrives late**: do not wait for the invoice`,
  narration:
    "Cost optimisation starts with understanding where money goes, so list the drivers. Compute grows with the size of the machine multiplied by the time it is reserved. Storage grows with the gigabytes you keep, plus the operations you perform. Data transfer grows with the bytes leaving a region, which surprises people. Logs and metrics grow with what you ingest and retain. And idle capacity is simply headroom that nobody uses, which you still pay for. To attribute those costs, look at the right scope. Cost Management lets you view spending by billing account, subscription, resource group and by tag. Tags only help if they are applied consistently, which is why policy can enforce them, as we saw in the governance chapter. Remember what a budget is. It sends an alert as spending approaches a threshold, but it is not a cap, and resources keep running. Add anomaly alerts, which catch a sudden jump. Cost data also arrives late, so do not wait for the invoice. And review cost with the workload owner, since the owner knows whether a spike is a launch or a mistake. With the drivers known, how do we reduce them?",
}
