import type { Section } from '../types'

export const relationalChoices: Section = {
  id: 'relational-choices',
  title: 'Relational choices',
  scene: 'relational-choices',
  narration:
    "Azure offers four ways to run a relational database, and the table at the top compares them. Azure S Q L Database runs the S Q L Server engine as a managed service: the bank manages only its data, high availability across zones is built in, and it can be restored to any point in time. S Q L Managed Instance is a whole S Q L Server instance, managed, for moving an existing instance with its agent jobs and cross database queries. S Q L Server on a virtual machine is the full product, for whatever needs the operating system, but then the bank patches it, backs it up and builds its own high availability. And Azure Database for PostgreSQL flexible server runs community PostgreSQL as a managed service, with a zone redundant standby and point in time restore. The table at the bottom left is why the mart uses PostgreSQL flexible server. TradeBook is already PostgreSQL, so the bank needs one skill set, not two. Reservations need serializable transactions, which PostgreSQL does well. A zone redundant standby and point in time restore are built in. Nothing in the mart needs S Q L Agent or instance level features, which rules out Managed Instance. And nothing needs the operating system, which rules out a virtual machine. The list on the right is what would change the answer. An existing S Q L Server estate, with its skills and licences, would point to Azure S Q L. A vendor product that depends on S Q L Agent would need Managed Instance. And a product that needs the operating system itself would need a virtual machine. Next, the mart itself.",
}
