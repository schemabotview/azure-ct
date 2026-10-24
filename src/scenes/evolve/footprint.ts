import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { evolveTree } from './tree'
import code from '../../../spine/evolve/05-footprint/project/evolve/footprint.py?raw'
import session from '../../../spine/evolve/05-footprint/session.txt?raw'

// The Well-Architected sustainability guidance: use less compute, keep less data, move less data.
// Carbon per subscription comes from the Emissions Impact Dashboard (Microsoft's own calculation);
// this frame uses proxies on purpose and makes no carbon claim. Log Analytics keeps data
// interactive for a set period and then in long-term (archive) retention at a lower cost.
// source: https://learn.microsoft.com/en-us/azure/well-architected/sustainability/sustainability-design-methodology
// source: https://learn.microsoft.com/en-us/power-bi/connect-data/service-connect-to-emissions-impact-dashboard
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/data-retention-configure
export const footprint: Scene = ideFrame(
  'sustainability-proxies',
  'risk-on-azure',
  evolveTree('05', 'evolve/footprint.py', ['evolve/footprint.py'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'cost', 'data', 'feeds', 'functions', 'infra', 'kql', 'policies', 'sql', 'templates', 'tools'], []),
  { file: 'evolve/footprint.py', code, highlight: [6, 8, 10, 16], pattern: 'storage', terminal: session, emulated: false },
  {
    id: 'footprint-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'levers',
        kind: 'table',
        label: 'The levers, and their price',
        headers: ['lever', 'costs'],
        values: [
          ['fewer VM hours', 'a schedule to keep'],
          ['shorter search window', 'old logs: slower'],
          ['cache at the edge', 'nothing: files fixed'],
          ['keep the standby', 'not pulled: the RTO'],
        ],
      },
      {
        id: 'proxy-honest',
        kind: 'list',
        icon: 'tree',
        label: 'Proxies, not carbon',
        pattern: 'storage',
        items: [
          'Hours, GB kept, GB moved',
          'Carbon: the Emissions dashboard',
          'Never at the cost of the deadline',
        ],
      },
    ],
  },
)
