import type { Section } from '../types'

// Ch3 §2. Reference: Azure App Service overview and plans; supported runtimes and pricing tiers.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Tier names, slot and autoscale eligibility, and supported runtime versions change; confirm for the chosen SKU and Region.
export const appServicePlansAndApps: Section = {
  id: 'app-service-plans-and-apps',
  title: 'App Service apps, plans and runtimes',
  scene: 'plans-apps',
  focus: 'plan',
  slide: `## Apps run on plans

### The plan
- A **plan** is the compute: region, operating system, size and instance count
- It is what you **pay for**, whether one app uses it or five

### The app
- A **web app** is your code running on a plan
- Apps on the same plan **share its CPU and memory**

### Runtime choices
- Pick a **stack** such as Python, .NET or Node.js, and a supported version
- Versions **retire**, so check support before you start

### Tier matters
- The pricing tier sets **size and features**
- Slots, autoscale and networking options depend on the **tier**
- Cheap dev tiers are **limited**: do not judge production from them`,
  narration:
    "App Service is Azure's managed home for web applications, and its key idea is the split between a plan and an app. The plan is the compute. It fixes the region, the operating system, the size of the machine, and how many instances you run. The app is your code running on that plan. In the diagram, three apps share one plan: the shop site, the order API and an admin tool. They share the same CPU and memory, which is economical, but it also means a busy app can slow its neighbours. Billing follows the plan, not each app, so a plan costs the same whether it hosts one app or five. The plan also fixes a few choices. You pick Linux or Windows, and a runtime stack such as Python, with a supported version. Versions retire over time, so check support before you commit. The pricing tier matters too, because it sets the size and decides which features exist. Deployment slots, autoscale and some networking options all depend on the tier, so always check eligibility rather than assuming. Now let's put code onto a plan.",
}
