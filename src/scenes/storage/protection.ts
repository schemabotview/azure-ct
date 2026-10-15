import type { Scene } from '@graphlearning/flow'

// Ch6 §5 — a deletion timeline across versioning, soft delete and restore, tiers by age, and a
// lifecycle rule. Soft delete and versioning protect against mistakes, not against a determined
// attacker; immutable retention is the stronger control. Rule JSON trimmed to the fields taught.
export const protection: Scene = {
  id: 'protection',
  title: 'Tiers, versions and deleted blobs',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'events',
      kind: 'table',
      label: 'A blob over four days',
      headers: ['Day', 'What happens', 'What exists'],
      values: [
        ['0', 'uploaded', 'current version'],
        ['1', 'overwritten', 'new current, old kept as a version'],
        ['2', 'deleted', 'soft-deleted, recoverable'],
        ['3', 'undeleted', 'current version again'],
      ],
    },
    {
      id: 'rule',
      kind: 'code',
      filename: 'lifecycle rule (trimmed)',
      label: `"filters": { "prefixMatch": ["receipts/"] },
"actions": { "baseBlob": {
  "tierToCool":    { "daysAfterModificationGreaterThan": 30 },
  "tierToArchive": { "daysAfterModificationGreaterThan": 180 }
} }`,
    },
    {
      id: 'tiers',
      label: 'Access tiers',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'hot', label: 'Hot', sub: 'frequent access', pattern: 'warn', icon: 'zap' },
        { id: 'cool', label: 'Cool', sub: 'infrequent', pattern: 'network', icon: 'database' },
        { id: 'cold', label: 'Cold', sub: 'rare', pattern: 'service', icon: 'database' },
        { id: 'archive', label: 'Archive', sub: 'offline, slow', pattern: 'storage', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'events', target: 'rule', label: 'meanwhile, age moves data' },
    { source: 'rule', target: 'tiers', label: 'between' },
  ],
}
