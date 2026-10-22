import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/transform/06-orchestrate/project/adf/pipeline/nightly.json?raw'

// Data Factory's Databricks Job activity runs an existing Databricks job (by job id, with job
// parameters) and waits for it; the linked service can authenticate with the factory's managed
// identity, which must be added to the workspace with permission to run the job. Databricks jobs
// also have their own scheduler and triggers (file arrival, table update, continuous).
// source: https://learn.microsoft.com/en-us/azure/data-factory/transform-data-databricks-job
// source: https://learn.microsoft.com/en-us/azure/databricks/jobs/triggers
export const orchestrate: Scene = mapFrame('who-starts-the-job', BUILT_BY[10], {
  id: 'orchestrate-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'nightly-code', kind: 'code', filename: 'adf/pipeline/nightly.json', label: code.replace(/\n+$/, ''), show: [[11, 12], [26, 34], [40, 42]], highlight: [12, 27, 29, 32, 41], pattern: 'service' },
    {
      id: 'scheduler-choice',
      kind: 'table',
      label: 'Who starts the exposure job',
      headers: ['', 'Data Factory', 'Databricks jobs'],
      values: [
        ['waits for', 'TradeBook copy, files', 'a schedule, a file, a table'],
        ['sees', 'the whole night', 'Databricks only'],
        ['the platform uses it for', 'the night', 'the intraday stream job'],
      ],
    },
  ],
})
