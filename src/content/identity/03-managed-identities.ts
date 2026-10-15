import type { Section } from '../types'

// Ch2 §3. Reference: Managed identities for Azure resources overview; azure-identity DefaultAzureCredential.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the
// authoring environment) — re-check the claims below before publishing.
export const managedIdentities: Section = {
  id: 'managed-identities',
  title: 'System- and user-assigned managed identities',
  scene: 'managed-identity',
  focus: 'usr-id',
  slide: `## Identities with no secret to keep

A **managed identity** is a service principal whose credentials **Azure manages**. Your code never sees a password.

### System-assigned
- Created **with** one resource, deleted **with** it
- One identity, one resource

### User-assigned
- A **separate resource** with its own lifecycle
- Attach it to **several** workloads
- Survives deleting any one of them
- Prefer it when **several resources** share access

### How code uses it
- \`DefaultAzureCredential\` asks the platform for a **token**
- The token goes to the **service**, here Blob Storage

### Not enough alone
- An identity with **no role** gets **no access**`,
  narration:
    "Secrets in code are a liability, so Azure offers a better arrangement: the managed identity. It is a service principal whose credentials Azure creates, stores and rotates on your behalf, and your code never sees a password. There are two kinds. A system-assigned identity is created together with one resource, such as a web app, and deleted when that resource is deleted. It belongs to that one resource only. A user-assigned identity is a standalone resource with its own lifecycle. In the diagram, the order API and a function app both use the same one, called id-retail, and it survives if either of them is removed. The code card shows how little the application needs. The default credential class asks the hosting platform for a token, and the client library presents that token to Blob Storage. Notice what is missing: no key, no connection string. But here is the catch. A managed identity is only an identity. If it has not been given a suitable role on the storage account, the token proves who the app is, and the request is still refused. Granting roles is what role-based access control is for.",
}
