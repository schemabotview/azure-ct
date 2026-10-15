import type { Section } from '../types'

// Ch6 §2. Reference: Azure storage account overview; Blob Storage introduction; az storage blob commands.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm naming rules (3 to 24 lowercase letters and digits, globally unique) and which account types support which features.
export const storageAccountsAndBlobs: Section = {
  id: 'storage-accounts-and-blobs',
  title: 'Storage accounts, Blob containers and object operations',
  scene: 'blob-basics',
  focus: 'account',
  slide: `## Accounts, containers, blobs

### The hierarchy
- A **storage account** is the top-level namespace and billing unit
- Its name is **globally unique**: 3 to 24 lowercase letters and digits
- **Containers** group blobs; **blobs** hold the data

### Operations
- **Upload**, **download**, **list**, **copy** and **delete**
- Each blob has a **URL**: account, container, blob name

### Choices at creation
- The **account type** and **redundancy** decide the features you get
- The **region** is fixed for the account
- Plan **naming**, since the name appears in every URL

### Access paths
- A **public endpoint** by default
- Or a **private endpoint** inside your network`,
  narration:
    "Blob Storage has a three-level structure. At the top is the storage account, which is the namespace and the unit you configure and pay for. Its name is globally unique, three to twenty-four lowercase letters and digits, and it appears in every URL, so it is worth planning. Inside the account are containers, which group blobs, and inside containers are the blobs themselves, the actual objects. The command in the card uploads a receipt file into a container called receipts, using the signed-in identity rather than a key. Every blob has a URL that follows the structure: the account, then the container, then the blob name. You can upload, download, list, copy and delete, and the operations are the same whether you use the CLI, an SDK or plain HTTPS. Two choices at creation matter. The account type and redundancy decide which features you get, and the region cannot be changed later. Finally, think about the access path. By default the account has a public endpoint. You can instead reach it through a private endpoint inside your network, as we saw in the networking chapter. Who is allowed to read and write is the next question.",
}
