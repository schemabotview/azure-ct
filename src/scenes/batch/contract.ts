import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { batchTree } from './tree'
import code from '../../../spine/batch/05-contract/project/tools/check_contract.py?raw'
import session from '../../../spine/batch/05-contract/session.txt?raw'

// load_landing_file compares the delivered file's columns (Get Metadata, structure) with the ones
// agreed and fails the run otherwise (a Fail activity); the full check, values included, is this
// script, which a later course runs in Databricks. Pure Python, run locally. The LEIs in the
// changed file are made up.
// source: https://learn.microsoft.com/en-us/azure/data-factory/control-flow-get-metadata-activity
// source: https://learn.microsoft.com/en-us/azure/data-factory/control-flow-fail-activity
export const contract: Scene = ideFrame(
  'file-contract',
  'risk-on-azure',
  batchTree('05', 'tools/check_contract.py', ['tools/check_contract.py', 'contracts/', 'data/hierarchy_20261014.csv'], ['.github', 'adf', 'budgets', 'infra', 'policies', 'templates'], ['tools']),
  { file: 'tools/check_contract.py', code, show: [[15, 15], [21, 32]], highlight: [15, 21, 23, 25, 29], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'contract-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'what-changed',
        kind: 'table',
        label: 'What changed on 14 October',
        headers: ['agreed', 'delivered'],
        values: [
          ['counterparty_id', 'cpty_id'],
          ['(nothing)', 'lei: a new column'],
          ['country: GB', 'country: GBR'],
        ],
      },
      {
        id: 'contract-rules',
        kind: 'list',
        icon: 'scroll',
        label: 'A file’s contract',
        pattern: 'service',
        items: [
          'Written down: columns, order, formats, key',
          'A file that breaks it is refused whole',
          'The source is told the same evening',
          'A change is agreed first, then a new version',
          'Never fixed silently in the pipeline',
        ],
      },
    ],
  },
)
