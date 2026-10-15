import type { Section } from '../types'

// Ch7 §1. Reference: Azure Architecture Center: understand data store models and data store selection guidance.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
export const dataModelsAndAccessPatterns: Section = {
  id: 'data-models-and-access-patterns',
  title: 'Data models, access patterns and ownership',
  scene: 'data-models',
  focus: 'ask',
  slide: `## Matching data to its shape

### Four models
- **Relational**: tables, joins and **transactions**
- **Document**: one JSON item per read, partitioned for scale
- **Key-value cache**: very fast reads of **hot data**
- **Object**: large files, read and written by name

### Ask first
- What are the **queries**: lookups, joins or scans?
- What must be **atomic**: money, stock?
- How **fast** and how **big** will it grow?
- Who **owns** the data?

### Rules of thumb
- Start from the **access pattern**, not the product
- One service **owns** each piece of data
- Mixing models is normal, but each fact has **one home**
- In the shop: orders **relational**, catalogue **document**
- Plan for growth, not just today's size`,
  narration:
    "A database choice is a choice about how your data will be used, so start with questions, not products. The table lists four models and what each is strong at, with an example from our shop. A relational database stores tables and supports joins and transactions, which suits orders and stock. A document database stores one JSON item per record, so a read fetches everything about one thing, which suits a product catalogue. A key-value cache keeps hot data in memory for very fast reads. And object storage holds large files. The questions on the right decide between them. What are the queries: simple lookups, joins across tables, or scans? What must be atomic, meaning it either all happens or none of it does? Money and stock usually must be. How fast must it be and how big will it grow? And who owns the data? That last one matters more than it sounds: each piece of data should have one owning service and one home, even if the system uses several models overall. In our shop that means orders in a relational database and the catalogue as documents, sized for growth. Let's start with the relational family on Azure.",
}
