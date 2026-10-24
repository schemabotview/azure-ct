import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { operateTree } from './tree'
import code from '../../../spine/operate/02-kql/project/kql/api_by_minute.kql?raw'
import session from '../../../spine/operate/02-kql/session.txt?raw'

// Log Analytics answers Kusto Query Language (KQL); workspace-based Application Insights writes
// requests to the AppRequests table (TimeGenerated, Name, ResultCode, DurationMs, Success,
// AppRoleInstance). The Kusto emulator (Azure Data Explorer's local container) runs the same
// language over a table created with that shape and loaded with a sample: it ingests nothing from
// Azure and evaluates no alerts. percentile() is an estimate, in Kusto and in Log Analytics.
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-query-overview
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/apprequests
// source: https://learn.microsoft.com/en-us/azure/data-explorer/kusto-emulator-overview
// source: https://learn.microsoft.com/en-us/kusto/query/percentiles-aggregation-function
export const kql: Scene = ideFrame(
  'kql-first-query',
  'risk-on-azure',
  operateTree('02', 'kql/api_by_minute.kql', ['kql/api_by_minute.kql', 'tools/kql.py'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'data', 'feeds', 'functions', 'infra', 'policies', 'sql', 'templates'], ['tools']),
  { file: 'kql/api_by_minute.kql', code, highlight: [4, 6, 7, 8, 9], pattern: 'service', terminal: session },
  {
    id: 'kql-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'kql-tables',
        kind: 'table',
        label: 'Where each signal lands',
        headers: ['table', 'holds'],
        values: [
          ['AppRequests', 'the API’s requests'],
          ['AppDependencies', 'its calls to the mart'],
          ['StorageBlobLogs', 'the lake’s reads, writes'],
          ['ADFPipelineRun', 'the factory’s runs'],
        ],
      },
      {
        id: 'kql-shape',
        kind: 'list',
        icon: 'funnel',
        label: 'A query reads top to bottom',
        pattern: 'service',
        items: [
          'Start from a table',
          'where: keep the rows',
          'summarize … by: one row a group',
          'order by: the result’s order',
        ],
      },
    ],
  },
)
