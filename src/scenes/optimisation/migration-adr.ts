import type { Scene } from '@graphlearning/flow'

// Ch12 §6 — a migration plan with an explicit point of no return, and an architecture decision
// record that captures why. The record is Markdown; its content is illustrative.
export const migrationAdr: Scene = {
  id: 'migration-adr',
  title: 'A staged cutover and the record of why',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'phases',
      kind: 'table',
      label: 'Moving the order API',
      headers: ['Phase', 'What happens', 'Roll back?'],
      values: [
        ['1 Build', 'new stack runs beside the old', 'yes'],
        ['2 Shadow', 'copy of traffic, reconcile results', 'yes'],
        ['3 Canary', '5 % of real traffic', 'yes'],
        ['4 Cut over', 'new stack owns writes', 'only with a data plan'],
        ['5 Retire', 'old stack removed', 'no'],
      ],
    },
    {
      id: 'adr',
      kind: 'code',
      filename: 'adr/0007-orders-on-container-apps.md',
      label: `# ADR 0007: Run orders-api on Container Apps
Status: accepted · 2026-10-13
Context:  spiky traffic, an idle VM, a small team
Decision: Container Apps for the API; keep Azure SQL
Consequences: scale to zero; cold starts; new skills
Revisit when: steady load, or Kubernetes is needed`,
    },
  ],
  edges: [{ source: 'phases', target: 'adr', label: 'decided and recorded in' }],
}
