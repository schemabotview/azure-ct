import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { evolveTree } from './tree'
import code from '../../../spine/evolve/03-cost/project/evolve/cost_by_tag.py?raw'
import session from '../../../spine/evolve/03-cost/session.txt?raw'

// Cost Management shows costs at a scope (billing account, management group, subscription,
// resource group) and groups them by tag; resources do not inherit their resource group's tags
// (the built-in policy "Inherit a tag from the resource group if missing" adds them). A budget
// alerts, it never stops spending. The month's figures are the course's HYPOTHETICAL rates.
// source: https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/understand-work-scopes
// source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources
// source: https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/enable-tag-inheritance
// source: https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets
export const cost: Scene = ideFrame(
  'cost-by-owner',
  'risk-on-azure',
  evolveTree('03', 'evolve/cost_by_tag.py', ['evolve/cost_by_tag.py', 'cost/risk-prod-202610.csv'], ['.github', 'adf', 'app', 'budgets', 'contracts', 'data', 'feeds', 'functions', 'infra', 'kql', 'policies', 'sql', 'templates', 'tools'], []),
  { file: 'evolve/cost_by_tag.py', code, show: [[7, 18]], highlight: [7, 13, 16], pattern: 'service', terminal: session, emulated: false },
  {
    id: 'cost-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'cost-scopes',
        kind: 'table',
        label: 'Who looks where',
        headers: ['scope', 'who'],
        values: [
          ['billing account', 'the bank’s finance'],
          ['subscription', 'the platform team'],
          ['tag owner=…', 'each team, its share'],
        ],
      },
      {
        id: 'tag-fix',
        kind: 'list',
        icon: 'tag',
        label: 'Closing the untagged 2%',
        pattern: 'service',
        items: [
          'Tags are not inherited by default',
          'Policy: inherit from the group',
          'Bicep: one tags object, everywhere',
          'A budget alerts; it never stops',
        ],
      },
    ],
  },
)
