import type { Section } from '../types'

// Ch6 §3. Reference: Authorize access to Blob data: Microsoft Entra ID, shared access signatures, shared key.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm the SAS query parameters shown, user-delegation SAS availability, and the option to disable shared-key access.
export const storageAccessIdentitySasKeys: Section = {
  id: 'storage-access-identity-sas-keys',
  title: 'Managed identities, RBAC, SAS and account keys',
  scene: 'access-methods',
  focus: 'prefer',
  slide: `## Authorising blob access

### Identity first
- A **managed identity** with a **data role** such as Blob Data Reader
- No secret to store, leak or rotate

### Shared access signatures
- A **signed URL** with **permissions, scope and expiry**
- A **user delegation** SAS is signed with Entra credentials
- Holders can use it until it **expires**: you cannot see who has it

### Account keys
- Full access to the **whole account**
- Anyone with a key bypasses **roles**
- **Disable** shared-key access where you can

### Least privilege
- Grant the **narrowest scope** and **shortest time**
- Short-lived SAS for **one-off sharing**`,
  narration:
    "We met data roles in the identity chapter, and now we can compare all the ways to authorise a blob request. From narrow to broad, the first is a managed identity with a data role. The app proves who it is, the role says what it may do, and there is no secret to store, leak or rotate. That should be the default. Next is a shared access signature, or SAS. A SAS is a signed URL that carries a permission, a scope and an expiry. In the card, this one gives read-only access to a single blob until a specific time. A SAS made with Entra credentials is called a user delegation SAS, and is preferable to one signed with the account key. Be clear about the risk: whoever holds the URL can use it until it expires, and you cannot see who they passed it to. The broadest option is the account key, which gives full access to everything in the account and bypasses roles entirely. Where you can, disable shared-key access. In practice: narrowest scope, shortest time, and use a short-lived SAS only for one-off sharing. Next, what happens when two writers collide.",
}
