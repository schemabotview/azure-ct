import type { Section } from '../types'

// Ch7 §2. Reference: Azure SQL documentation: choose the right deployment option.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm current service names, feature parity, and the supported options for each (including hyperscale and serverless tiers).
export const azureSqlManagedInstanceAndVm: Section = {
  id: 'azure-sql-managed-instance-and-vm',
  title: 'Azure SQL Database, SQL Managed Instance and SQL Server on VMs',
  scene: 'ch07-sql-family',
  focus: 'compare',
  slide: `## Three ways to run SQL

### Azure SQL Database
- A **managed database** for new cloud applications
- Azure handles **patching, backups and availability**

### SQL Managed Instance
- A managed **instance** with high SQL Server compatibility
- Suits **migrations** that need instance-level features
- Lives inside your **virtual network**

### SQL Server on a VM
- **Full control** of the OS and the engine
- You own **patching, backups and HA**

### Cost
- You pay for **compute and storage**
- **Reserved capacity** can lower the price

### Choosing
- Prefer the **most managed** option that is compatible
- Move down only for a **named requirement**`,
  narration:
    "Microsoft offers the SQL Server engine in three forms on Azure, ordered by how much you manage. Azure SQL Database is a fully managed database. Azure patches the engine, takes backups and provides availability, and you manage the schema and the queries. It is the natural home for a new cloud application, and new features usually arrive there first. SQL Managed Instance is a managed instance with very high compatibility with on-premises SQL Server, including features that work at the instance level. It suits migrations of existing applications, and it lives inside your virtual network. SQL Server on a virtual machine hands you full control of the operating system and the engine, and with it responsibility for patching, backups and high availability. The decision rule is simple: prefer the most managed option that is compatible with what the application needs, and move toward more control only for a named requirement, such as a feature the managed options do not offer. You pay for compute and storage, and reserving capacity can lower the price. The table shows the trade. The same selection thinking applies to open-source engines.",
}
