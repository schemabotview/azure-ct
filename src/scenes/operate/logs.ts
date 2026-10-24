import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { operateTree } from './tree'
import code from '../../../spine/operate/03-logs/project/templates/modules/monitoring.bicep?raw'
import session from '../../../spine/operate/03-logs/session.txt?raw'

// Resource logs are not collected until a diagnostic setting sends them somewhere (a Log Analytics
// workspace, a storage account, an event hub); categories and category groups (audit, allLogs)
// choose what. Storage logs are set on each service (blobServices). 'Dedicated' sends Data Factory's
// logs to resource-specific tables (ADFPipelineRun). The Activity Log records control-plane writes
// and deletes (caller, time, operation, source IP) for 90 days; PIM activations appear as role
// assignments made by MS-PIM. The records in data/activity_20261016.json are EXAMPLES with invented
// values, in the Activity Log's export shape.
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/monitor-blob-storage
// source: https://learn.microsoft.com/en-us/azure/data-factory/monitor-configure-diagnostics
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/platform/activity-log-schema
export const logs: Scene = ideFrame(
  'diagnostic-logs',
  'risk-on-azure',
  operateTree('03', 'templates/modules/monitoring.bicep', ['templates/modules/monitoring.bicep', 'tools/who_changed.py', 'data/activity_20261016.json'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'feeds', 'functions', 'infra', 'kql', 'policies', 'sql'], ['data', 'templates', 'templates/modules', 'tools']),
  { file: 'templates/modules/monitoring.bicep', code, show: [[50, 57], [63, 67]], highlight: [50, 54, 55, 56, 66, 67], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'logs-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'logs-sent',
        kind: 'table',
        label: 'What is sent to the workspace',
        headers: ['from', 'logs'],
        values: [
          ['kv-wg-risk-prod', 'audit: every secret read'],
          ['stwgriskprod', 'blob reads, writes, deletes'],
          ['adf-wg-risk-prod', 'every pipeline run'],
          ['subscription', 'Activity Log: changes'],
        ],
      },
      {
        id: 'logs-told',
        kind: 'list',
        icon: 'search',
        label: 'What the Activity Log told',
        pattern: 'network',
        items: [
          'jo activated Owner for an hour',
          'six minutes later, a rule: 443 from anywhere',
          'priya removed it next morning',
          'reads are not changes: left out',
        ],
      },
    ],
  },
)
