import type { Scene } from '@graphlearning/flow'

// Wide World Group: limit 10.0, net exposure 8.4 after the 13 October batch (the fixed example). A
// new deal booked at 15:30 in the day would take it past the limit, and the overnight copy would
// only show it the next morning. The 15:30 deal and its 2.00 are the course's illustration.
export const why: Scene = {
  id: 'why-stream',
  padding: 0.04,
  header: 'band',
  nodes: [
    {
      id: 'day',
      kind: 'table',
      label: 'Wide World Group on 14 October: limit 10.0, net 8.4 at 07:00',
      headers: ['time', 'what happens', 'the batch sees it', 'a stream sees it'],
      values: [
        ['09:00', 'GBP moves 1%: a sterling deal is worth more', '00:05 tomorrow', '09:00:02'],
        ['15:30', 'a 2.0 letter of credit booked: net 10.4', '00:05 tomorrow', '15:30:02'],
        ['15:31', 'over the limit; nobody knows', '07:00 report', 'an alert, 15:30:05'],
      ],
    },
    {
      id: 'stream-row',
      label: 'Batch and stream',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'batch-vs-stream',
          kind: 'table',
          label: 'Two ways in',
          headers: ['', 'batch (Course 8)', 'stream (this course)'],
          values: [
            ['unit', 'a file, a day’s window', 'one event'],
            ['delay', 'hours', 'seconds'],
            ['good for', 'the report of record', 'what changed just now'],
            ['complete?', 'yes, reconciled', 'eventually; checked by batch'],
          ],
        },
        {
          id: 'streams',
          kind: 'list',
          icon: 'eventhubs',
          label: 'The platform’s two streams',
          pattern: 'network',
          items: [
            'fx-rates: every rate change, all day',
            'deal-events: booked, amended, issued, closed',
            'Both feed the intraday exposure',
            'The 07:00 report still comes from the batch',
          ],
        },
      ],
    },
  ],
  edges: [],
}
