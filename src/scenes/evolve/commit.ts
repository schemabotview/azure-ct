import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { evolveTree } from './tree'
import code from '../../../spine/evolve/04-commit/project/evolve/commitments.py?raw'
import session from '../../../spine/evolve/04-commit/session.txt?raw'

// Reservations commit to a resource type, Region and term (one or three years) for a discount;
// savings plans commit to an hourly spend on compute across services; both are paid whether used or
// not. Spot VMs use spare capacity at a discount and can be evicted. The discounts used here (35%,
// 25%) and every rate are HYPOTHETICAL. Break-even of a reservation = 1 − discount of the hours.
// source: https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations
// source: https://learn.microsoft.com/en-us/azure/cost-management-billing/savings-plan/savings-plan-compute-overview
// source: https://learn.microsoft.com/en-us/azure/virtual-machines/spot-vms
export const commit: Scene = ideFrame(
  'rightsizing',
  'risk-on-azure',
  evolveTree('04', 'evolve/commitments.py', ['evolve/commitments.py'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'cost', 'data', 'feeds', 'functions', 'infra', 'kql', 'policies', 'sql', 'templates', 'tools'], []),
  { file: 'evolve/commitments.py', code, show: [[4, 6], [10, 12], [16, 23]], highlight: [6, 10, 19, 21], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'commit-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'commit-kinds',
        kind: 'table',
        label: 'Ways to pay less',
        headers: ['', 'fits'],
        values: [
          ['stop it', 'idle hours'],
          ['reservation', 'one steady resource'],
          ['savings plan', 'steady spend, any VM'],
          ['Spot', 'work that may stop'],
        ],
      },
      {
        id: 'commit-order',
        kind: 'list',
        icon: 'scale',
        label: 'In this order',
        pattern: 'service',
        items: [
          'Remove what is idle',
          'Then size what is left',
          'Then commit to the steady part',
          'Spot for the night: done (Course 10)',
        ],
      },
    ],
  },
)
