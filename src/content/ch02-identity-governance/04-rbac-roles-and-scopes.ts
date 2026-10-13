import type { Section } from '../types'

// Ch2 §4. Reference: Azure RBAC overview and role-assignment docs. Role names are built-in roles.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the
// authoring environment) — re-check the claims below before publishing.
export const rbacRolesAndScopes: Section = {
  id: 'rbac-roles-and-scopes',
  title: 'Azure RBAC: roles, assignments and scopes',
  scene: 'ch02-rbac',
  focus: 'rg',
  slide: `## Who may do what, where

### A role assignment has three parts
- A **principal**: user, group or identity
- A **role definition**: a named set of allowed actions
- A **scope**: where it applies

### Common built-in roles
- **Reader** views, **Contributor** changes resources
- **Owner** also manages access
- Prefer **narrow roles** over Owner

### Scope and inheritance
- Scopes nest: management group, subscription, resource group, resource
- An assignment applies **downward** to everything beneath it

### Effective access
- Assignments **add up**; there is no "subtract" at the same scope
- Assign to **groups**, at the **narrowest scope** that works`,
  narration:
    "Azure role-based access control answers the authorisation question with a simple formula. A role assignment is a principal, a role, and a scope. The principal is the who: a user, a group, or an application identity. The role is a named bundle of allowed actions, such as Reader, which can view resources, or Contributor, which can change them but cannot manage access. Owner can also manage access, which is why it should be rare. The scope is the where, and scopes nest: a management group contains subscriptions, a subscription contains resource groups, and a resource group contains resources. An assignment made at one level applies to everything beneath it. The matrix shows four assignments. The retail developers get Contributor on the development group, but only Reader on production. The auditors get Reader on the whole production subscription, and the web app's identity gets a data role on one storage account. What a principal can do is the sum of all the assignments that reach the resource. So the habit is: assign to groups rather than individuals, and at the narrowest scope that works. One catch remains, and it surprises almost everyone: which kinds of access these roles control.",
}
