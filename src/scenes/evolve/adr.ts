import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { evolveTree } from './tree'
import code from '../../../spine/evolve/07-adr/project/decisions/ADR-001-serving-store.md?raw'
import session from '../../../spine/evolve/07-adr/session.txt?raw'

// An architecture decision record: context, decision, consequences, kept with the code (the Azure
// Well-Architected Framework recommends one per significant decision). Cosmos DB transactional
// batch is limited to one logical partition of one container; Databricks SQL warehouses are built
// for analytical scans. The 100 ms target and every score are the team's, stated as such.
// source: https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record
// source: https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/transactional-batch
// source: https://learn.microsoft.com/en-us/azure/databricks/compute/sql-warehouse/
export const adr: Scene = ideFrame(
  'decision-record',
  'risk-on-azure',
  evolveTree('07', 'decisions/ADR-001-serving-store.md', ['decisions/ADR-001-serving-store.md', 'evolve/score_options.py'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'cost', 'data', 'feeds', 'functions', 'infra', 'kql', 'policies', 'sql', 'templates', 'tools'], ['evolve']),
  { file: 'decisions/ADR-001-serving-store.md', code, show: [[10, 25]], highlight: [11, 14, 22, 23], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'adr-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'adr-parts',
        kind: 'table',
        label: 'What a record holds',
        headers: ['part', 'here'],
        values: [
          ['context', '400 readers, reservations'],
          ['musts', 'filters: fail one, out'],
          ['wants', 'scores, with weights'],
          ['decision', 'PostgreSQL, 28 of 30'],
          ['revisit', 'when Singapore books'],
        ],
      },
      {
        id: 'adr-why',
        kind: 'list',
        icon: 'scroll',
        label: 'Why write it down',
        pattern: 'service',
        items: [
          'The next team can see why',
          'The scores can be argued',
          'It says when to decide again',
        ],
      },
    ],
  },
)
