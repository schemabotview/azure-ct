import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/land/07-share/project/templates/modules/share.bicep?raw'

// Azure Files serves SMB shares (port 445); with Microsoft Entra Kerberos, hybrid identities (bank
// accounts synced from AD DS) sign in with their own credentials, a storage account uses one identity
// source, share-level access comes from RBAC roles (Storage File Data SMB Share Reader/Contributor)
// and Windows ACLs apply below it. Managed disks: Premium SSD for the runtime VMs' OS disks; a
// zone-redundant disk (ZRS) exists for some types; snapshots copy a disk at a point in time.
// source: https://learn.microsoft.com/en-us/azure/storage/files/storage-files-identity-auth-hybrid-identities-enable
// source: https://learn.microsoft.com/en-us/azure/storage/files/storage-files-identity-assign-share-level-permissions
// source: https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types
// source: https://learn.microsoft.com/en-us/azure/virtual-machines/disks-redundancy
export const share: Scene = mapFrame('files-and-disks', BUILT_BY[7], {
  id: 'share-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'share-code', kind: 'code', filename: 'templates/modules/share.bicep', label: code.replace(/\n+$/, ''), highlight: [16, 17, 18, 27, 28], pattern: 'storage' },
    {
      id: 'share-access',
      kind: 'table',
      label: 'Reaching the collateral share',
      headers: ['step', 'what decides'],
      values: [
        ['the path, port 445', 'ExpressRoute, private endpoint'],
        ['who you are', 'your bank sign-in, by Kerberos'],
        ['the share', 'a role: SMB Share Contributor'],
        ['a folder or file', 'Windows ACLs'],
      ],
    },
    {
      id: 'disks',
      kind: 'table',
      label: 'The runtime VMs’ disks',
      headers: ['disk', 'kind', 'lasts'],
      values: [
        ['OS: Windows', 'Premium SSD, LRS', 'with the VM'],
        ['temporary', 'on the host', 'until deallocated'],
        ['a snapshot', 'a copy, any time', 'until deleted'],
      ],
    },
  ],
})
