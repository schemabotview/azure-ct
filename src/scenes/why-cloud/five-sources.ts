import type { Scene, SceneNode } from '@graphlearning/flow'

// The risk team's morning before the platform. The five sources and their times are the fixed
// example's (AZURE-COURSE-PLAN.md); the morning's timings are ILLUSTRATIVE and labelled so.
const source = (id: string, label: string, sub: string, icon: string): SceneNode => ({ id, label, sub, icon, pattern: 'external' })

export const fiveSources: Scene = {
  id: 'five-sources',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'by-hand',
      label: 'Five systems, joined by hand',
      bare: true,
      children: [
        {
          id: 'sources',
          label: 'Where the numbers live',
          icon: 'building',
          pattern: 'external',
          cols: 2,
          children: [
            source('tradebook', 'TradeBook', 'the deals · on-premises database', 'postgresql'),
            source('hierarchy', 'Hierarchy file', 'who owns whom · 18:00', 'file'),
            source('limits', 'Limits extract', 'each group’s limit · 18:30', 'file'),
            source('collateral', 'Collateral file', 'what is held, haircuts · 19:00', 'file'),
            source('feed', 'Market feed', 'FX rates and prices · all day', 'kafka'),
          ],
        },
        { id: 'sheet', label: 'One spreadsheet', sub: 'one analyst, one laptop', icon: 'table', pattern: 'service' },
        { id: 'report', label: 'Large exposures report', sub: 'due 07:00', icon: 'scroll', pattern: 'warn' },
      ],
      edges: [
        { source: 'sources', target: 'sheet', label: 'copied in by hand' },
        { source: 'sheet', target: 'report' },
      ],
    },
    {
      id: 'morning-side',
      label: 'The morning',
      bare: true,
      children: [
        {
          id: 'morning',
          kind: 'table',
          label: 'A typical morning (illustrative)',
          headers: ['time', 'step'],
          values: [
            ['06:00', 'export yesterday’s deals from TradeBook'],
            ['06:40', 'match deals to groups from the hierarchy file'],
            ['07:20', 'apply collateral and haircuts'],
            ['07:55', 'convert currencies, compare with limits'],
            ['08:15', 'build the report, check it by eye'],
            ['08:30', 'filed — 90 minutes late'],
          ],
        },
        {
          id: 'wrong',
          kind: 'list',
          icon: 'bell',
          label: 'What goes wrong',
          pattern: 'warn',
          items: [
            'Numbers are a day old before anyone reads them',
            'A company that changed owner is counted in the old group',
            'Nobody can re-run it and get the same answer',
            'If the analyst is ill, there is no report',
          ],
        },
        {
          id: 'must',
          kind: 'list',
          icon: 'circlecheck',
          label: 'What the platform must do',
          pattern: 'storage',
          items: [
            'Land every source, every day, in one place',
            'Keep the data inside the UK and the bank',
            'Compute exposure overnight, refresh it through the day',
            'Publish by 07:00: an API, alerts and a locked report',
          ],
        },
      ],
    },
  ],
  edges: [],
}
