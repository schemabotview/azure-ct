import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { batchTree } from './tree'
import code from '../../../spine/batch/07-rerun/project/tools/rerun_window.py?raw'
import session from '../../../spine/batch/07-rerun/session.txt?raw'

// A tumbling window run can be rerun for its window; an activity retries by its policy. A load is
// idempotent when running it twice leaves the same result as once: each window writes one folder
// under fixed names, so a rerun replaces what a failed run left. Files are real (the emulator); the
// failure is raised on purpose.
// source: https://learn.microsoft.com/en-us/azure/data-factory/how-to-create-tumbling-window-trigger
// source: https://learn.microsoft.com/en-us/azure/data-factory/concepts-pipelines-activities#activity-policy
export const rerun: Scene = ideFrame(
  'rerun-window',
  'risk-on-azure',
  batchTree('07', 'tools/rerun_window.py', ['tools/rerun_window.py'], ['.github', 'adf', 'budgets', 'contracts', 'data', 'infra', 'policies', 'templates'], ['tools']),
  { file: 'tools/rerun_window.py', code, show: [[19, 26], [29, 36]], highlight: [22, 23, 24, 30, 31], pattern: 'service', terminal: session },
  {
    id: 'rerun-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'idempotent',
        kind: 'table',
        label: 'Run twice, same result',
        headers: ['writes', 'after a rerun'],
        values: [
          ['append, a file per run', 'duplicates'],
          ['one folder per window', 'replaced'],
          ['insert into a table', 'duplicates'],
          ['merge on the key', 'replaced'],
        ],
      },
      {
        id: 'retry-rules',
        kind: 'list',
        icon: 'history',
        label: 'Failing well',
        pattern: 'service',
        items: [
          'The copy retries twice, five minutes apart',
          'A failed window is rerun alone',
          'The next window waits (one at a time)',
          'Downstream reads only finished windows',
        ],
      },
    ],
  },
)
