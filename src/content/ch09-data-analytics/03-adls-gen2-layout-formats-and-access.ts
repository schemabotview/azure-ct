import type { Section } from '../types'

// Ch9 §3. Reference: Azure Data Lake Storage Gen2 introduction; access control model (RBAC and ACLs); Parquet and partitioning guidance.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm the RBAC and ACL evaluation order, and that shared key and SAS authorisation do not evaluate ACLs.
export const adlsGen2LayoutFormatsAndAccess: Section = {
  id: 'adls-gen2-layout-formats-and-access',
  title: 'ADLS Gen2 layout, formats, partitioning, RBAC and ACLs',
  scene: 'ch09-lake-layout',
  focus: 'auth',
  slide: `## A lake you can query and secure

### Layout
- **Zones**: raw as received, curated cleaned, serving for consumers
- **Partition** folders by a common filter such as date
- A query with a date filter **skips** other folders

### Formats
- **Parquet** is columnar and compressed
- **CSV** is easy to inspect but large and untyped

### Small files
- Many **tiny files** slow queries; **compact** them

### Access: it depends how you sign in
- With an **Entra identity**, **RBAC** is checked first
- **ACLs** apply only if RBAC does **not** allow the request
- A **key** or **SAS** bypasses ACLs

### Practice
- Grant **groups**, not individuals, at the **narrowest folder**`,
  narration:
    "Azure Data Lake Storage Gen2 is Blob Storage with a hierarchical namespace, which gives real folders. The layout matters. The paths in the card use three zones: raw, for data exactly as received; curated, for cleaned data; and serving, for what consumers read. Folders are partitioned by a field that queries commonly filter on, here a date. A query for one day then reads one folder and skips the rest, which is called partition pruning. For format, prefer Parquet. It is columnar and compressed, so analytical queries read less. CSV is easy to inspect but large and untyped. Many tiny files slow queries, so compact them. Now access, where people often assume both a role and an ACL are always required. It depends on how the caller authenticates. With an Entra identity, Azure checks the RBAC data roles first. If a role allows the request, the ACLs are not evaluated. Only if RBAC does not allow it are the ACLs checked. A shared key or SAS token bypasses ACLs altogether. In practice, grant access to groups, at the narrowest folder that works. Now let's orchestrate the movement of data.",
}
