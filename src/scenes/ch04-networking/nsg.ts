import type { Scene } from '@graphlearning/flow'

// Ch4 §4 — an NSG is an ordered list of allow/deny rules, lowest priority number first, stateful.
// The three default inbound rules are shown last because custom rules sit above them.
export const nsg: Scene = {
  id: 'ch04-nsg',
  title: 'Rules on a subnet',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'rules',
      kind: 'table',
      label: 'nsg-web, inbound',
      headers: ['Priority', 'Name', 'Port', 'Source', 'Action'],
      values: [
        ['100', 'AllowHttps', '443', 'Internet', 'Allow'],
        ['200', 'DenyAdmin', '3389', 'Internet', 'Deny'],
        ['65000', 'AllowVnetInBound', 'any', 'VirtualNetwork', 'Allow'],
        ['65500', 'DenyAllInBound', 'any', 'any', 'Deny'],
      ],
    },
    {
      id: 'how',
      label: 'How it applies',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'attach', label: 'Attached to', sub: 'a subnet or a NIC', pattern: 'network', icon: 'subnet' },
        { id: 'stateful', label: 'Stateful', sub: 'replies allowed', pattern: 'service', icon: 'repeat' },
        { id: 'first', label: 'First match wins', sub: 'lowest number first', pattern: 'warn', icon: 'funnel' },
      ],
    },
  ],
  edges: [{ source: 'rules', target: 'how', label: 'evaluated' }],
}
