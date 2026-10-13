import type { Section } from '../types'

// Ch1 §3. Reference: Cloud Adoption Framework resource-organisation guidance; Entra and ARM docs.
// Not verified against live docs at authoring time — re-check subscription/tenant relationship
// wording before publishing.
export const tenantSubscriptionResourceGroup: Section = {
  id: 'tenant-subscription-resource-group',
  title: 'Tenant, subscription and resource group',
  scene: 'ch01-ownership-tree',
  focus: 'rg-prod',
  slide: `## Three different containers

### Entra tenant
- Your organisation's **identity directory**: users, groups, applications
- Each subscription trusts **one** tenant

### Subscription
- The unit of **billing, quota and access scope**
- Often split by environment, such as prod and dev

### Resource group
- A container for resources that **share a lifecycle**
- Each resource lives in **exactly one** group
- Deleting the group deletes **what is inside it**

### Common mix-up
- A resource group is **not a network boundary**
- Its resources may sit in different regions and networks`,
  narration:
    "Three words get mixed up constantly, so let's separate them. A tenant is your organisation's identity directory in Microsoft Entra. It holds users, groups and applications. A subscription is where resources are billed and where quotas apply, and it also acts as a scope for access. Each subscription trusts exactly one tenant, and one tenant can have many subscriptions. In the diagram, contoso has a production subscription and a separate development one, so a mistake in dev cannot touch the production bill or its quota. Inside a subscription, a resource group holds resources that share a lifecycle. You create them together, manage them together and, when the time comes, delete them together. Every resource belongs to exactly one group. Here is the misconception to avoid. A resource group is a management container, not a network boundary. Resources in the same group can be in different regions and different networks, and resources in different groups can talk to each other freely. With ownership mapped, how does a request to change any of this actually work?",
}
