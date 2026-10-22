import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { publishTree } from './tree'
import code from '../../../spine/publish/07-alerts/project/functions/breach_alert/function_app.py?raw'
import session from '../../../spine/publish/07-alerts/session.txt?raw'

// Azure Functions (Python v2 programming model): triggers and bindings are decorators; an Event Grid
// trigger receives events from a topic subscription, a Service Bus output binding sends a message.
// Flex Consumption: per-execution billing, scale to zero with optional always-ready instances,
// virtual network integration, identity-based connections (setting__fullyQualifiedNamespace). Here
// the handler's logic runs locally as the host would call it; the host itself is not run.
// source: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-python
// source: https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan
// source: https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-grid-trigger
// source: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference#configure-an-identity-based-connection
export const alerts: Scene = ideFrame(
  'breach-alerts',
  'risk-on-azure',
  publishTree('07', 'functions/breach_alert/function_app.py', ['functions/', 'tools/invoke_breach.py', 'templates/modules/functions.bicep'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'data', 'feeds', 'infra', 'policies', 'sql'], ['templates', 'templates/modules', 'tools']),
  { file: 'functions/breach_alert/function_app.py', code, show: [[7, 18]], highlight: [14, 15, 16, 18], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'alerts-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'fn-plans',
        kind: 'table',
        label: 'Where a function runs',
        headers: ['plan', 'fits'],
        values: [
          ['Flex Consumption (ours)', 'bursts, VNet, pay per run'],
          ['Premium', 'always warm, long runs'],
          ['Dedicated (App Service)', 'spare room on a plan'],
        ],
      },
      {
        id: 'alert-path',
        kind: 'list',
        icon: 'functions',
        label: 'From breach to officer',
        pattern: 'service',
        items: [
          'The intraday job sees net 10.40 > 10.00',
          'It publishes LimitBreached to Event Grid',
          'The function writes the officer’s message',
          'to Service Bus: kept until it is handled',
        ],
      },
    ],
  },
)
