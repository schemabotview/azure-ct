import type { Section } from '../types'

// Ch2 §5. Reference: control-plane and data-plane docs; Azure Storage authorisation docs.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the
// authoring environment) — re-check the claims below before publishing.
// Contributor includes listKeys on storage accounts, so a Contributor can reach data with an account
// key unless shared-key access is disabled. The slide states this rather than implying isolation.
export const controlAndDataPlaneAccess: Section = {
  id: 'control-and-data-plane-access',
  title: 'Control-plane versus data-plane access',
  scene: 'ch02-control-data-plane',
  focus: 'denied',
  slide: `## Two doors on one resource

### Control plane
- Managing the **resource**: create, configure, delete
- Goes through Azure Resource Manager
- Management roles such as **Contributor** apply

### Data plane
- Using what the resource **holds**: blobs, queues, rows
- Goes to the **service itself**
- Needs **data roles**, for example Blob Data Reader

### The failure to recognise
- Contributor creates a container, then the blob read returns **403**
- The fix is a **data role**, not a bigger management role

### Watch for shortcuts
- Contributor can **list account keys**
- Keys bypass roles, so prefer **identity-based access** and disable keys where you can`,
  narration:
    "Here is the idea behind some of the most confusing errors in Azure. Many resources have two doors. The control plane is for managing the resource itself: creating it, configuring it, deleting it. Those requests go through Azure Resource Manager, and management roles like Contributor apply. The data plane is for using what the resource holds, such as reading a blob or sending a message. Those requests go to the service directly, and they are governed by data roles. In the diagram, Priya has Contributor on the storage account. She can create a container without any trouble, because that is a management action. But when she downloads a blob using her own sign-in, the service answers with a 403 and an authorisation permission mismatch, because Contributor contains no data action that allows reading blobs. The fix is not a more powerful management role. It is a data role, such as Blob Data Reader, assigned to the identity at a suitable scope. One more subtlety deserves a warning. Contributor is allowed to list the storage account keys, and keys bypass roles entirely. That is one reason to prefer identity-based access and to disable key access where you can.",
}
