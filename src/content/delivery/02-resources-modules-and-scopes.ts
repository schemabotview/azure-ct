import type { Section } from '../types'

// Ch10 §2. Reference: Bicep modules; implicit and explicit dependencies; deployment scopes.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const resourcesModulesAndScopes: Section = {
  id: 'resources-modules-and-scopes',
  title: 'Resources, modules, references, dependencies and scopes',
  scene: 'modules-scopes',
  focus: 'scopes',
  slide: `## Structuring a deployment

### Modules
- A **module** is a Bicep file you call with **parameters**
- Use one per **unit of ownership**, such as a web tier

### References and dependencies
- Using **plan.id** creates a **dependency**
- ARM deploys the plan **first**
- Independent resources deploy **in parallel**

### Scopes
- **Resource group** for most workloads
- **Subscription** for groups and policy
- **Management group** for wide policy
- **Tenant** is rare and **highly privileged**

### Habits
- Keep modules **small**, with **explicit** parameters
- Share modules through a **registry** with versions

### Choose the smallest scope that works`,
  narration:
    "A real deployment has many resources, so Bicep gives you ways to organise them. A module is a Bicep file that you call with parameters, from another file. In the card, the main file declares the plan, then calls a web module, and passes it the plan's identifier. Modules let you create one per unit of ownership, such as a web tier, and reuse it across environments. That identifier is also a reference, and references do something valuable. Because the web module uses the plan's identifier, Azure Resource Manager knows the plan must be deployed first. You rarely write dependencies by hand. Resources with no relationship are deployed in parallel. The last concept is scope. Most workloads deploy at the resource group scope. Creating resource groups themselves, and subscription-level policy, deploys at the subscription scope. A management group scope covers wide policy, and the tenant scope is rare and highly privileged. Keep modules small, and share them through a versioned registry. As with role assignments, choose the smallest scope that works. Now, how do the same files serve development and production?",
}
