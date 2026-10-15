import type { Scene } from '@graphlearning/flow'

// Ch4 §6 — TLS is per connection. A front end terminates the client's connection and opens a new
// one to the origin; each leg has its own certificate check.
export const tls: Scene = {
  id: 'tls',
  title: 'Encryption hop by hop',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'hops',
      kind: 'table',
      label: 'Three connections, three certificate checks',
      headers: ['Hop', 'Encrypted', 'Name checked'],
      values: [
        ['Browser to front end', 'yes', 'shop.contoso.com'],
        ['Front end to app', 'yes, re-encrypted', 'the origin hostname'],
        ['App to database', 'yes', 'the server name'],
      ],
    },
    {
      id: 'checks',
      label: 'What a client checks',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'name', label: 'Name matches', sub: 'the host you asked for', pattern: 'user', icon: 'shieldcheck' },
        { id: 'chain', label: 'Chain trusted', sub: 'issued by a known CA', pattern: 'network', icon: 'link' },
        { id: 'expiry', label: 'Not expired', sub: 'someone must renew', pattern: 'warn', icon: 'clock' },
      ],
    },
    { id: 'store', label: 'Certificate home', sub: 'managed, or in Key Vault', pattern: 'storage', icon: 'keyvault' },
  ],
  edges: [
    { source: 'hops', target: 'checks', label: 'each hop does' },
    { source: 'checks', target: 'store', label: 'certificates kept in' },
  ],
}
