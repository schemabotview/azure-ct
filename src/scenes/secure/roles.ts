import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { secureTree } from './tree'
import code from '../../../spine/secure/04-roles/project/policies/assignments.py?raw'
import session from '../../../spine/secure/04-roles/session.txt?raw'

// Azure RBAC: a role definition lists actions, notActions, dataActions and notDataActions; a role
// assignment binds a principal, a role and a scope; an assignment applies to the scope and every
// child scope (management group → subscription → resource group → resource). The answers in the
// terminal come from tools/access_check.py, a model of those rules over the built-in role
// definitions copied word for word from Microsoft's documentation (policies/roles/).
// source: https://learn.microsoft.com/en-us/azure/role-based-access-control/overview
// source: https://learn.microsoft.com/en-us/azure/role-based-access-control/scope-overview
// source: https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles
export const roles: Scene = ideFrame(
  'role-assignments',
  'risk-on-azure',
  secureTree('04', 'policies/assignments.py', ['policies/assignments.py', 'tools/access_check.py', 'tools/access_table.py'], ['budgets', 'infra', 'policies/roles']),
  { file: 'policies/assignments.py', code, show: [[2, 7], [14, 22]], highlight: [16, 17, 18], terminal: session, emulated: false },
  {
    id: 'roles-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'parts',
        kind: 'table',
        label: 'One assignment, three parts',
        headers: ['part', 'example'],
        values: [
          ['who', 'Risk Analysts (a group)'],
          ['role', 'Storage Blob Data Reader'],
          ['scope', 'the gold container'],
        ],
      },
      {
        id: 'scopes',
        kind: 'table',
        label: 'A role held here reaches down',
        headers: ['held at', 'reaches'],
        values: [
          ['management group', 'its subscriptions'],
          ['subscription', 'its groups'],
          ['resource group', 'its resources'],
          ['resource', 'its children'],
        ],
      },
      {
        id: 'rules',
        kind: 'list',
        icon: 'usercheck',
        label: 'Habits',
        pattern: 'user',
        items: ['Assign to groups, not people', 'The smallest scope that works', 'Built-in roles before custom ones'],
      },
    ],
  },
)
