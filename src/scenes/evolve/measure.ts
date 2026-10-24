import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { evolveTree } from './tree'
import code from '../../../spine/evolve/01-measure/project/evolve/stages.py?raw'
import session from '../../../spine/evolve/01-measure/session.txt?raw'

// Data Factory keeps activity run durations and Databricks keeps job task durations (their run
// histories, and ADFActivityRun in Log Analytics); the 30 nights in data/night_runs_202609.csv are
// a model's numbers in that shape, not records. Median and 95th percentile per stage, with
// statistics.quantiles (n=20, exclusive method).
// source: https://learn.microsoft.com/en-us/azure/data-factory/monitor-visually
// source: https://docs.python.org/3/library/statistics.html#statistics.quantiles
export const measure: Scene = ideFrame(
  'measure-first',
  'risk-on-azure',
  evolveTree('01', 'evolve/stages.py', ['evolve/stages.py', 'data/night_runs_202609.csv'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'feeds', 'functions', 'infra', 'kql', 'policies', 'sql', 'templates', 'tools'], ['data']),
  { file: 'evolve/stages.py', code, show: [[8, 11], [18, 26]], highlight: [10, 23, 25], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'measure-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'two-answers',
        kind: 'table',
        label: 'Two different questions',
        headers: ['question', 'answer'],
        values: [
          ['what is a night made of?', 'silver, 31 min'],
          ['what makes it late?', 'the copy: 9 → 37'],
        ],
      },
      {
        id: 'measure-rules',
        kind: 'list',
        icon: 'gauge',
        label: 'Before tuning anything',
        pattern: 'service',
        items: [
          'Measure every stage, many nights',
          'Look at the tail, not the mean',
          'Tune what moves the deadline',
          'Measure again afterwards',
        ],
      },
    ],
  },
)
