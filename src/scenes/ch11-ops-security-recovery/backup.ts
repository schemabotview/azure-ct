import type { Scene } from '@graphlearning/flow'

// Ch11 §8 — backup is not high availability; native backups differ by service; an isolated,
// protected copy and a TESTED restore are what make a recovery claim credible.
export const backup: Scene = {
  id: 'ch11-backup',
  title: 'Backups you can trust',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'native',
      kind: 'table',
      label: 'Who backs up what',
      headers: ['Data', 'Mechanism', 'Restore gives'],
      values: [
        ['Virtual machine', 'Azure Backup', 'a recovery point'],
        ['Azure SQL', 'automated backups', 'point-in-time copy'],
        ['Blob data', 'versions, soft delete, backup', 'earlier blob state'],
        ['File share', 'share snapshots, backup', 'earlier files'],
      ],
    },
    {
      id: 'isolation',
      label: 'Make the copy hard to destroy',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'i1', label: 'Separate vault', sub: 'own access and subscription', pattern: 'storage', icon: 'recoveryvault' },
        { id: 'i2', label: 'Immutable', sub: 'cannot be deleted early', pattern: 'service', icon: 'lock' },
        { id: 'i3', label: 'Soft delete', sub: 'undo a deletion', pattern: 'network', icon: 'trash' },
      ],
    },
    {
      id: 'validation',
      label: 'A restore test, written down',
      pattern: 'user',
      cols: 2,
      children: [
        { id: 'r1', label: 'Restore to a new place', sub: 'never over production', pattern: 'user', icon: 'repeat' },
        { id: 'r2', label: 'Check the data', sub: 'and time the restore', pattern: 'user', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'native', target: 'isolation', label: 'protected by' },
    { source: 'isolation', target: 'validation', label: 'proved by' },
  ],
}
