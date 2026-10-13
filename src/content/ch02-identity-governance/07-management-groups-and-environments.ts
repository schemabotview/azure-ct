import type { Section } from '../types'

// Ch2 §7. Reference: Cloud Adoption Framework management groups / subscription organisation guidance.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the
// authoring environment) — re-check the claims below before publishing.
export const managementGroupsAndEnvironments: Section = {
  id: 'management-groups-and-environments',
  title: 'Management groups and environment isolation',
  scene: 'ch02-management-groups',
  focus: 'workloads',
  slide: `## Organising many subscriptions

### Management groups
- Containers **above subscriptions**
- Roles and policies assigned there are **inherited** by everything beneath
- One assignment instead of many copies

### Splitting by environment
- Separate subscriptions for **production and development**
- Each has its own **RBAC, policy, quota and billing**
- A mistake in dev has a smaller **blast radius**

### What it does not do
- A subscription is **not a network boundary** by itself
- Peering or shared identities can still connect environments

### Design habits
- Group by **policy needs**, not by org chart
- Keep the hierarchy **shallow**`,
  narration:
    "Once a company has more than a handful of subscriptions, assigning roles and policies one at a time stops working. Management groups solve that. They sit above subscriptions and form a hierarchy, and anything assigned to a management group is inherited by every subscription and resource beneath it. In the diagram, a platform group holds the shared subscriptions, such as the hub network and monitoring, while a landing-zones group holds the workload subscriptions, production and development. The allowed-regions policy is assigned once, at landing zones, and both workload subscriptions inherit it. That is one assignment instead of several copies that can drift apart. Splitting production and development into different subscriptions also gives each its own role assignments, policies, quotas and bill, which limits the blast radius of a mistake. Be careful what that claim covers, though. A separate subscription is not automatically a network boundary. If the environments are connected by peering, or share an identity with broad roles, they can still affect each other. Organise management groups around what needs the same policy, not around the company's org chart, and keep the hierarchy shallow. Last in this chapter: privileged access and who owns which layer.",
}
