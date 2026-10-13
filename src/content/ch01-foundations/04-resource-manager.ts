import type { Section } from '../types'

// Ch1 §4. Reference: Azure Resource Manager overview; control-plane and data-plane page.
// Not verified against live docs at authoring time — re-check resource-provider registration
// behaviour before publishing.
export const resourceManagerSection: Section = {
  id: 'resource-manager',
  title: 'Azure Resource Manager and resource providers',
  scene: 'ch01-resource-manager',
  focus: 'arm',
  slide: `## One front door

The portal, the CLI, SDKs and templates all send the **same kind of request** to **Azure Resource Manager** (ARM).

### What ARM does
- Checks **who you are** and whether you are **allowed**
- Applies **governance rules** such as Azure Policy
- Routes the request to the right **resource provider**

### Resource providers
- Each service ships one, named like \`Microsoft.Web\`
- A provider must be **registered** in the subscription before you create its resources

### Why one path matters
- One place for **access checks, policy and audit**

### Scope of this path
- This is the **control plane**: creating, changing, deleting resources
- Reading blob contents or running SQL queries is a different path`,
  narration:
    "Whether you click in the portal, type a command in the CLI, call an SDK, or deploy a template, you are doing the same thing underneath. You are sending a management request to Azure Resource Manager, usually shortened to ARM. ARM is the front door. It confirms who you are, checks that you are allowed to perform the operation, applies governance rules such as Azure Policy, and then hands the request to a resource provider. A resource provider is the part of a service that owns one kind of resource. Microsoft.Web handles web apps, Microsoft.Sql handles databases, and Microsoft.Storage handles storage accounts. A provider has to be registered in your subscription before you can create its resources, which is why a brand-new subscription sometimes complains about an unregistered provider on first use. That single path gives one place for access checks, policy and audit. One boundary to remember: this whole path is the control plane, the place where resources are created, changed and deleted. Reading the contents of a blob or running a query against a database does not travel through ARM. We will give that distinction its own section in the next chapter. Now let's make one real request.",
}
