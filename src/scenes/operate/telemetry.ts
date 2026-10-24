import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'

// Azure Monitor collects metrics (numeric time series; platform metrics kept 93 days), logs (records
// in a Log Analytics workspace: 30 days of interactive retention by default, up to two years, and
// up to 12 years in total) and traces (Application Insights, workspace-based: requests and
// dependencies sharing one operation ID). The Activity Log is kept 90 days. The 08:10 failover is
// the sample in data/app_requests_20261015.csv (Course 13, section 2); the trace's span timings
// are illustrative.
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/data-platform-metrics
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/data-retention-configure
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/app/distributed-trace-data
// source: https://learn.microsoft.com/en-us/azure/azure-monitor/platform/activity-log
export const telemetry: Scene = mapFrame('telemetry-correlation', [...BUILT_BY[12], 'monitor'], {
  id: 'telemetry-pane',
  label: 'side',
  bare: true,
  children: [
    {
      id: 'three-views',
      kind: 'table',
      label: '15 October, 08:10: the mart fails over, seen three ways',
      headers: ['signal', 'what it says', 'answers'],
      values: [
        ['metric', 'failed requests 0 → 7 a minute; p95 58 → 3,918 ms', 'is something wrong?'],
        ['log', 'one row per request: 500 and 503, on app-1 and app-3', 'what, where, how often?'],
        ['trace', 'one request: 3.9 s, nearly all waiting for the mart', 'where did the time go?'],
      ],
    },
    {
      id: 'tele-row',
      label: 'Using them together',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'joining',
          kind: 'list',
          icon: 'link',
          label: 'Joining them up',
          pattern: 'service',
          items: [
            'One operation ID on every log row and span',
            'One clock: UTC everywhere',
            'One resource ID names the part',
            'One workspace holds the logs',
          ],
        },
        {
          id: 'retention',
          kind: 'table',
          label: 'How long each is kept',
          headers: ['', 'kept'],
          values: [
            ['platform metrics', '93 days'],
            ['workspace logs', '90 days here, then archived'],
            ['Activity Log', '90 days'],
          ],
        },
      ],
    },
  ],
})
