import type { Section } from '../types'

// Ch11 §8. Reference: Azure Backup overview; Azure SQL automated backups; blob versioning and soft delete; Backup vault immutability.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the authoring
// environment) — re-check the claims below before publishing.
// Confirm per-service backup options and retention, and the immutability and multi-user authorisation features available in Backup vaults.
export const azureBackupAndRestoreValidation: Section = {
  id: 'azure-backup-and-restore-validation',
  title: 'Azure Backup, service-native backups, isolated copies and restore validation',
  scene: 'backup',
  focus: 'validation',
  slide: `## Backups you can trust

### Different data, different mechanism
- **VMs**: Azure Backup
- **Azure SQL**: automated backups
- **Blobs and files**: versions, soft delete, snapshots, backup

### Not the same as availability
- **High availability** keeps you running
- **Backup** brings back an **earlier state**

### Protect the copy
- A **separate vault** with its own access
- **Immutable** and **soft-deleted** retention
- Assume an attacker will **go for the backups**

### Validate
- **Restore to a new place**, never over production
- **Check the data** and **time** the restore
- Write the result **down**`,
  narration:
    "Backups are the last line of defence, and they are the control teams most often assume rather than test. The mechanism depends on the data. Virtual machines use Azure Backup. Azure SQL takes automated backups that support point-in-time restore. Blob data relies on versioning, soft delete and optional backup, and file shares use snapshots. All of these bring back an earlier state, which is different from high availability, which merely keeps you running and faithfully replicates a mistake. Next, protect the copy. A competent attacker, or a careless administrator, will look for the backups. So keep them in a separate vault with its own access, make them immutable so they cannot be deleted early, and use soft delete to undo a removal. And finally, the part that makes a recovery claim credible: validate it. Restore to a new location, never over production. Check the data is correct, and time how long the restore takes. Write the result down. A backup that has never been restored is a hope, not a control. With backups in place, we can set recovery targets.",
}
