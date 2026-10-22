import type { Scene, SceneNode } from '@graphlearning/flow'

// The whole domain on one worked example (AZURE-COURSE-PLAN.md, the fixed example). Wide World Group:
// open letters of credit 3.0 + 2.5 + 2.0 = 7.5, plus the new LC-2041 2.0 = 9.5 gross. Collateral:
// cash 0.5 at a 0% haircut + warehouse goods 1.0 at 40% (counted 0.6) = 1.1. Net 9.5 − 1.1 = 8.4,
// within the 10.0 limit (headroom 1.6), above 10% of the bank's 80.0 capital (8.0) — so it is on the
// large exposures report. USD millions throughout.
const deal = (id: string, label: string, fresh = false): SceneNode => ({
  id, label, variant: 'chip', icon: 'scroll', pattern: fresh ? 'warn' : 'service',
})

export const riskQuestion: Scene = {
  id: 'risk-question',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'hierarchy-side',
      label: 'Who owes the bank',
      bare: true,
      children: [
        {
          id: 'ww-group',
          label: 'Wide World Group',
          sub: 'a group · limit USD 10.0m',
          icon: 'building',
          pattern: 'user',
          cols: 2,
          align: 'start',
          children: [
            {
              id: 'wwi',
              label: 'Wide World Importers (UK)',
              sub: 'a counterparty',
              icon: 'none',
              pattern: 'user',
              cols: 1,
              children: [deal('lc-1987', 'LC-1987 · 3.0'), deal('lc-2011', 'LC-2011 · 2.0'), deal('lc-2041', 'LC-2041 · 2.0 new', true)],
            },
            {
              id: 'wwl',
              label: 'Wide World Logistics (SG)',
              sub: 'a counterparty',
              icon: 'none',
              pattern: 'user',
              cols: 1,
              children: [deal('lc-2003', 'LC-2003 · 2.5')],
            },
          ],
        },
        {
          id: 'collateral',
          kind: 'table',
          label: 'Collateral the bank holds',
          headers: ['item', 'value', 'haircut', 'counted'],
          values: [
            ['cash deposit', '0.5', '0%', '0.5'],
            ['warehouse goods', '1.0', '40%', '0.6'],
            ['total', '', '', '1.1'],
          ],
        },
      ],
    },
    {
      id: 'sums',
      label: 'How much could be lost',
      bare: true,
      children: [
        {
          id: 'exposure',
          kind: 'table',
          label: 'Wide World Group, USD m',
          headers: ['', 'amount'],
          values: [
            ['open letters of credit', '7.5'],
            ['+ new LC-2041', '2.0'],
            ['= gross exposure', '9.5'],
            ['− collateral after haircuts', '1.1'],
            ['= net exposure', '8.4'],
            ['limit', '10.0'],
            ['headroom', '1.6'],
          ],
        },
        {
          id: 'report-check',
          kind: 'table',
          label: 'The large exposures report',
          headers: ['', 'USD m'],
          values: [
            ['the bank’s capital', '80.0'],
            ['10% of it: the threshold', '8.0'],
            ['Wide World’s net exposure', '8.4 → reported'],
          ],
        },
      ],
    },
    {
      id: 'words-side',
      label: 'Words and movement',
      bare: true,
      children: [
        {
          id: 'words',
          kind: 'table',
          label: 'Ten words, the whole vocabulary',
          headers: ['word', 'in plain words'],
          values: [
            ['counterparty', 'a company that owes the bank'],
            ['group', 'companies with one owner'],
            ['letter of credit', 'the bank’s promise to pay a supplier'],
            ['exposure', 'what the bank could lose'],
            ['collateral', 'what the bank holds in case'],
            ['haircut', 'the cut taken off collateral'],
            ['limit', 'the most exposure a group may have'],
            ['breach', 'exposure over the limit'],
            ['capital', 'the bank’s own money'],
            ['large exposures report', 'every group over 10% of capital'],
          ],
        },
        {
          id: 'moves',
          kind: 'list',
          icon: 'history',
          label: 'What moves the number, even overnight',
          pattern: 'warn',
          items: [
            'A new deal raises it; a repayment lowers it',
            'Prices and currency rates change what collateral is worth',
            'A company bought by another group moves its deals there',
            'So the answer has to be recomputed every day',
          ],
        },
      ],
    },
  ],
  edges: [],
}
