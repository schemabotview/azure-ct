import type { Scene } from '@graphlearning/flow'

// What each reader of the platform's results asks of a store. Latency and rates are the course's
// working assumptions for the bank, not measurements.
export const needs: Scene = {
  id: 'who-needs-what',
  padding: 0.04,
  header: 'band',
  nodes: [
    {
      id: 'readers',
      kind: 'table',
      label: 'Three readers, three different asks',
      headers: ['reader', 'asks', 'how often', 'needs from a store'],
      values: [
        ['the exposure API (dealers)', 'Wide World’s headroom, now', 'hundreds a second', 'one row by key, in milliseconds'],
        ['', 'reserve 1.0 of it', 'a few a minute', 'a transaction that cannot overbook'],
        ['the risk team (Power BI)', 'exposure by group, country, day', 'all day', 'SQL: joins, sums, history'],
        ['the regulator', 'the 07:00 large exposures file', 'once a day', 'complete, dated, unchangeable'],
      ],
    },
    {
      id: 'stores-row',
      label: 'So, three stores',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'stores',
          kind: 'table',
          label: 'Which store answers which ask',
          headers: ['store', 'answers', 'because'],
          values: [
            ['risk mart: PostgreSQL', 'headroom, reservations, reports', 'transactions and SQL'],
            ['group lookup: Cosmos DB', 'a group and its members', 'one key, any scale'],
            ['cache: Redis', 'the dashboard’s headroom', 'fast; may be seconds old'],
            ['locked reports (Course 7)', 'the regulator’s file', 'nobody can change it'],
          ],
        },
        {
          id: 'serve-rule',
          kind: 'list',
          icon: 'postgres',
          label: 'One rule above the rest',
          pattern: 'storage',
          items: [
            'A decision reads the mart, never the cache',
            'A copy says how old it may be',
            'Gold stays the source: every store reloads from it',
          ],
        },
      ],
    },
  ],
  edges: [],
}
