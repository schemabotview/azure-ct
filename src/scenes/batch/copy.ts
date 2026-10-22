import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { batchTree } from './tree'
import code from '../../../spine/batch/03-copy/project/tools/copy_window.py?raw'
import session from '../../../spine/batch/03-copy/session.txt?raw'

// A tumbling window trigger fires for fixed, contiguous, non-overlapping windows and passes each
// window's start and end to the pipeline; a failed window can be rerun alone. Here TradeBook is a
// local PostgreSQL 16 database (real), and bronze is the storage emulator (Azurite).
// source: https://learn.microsoft.com/en-us/azure/data-factory/how-to-create-tumbling-window-trigger
// source: https://learn.microsoft.com/en-us/azure/data-factory/tutorial-incremental-copy-overview
// source: https://learn.microsoft.com/en-us/azure/data-factory/connector-postgresql
export const copy: Scene = ideFrame(
  'copy-tradebook',
  'risk-on-azure',
  batchTree('03', 'tools/copy_window.py', ['tools/copy_window.py', 'data/tradebook.sql', 'data/tradebook_20261013.sql'], ['.github', 'adf', 'budgets', 'infra', 'policies', 'templates'], ['tools']),
  { file: 'tools/copy_window.py', code, show: [[19, 24], [26, 29], [34, 38]], highlight: [19, 22, 27, 37], pattern: 'service', terminal: session },
  {
    id: 'copy-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'windows',
        kind: 'table',
        label: 'One window a day',
        headers: ['window', 'rows', 'why'],
        values: [
          ['to 13 Oct', '10', 'the first load'],
          ['13 Oct', '2', 'LC-2041 new, LC-1995 1.50'],
          ['not seen', '1', 'LC-2007, deleted'],
        ],
      },
      {
        id: 'watermark',
        kind: 'list',
        icon: 'clock',
        label: 'A watermark by window',
        pattern: 'service',
        items: [
          'The trigger hands each run its window',
          'The query takes rows changed inside it',
          'Each window writes its own folder',
          'A failed window reruns alone',
          'A deleted row changes nothing: no row',
        ],
      },
    ],
  },
)
