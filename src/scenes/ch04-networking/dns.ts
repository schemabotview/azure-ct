import type { Scene } from '@graphlearning/flow'

// Ch4 §5 — public names for customers, private zones for in-VNet resolution. 203.0.113.0/24 is a
// documentation range, so these addresses are safe placeholders.
export const dns: Scene = {
  id: 'ch04-dns',
  title: 'From a name to an address',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'lookup',
      kind: 'code',
      filename: 'nslookup (from the internet)',
      label: `nslookup shop.contoso.com

shop.contoso.com
  canonical name = contoso-shop.azurewebsites.net
Address: 203.0.113.10`,
    },
    {
      id: 'public',
      label: 'Public DNS zone',
      sub: 'answers anyone',
      pattern: 'external',
      cols: 2,
      children: [
        { id: 'cname', label: 'CNAME', sub: 'shop to the app', pattern: 'external', icon: 'dns' },
        { id: 'txt', label: 'TXT record', sub: 'proves domain ownership', pattern: 'external', icon: 'shieldcheck' },
      ],
    },
    {
      id: 'private',
      label: 'Private DNS zone',
      sub: 'answers linked networks only',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'zone', label: 'privatelink zone', sub: 'for private endpoints', pattern: 'network', icon: 'privatelink' },
        { id: 'link', label: 'Network link', sub: 'which VNets can ask', pattern: 'network', icon: 'vnet' },
      ],
    },
  ],
  edges: [
    { source: 'lookup', target: 'public', label: 'answered by' },
    { source: 'public', target: 'private', label: 'inside the VNet, a different answer', dashed: true },
  ],
}
