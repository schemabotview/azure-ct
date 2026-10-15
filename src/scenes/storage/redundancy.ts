import type { Scene } from '@graphlearning/flow'

// Ch6 §7 — replication protects against hardware and site loss, NOT against deletion, corruption or
// compromise (replicas copy those). Asynchronous geo-replication can lose recent writes. Durability
// figures are omitted on purpose; verify current SLAs for the chosen account type before quoting.
export const redundancy: Scene = {
  id: 'redundancy',
  title: 'Redundancy is not recovery',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'options',
      kind: 'table',
      label: 'Where the copies live',
      headers: ['Option', 'Copies', 'Survives'],
      values: [
        ['LRS', '3, one datacentre', 'disk and rack failure'],
        ['ZRS', '3, across zones', 'a zone failure'],
        ['GRS', 'LRS + async copy far away', 'a regional loss, maybe with data loss'],
        ['GZRS', 'ZRS + async copy far away', 'zone and regional loss'],
      ],
    },
    {
      id: 'threats',
      label: 'Which control answers which threat',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'hw', label: 'Hardware or site loss', sub: 'redundancy', pattern: 'network', icon: 'server' },
        { id: 'oops', label: 'Deletion or overwrite', sub: 'versions, soft delete', pattern: 'service', icon: 'trash' },
        { id: 'attack', label: 'Corruption or attack', sub: 'immutable, isolated copy', pattern: 'warn', icon: 'shieldcheck' },
        { id: 'restore', label: 'Proven recovery', sub: 'a tested restore', pattern: 'storage', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'options', target: 'threats', label: 'copies do not cover' }],
}
