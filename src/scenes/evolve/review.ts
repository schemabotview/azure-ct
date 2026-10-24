import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { evolveTree } from './tree'
import code from '../../../spine/evolve/09-review/project/evolve/priorities.py?raw'
import session from '../../../spine/evolve/09-review/session.txt?raw'

// The Azure Well-Architected Framework's five pillars: Reliability, Security, Cost Optimization,
// Operational Excellence, Performance Efficiency; the Well-Architected Review assesses a workload
// against them. Values and efforts are the team's judgement; every finding points at a frame.
// source: https://learn.microsoft.com/en-us/azure/well-architected/pillars
// source: https://learn.microsoft.com/en-us/assessments/azure-architecture-review/
export const review: Scene = ideFrame(
  'well-architected-review',
  'risk-on-azure',
  evolveTree('09', 'evolve/priorities.py', ['evolve/priorities.py'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'cost', 'data', 'decisions', 'feeds', 'functions', 'infra', 'kql', 'policies', 'sql', 'templates', 'tools'], ['evolve']),
  { file: 'evolve/priorities.py', code, highlight: [5, 6, 9, 15], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'review-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'evidence',
        kind: 'table',
        label: 'Evidence, pillar by pillar',
        headers: ['pillar', 'evidence'],
        values: [
          ['Reliability', 'restore drill; RPO table'],
          ['Security', 'Activity Log; leaked token'],
          ['Cost', 'cost by owner; commitments'],
          ['Operations', 'the 04:00 alert; runbook'],
          ['Performance', '30 nights, by stage'],
        ],
      },
      {
        id: 'review-next',
        kind: 'list',
        icon: 'sortarrows',
        label: 'What happens to the list',
        pattern: 'service',
        items: [
          'The top four: this month',
          'Each gets an owner and a date',
          'Review again in a quarter',
        ],
      },
    ],
  },
)
