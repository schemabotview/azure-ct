import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { batchTree } from './tree'
import code from '../../../spine/batch/01-parts/project/adf/pipeline/copy_tradebook.json?raw'
import session from '../../../spine/batch/01-parts/session.txt?raw'

// Data Factory: a pipeline groups activities; an activity reads and writes datasets; a dataset
// names data within a linked service (a connection); a trigger starts pipeline runs; an integration
// runtime is the compute that moves the data (the Azure runtime, or a self-hosted one inside a
// private network). With git integration, each resource is one JSON file in its folder.
// source: https://learn.microsoft.com/en-us/azure/data-factory/concepts-pipelines-activities
// source: https://learn.microsoft.com/en-us/azure/data-factory/concepts-linked-services
// source: https://learn.microsoft.com/en-us/azure/data-factory/concepts-integration-runtime
// source: https://learn.microsoft.com/en-us/azure/data-factory/source-control
export const parts: Scene = ideFrame(
  'adf-parts',
  'risk-on-azure',
  batchTree('01', 'adf/pipeline/copy_tradebook.json', ['tools/adf_parts.py'], ['.github', 'budgets', 'data', 'infra', 'policies', 'templates', 'adf/dataset', 'adf/linkedService', 'adf/trigger'], ['tools']),
  { file: 'adf/pipeline/copy_tradebook.json', code, show: [[11, 12], [18, 25], [32, 33]], highlight: [12, 19, 23, 33], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'parts-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'adf-parts-table',
        kind: 'table',
        label: 'A factory’s parts',
        headers: ['part', 'is'],
        values: [
          ['trigger', 'when a pipeline runs'],
          ['pipeline', 'a sequence of activities'],
          ['activity', 'one step: copy, look up, run'],
          ['dataset', 'which data: a table, a folder'],
          ['linked service', 'a connection, and its sign-in'],
          ['runtime', 'the machines that move it'],
        ],
      },
      {
        id: 'adf-git',
        kind: 'list',
        icon: 'datafactory',
        label: 'Kept in git',
        pattern: 'service',
        items: [
          'One JSON file per part, in its folder',
          'Edited in the dev factory, saved to git',
          'Released by the pipeline (Course 6)',
          'Runs in production unchanged',
        ],
      },
    ],
  },
)
