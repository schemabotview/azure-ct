import type { Section } from '../types'

// Ch7 §3. Reference: Azure Database for PostgreSQL flexible server overview; Azure Database for MySQL.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm the current PostgreSQL offering names, supported major versions, HA options, and any retirement notices for older deployment modes.
export const postgresqlAndManagedRelationalSelection: Section = {
  id: 'postgresql-and-managed-relational-selection',
  title: 'PostgreSQL and managed relational service selection',
  scene: 'ch07-managed-relational',
  focus: 'same',
  slide: `## Choosing a managed relational service

### PostgreSQL on Azure
- **Azure Database for PostgreSQL** runs the open-source engine
- Choose it for the **ecosystem**, extensions and portability

### How to choose
- Let the **application's engine** lead the choice
- Check for required **extensions and features**
- Do not switch engines just for **taste**

### Migration
- Changing engines means **schema and code changes**, not just data

### Questions for every service
- **Versions** supported, and their retirement dates
- **High availability**: zone or region options
- **Backups**: retention and restore
- **Private access**: endpoints and firewall
- **Cost**: compute, storage and backup`,
  narration:
    "Not every application is built for SQL Server, and Azure treats PostgreSQL as a first-class managed service. Azure Database for PostgreSQL runs the open-source engine, with Azure operating the servers, backups and patching. You choose it for the PostgreSQL ecosystem: the extensions, the tooling, and the portability of an engine that runs anywhere. There is also a managed MySQL service. How should you choose between all of these? Let the application lead. If the code uses T-SQL and SQL Server features, look at Azure SQL. If it depends on PostgreSQL extensions, use PostgreSQL. Changing engines just for taste means schema and code changes, not just moving data. The table on the screen turns that into a lookup. The bottom card lists questions that apply to every managed relational service, and they are worth asking each time. Which versions are supported, and when do they retire? What high availability options exist, within a zone or across regions? How long are backups kept and how does restore work? And how do you reach the service privately? With the choice made, how does the application use it correctly?",
}
