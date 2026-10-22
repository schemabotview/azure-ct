import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/publish/04-release/project/infra/12-release.sh?raw'

// Deployment slots: a staging slot is a live app with its own host name; swapping warms the target
// instances, then switches routing, so production gets the new release without a cold start, and a
// second swap rolls back. App Service autoscale rules add or remove instances by a metric (CPU) with
// a cooldown; scale up changes the plan's SKU. Application logs written to stdout are collected and
// can be sent to Log Analytics through diagnostic settings (Course 13).
// source: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/autoscale/autoscale-get-started
// source: https://learn.microsoft.com/en-us/azure/app-service/manage-scale-up
export const release: Scene = mapFrame('logs-scale-slots', [...BUILT_BY[11], 'app'], {
  id: 'release-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'release-script', kind: 'code', filename: 'infra/12-release.sh', label: code.replace(/\n+$/, ''), highlight: [10, 12, 14, 15], pattern: 'service' },
    {
      id: 'scale-ways',
      kind: 'table',
      label: 'Scale, two ways',
      headers: ['', 'up', 'out'],
      values: [
        ['changes', 'the plan’s size: P1v3 → P2v3', 'the instance count'],
        ['the API', 'by hand, rarely', 'autoscale: 3 to 10'],
        ['rule', '—', '+1 above 70% CPU for 10 min'],
        ['', '', '−1 below 30%; 10 min cooldown'],
      ],
    },
    {
      id: 'health-logs',
      kind: 'table',
      label: 'Health and logs',
      headers: ['setting', 'does'],
      values: [
        ['healthCheckPath /health', 'drops a failing instance'],
        ['stdout', 'one line per request, collected'],
        ['staging slot', 'warms before the swap'],
        ['swap again', 'the rollback'],
      ],
    },
  ],
})
