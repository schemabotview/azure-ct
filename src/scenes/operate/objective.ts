import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { operateTree } from './tree'
import code from '../../../spine/operate/04-alerts/project/templates/modules/alerts.bicep?raw'
import session from '../../../spine/operate/04-alerts/session.txt?raw'

// A log search alert rule (scheduledQueryRules) runs a KQL query on a schedule over a window and
// fires when the result crosses a threshold; an action group says who is told and how (email, SMS,
// voice, webhook). Severity runs from 0 (critical) to 4. September 2026's filing times are a
// model in tools/deadline_slo.py, not records. Error budget = (1 − objective) × days.
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-types#log-alerts
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups
// source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/scheduledqueryrules
export const objective: Scene = ideFrame(
  'deadline-objective',
  'risk-on-azure',
  operateTree('04', 'templates/modules/alerts.bicep', ['templates/modules/alerts.bicep', 'kql/nightly_late.kql', 'tools/deadline_slo.py'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'data', 'feeds', 'functions', 'infra', 'policies', 'sql'], ['templates', 'templates/modules', 'tools']),
  { file: 'templates/modules/alerts.bicep', code, show: [[29, 39], [46, 48]], highlight: [29, 32, 36, 39, 46], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'objective-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'objective-terms',
        kind: 'table',
        label: 'The deadline as an objective',
        headers: ['', 'here'],
        values: [
          ['indicator', 'filed by 07:00, each day'],
          ['objective', '95% of business days'],
          ['error budget', 'about one late day a month'],
          ['alert', 'no nightly success, 04:00 UTC'],
        ],
      },
      {
        id: 'objective-owner',
        kind: 'list',
        icon: 'bell',
        label: 'A page someone can act on',
        pattern: 'warn',
        items: [
          'Early: two hours to rerun',
          'One owner: the on-call engineer',
          'A runbook link in the alert',
          'Severity 1: phone, not just email',
        ],
      },
    ],
  },
)
