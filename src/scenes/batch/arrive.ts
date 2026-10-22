import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import trigger from '../../../spine/batch/04-arrive/project/adf/trigger/tr_collateral_arrives.json?raw'
import session from '../../../spine/batch/04-arrive/session.txt?raw'

// A storage event trigger subscribes Data Factory to the account's Event Grid events: it fires on
// BlobCreated for blobs whose path begins and ends with the patterns given (container and folder
// separated by /blobs/), ignores zero-byte blobs by default, and hands the pipeline
// @triggerBody().folderPath (which includes the container) and fileName. The subscription needs the
// Event Grid resource provider registered; behind a private endpoint, the account must let Event
// Grid through (trusted services or Event Grid private endpoints). Max 500 such triggers per account.
// source: https://learn.microsoft.com/en-us/azure/data-factory/how-to-create-event-trigger
// source: https://learn.microsoft.com/en-us/azure/event-grid/event-schema-blob-storage
export const arrive: Scene = mapFrame('files-arrive', [...BUILT_BY[7], 'shir', 'adf', 'eg'], {
  id: 'arrive-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'arrive-trigger', kind: 'code', filename: 'adf/trigger/tr_collateral_arrives.json', label: trigger.replace(/\n+$/, ''), show: [[4, 5], [8, 11], [13, 21]], highlight: [8, 9, 10, 11, 20, 21], pattern: 'network' },
    { id: 'arrive-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · a routing model', label: session.replace(/\n+$/, '') },
    {
      id: 'arrive-needs',
      kind: 'list',
      icon: 'eventgrid',
      label: 'What the trigger needs',
      pattern: 'network',
      items: [
        'Event Grid registered on the subscription',
        'The lake lets Event Grid through, though it is private',
        'Whoever publishes it may manage the lake’s events',
        'A file written whole: an event per completed file',
      ],
    },
  ],
})
