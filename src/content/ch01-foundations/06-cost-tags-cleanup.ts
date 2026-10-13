import type { Section } from '../types'

// Ch1 §6. Reference: Cost Management budgets and tagging docs. The ledger is HYPOTHETICAL and
// carries no prices on purpose — rates depend on SKU, Region and date.
// Not verified against live docs at authoring time — re-check budget behaviour and which
// resources keep billing after deletion before publishing.
export const costTagsCleanup: Section = {
  id: 'cost-tags-cleanup',
  title: 'Costs, tags and cleanup',
  scene: 'ch01-cost-lifecycle',
  focus: 'budget',
  slide: `## Knowing what you pay for

### Billing follows resources
- Most resources bill **while they exist**, by time, size or usage
- Deleting the app does not delete its **plan, disks, addresses or logs**

### Tags
- Name and value pairs such as \`env=dev\`
- Make cost reports **filterable** by owner or purpose
- Not copied from the group to its resources **by default**

### Budgets
- An **alert** when spend nears a threshold
- Not a **spending cap**: the resources keep running

### Review and cleanup
- Ask owners if it is **still needed**
- Delete the resource group for a throwaway environment, after **checking dependencies**`,
  narration:
    "The last foundation is money. Most Azure resources bill for as long as they exist, by time, by size, or by usage. That leads to a classic surprise, shown in our hypothetical ledger. We delete the web app, but the App Service plan it ran on is a separate resource and keeps billing. An unattached disk keeps billing. A public IP address and the logs we collected do too. Four habits help. First, tags. A tag is a name and value pair, like env equals dev, and it makes cost reports filterable by owner or purpose. Tags are not automatically copied from a resource group to the resources inside it, so you apply them deliberately or enforce them with policy. Second, budgets. A budget sends an alert as spending approaches a threshold you choose, but it is not a spending cap. Your resources keep running and keep billing after the alert. Third, review: ask the owner regularly whether the thing is still needed. Fourth, cleanup. Putting a throwaway environment in its own resource group means you can delete the whole group, after checking that nothing else depends on it. That completes the foundations: we know where things live and who pays. Next comes the harder question of who is allowed to do what, which is identity, access and governance.",
}
