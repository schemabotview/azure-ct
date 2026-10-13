import type { Course } from '../types'
import { objectFileAndBlockStorage } from './01-object-file-and-block-storage'
import { storageAccountsAndBlobs } from './02-storage-accounts-and-blobs'
import { storageAccessIdentitySasKeys } from './03-storage-access-identity-sas-keys'
import { blobConsistencyEtagsAndLeases } from './04-blob-consistency-etags-and-leases'
import { accessTiersVersioningAndImmutability } from './05-access-tiers-versioning-and-immutability'
import { azureFilesAndManagedDisks } from './06-azure-files-and-managed-disks'
import { redundancyFailoverAndRestore } from './07-redundancy-failover-and-restore'

// Chapter 6 of the Azure course (AZURE-COURSE-PLAN.md). Narration wavs are not yet produced.
export const ch06Storage: Course = {
  id: 'ch06-storage',
  title: 'Storage and Data Protection',
  sections: [
    objectFileAndBlockStorage,
    storageAccountsAndBlobs,
    storageAccessIdentitySasKeys,
    blobConsistencyEtagsAndLeases,
    accessTiersVersioningAndImmutability,
    azureFilesAndManagedDisks,
    redundancyFailoverAndRestore,
  ],
}
