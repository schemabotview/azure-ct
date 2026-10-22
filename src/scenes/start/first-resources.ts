import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import script from '../../../spine/start/05-first-resources/project/infra/01-lake.sh?raw'
import session from '../../../spine/start/05-first-resources/session.txt?raw'

// The first script: two Resource Manager calls and one data-plane call. The script is model-checked
// (every az line through the CLI's own parser, scripts/check-azure.py); run here it stops at the first
// Resource Manager call for want of a sign-in, and the data-plane line runs against the emulator.
// Creating a container that exists is not an error: the CLI reports "created": false.
// source: https://learn.microsoft.com/en-us/cli/azure/storage/container#az-storage-container-create
// source: https://learn.microsoft.com/en-us/azure/storage/blobs/create-data-lake-storage-account
export const firstResources: Scene = mapFrame('first-resources', [...BUILT_BY[1], 'lake'], {
  id: 'resources-side',
  label: 'side',
  bare: true,
  children: [
    { id: 'lake-script', kind: 'code', filename: 'infra/01-lake.sh', label: script.replace(/\n+$/, ''), highlight: [7, 8, 13], pattern: 'service' },
    { id: 'resources-run', kind: 'terminal', filename: 'Terminal — risk-on-azure · emulated', label: session.replace(/\n+$/, '') },
    {
      id: 'choices',
      kind: 'table',
      label: 'The choices in it',
      headers: ['setting', 'why'],
      values: [
        ['--hns true', 'a hierarchical namespace: a data lake (ADLS)'],
        ['--sku Standard_LRS', 'three copies in one datacentre: fine for dev'],
        ['public access false, TLS 1.2', 'safe defaults, said out loud'],
        ['--tags app env owner', 'every line on a bill has an owner'],
      ],
    },
  ],
})
