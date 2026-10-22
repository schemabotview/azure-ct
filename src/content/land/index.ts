import type { Course } from '../types'
import { objectFileAndBlock } from './01-object-file-and-block'
import { theLakeAccount } from './02-the-lake-account'
import { whoMayWriteAFile } from './03-who-may-write-a-file'
import { twoWritersOneFile } from './04-two-writers-one-file'
import { versionsSoftDeleteAndLifecycle } from './05-versions-soft-delete-and-lifecycle'
import { reportsNobodyCanChange } from './06-reports-nobody-can-change'
import { filesAndDisks } from './07-files-and-disks'
import { redundancyAndRestore } from './08-redundancy-and-restore'

// Course 7 — Land the files. Storage kinds, the lake and its zones, who may write, conditional
// writes and leases, tiers and recovery without versions, locked reports, a share and disks,
// redundancy.
export const land: Course = {
  id: 'land',
  title: 'Land the files',
  sections: [
    objectFileAndBlock,
    theLakeAccount,
    whoMayWriteAFile,
    twoWritersOneFile,
    versionsSoftDeleteAndLifecycle,
    reportsNobodyCanChange,
    filesAndDisks,
    redundancyAndRestore,
  ],
}
