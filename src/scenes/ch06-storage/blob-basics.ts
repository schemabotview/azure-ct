import type { Scene } from '@graphlearning/flow'

// Ch6 §2 — account → container → blob, and the URL that names one blob. Account names are globally
// unique, 3–24 lowercase letters and digits. Names synthetic.
export const blobBasics: Scene = {
  id: 'ch06-blob-basics',
  title: 'Account, container, blob',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'upload',
      kind: 'code',
      filename: 'Cloud Shell',
      label: `az storage blob upload \\
  --account-name stcontosoretail \\
  --container-name receipts \\
  --name order-1042.json \\
  --file order-1042.json \\
  --auth-mode login`,
    },
    {
      id: 'account',
      label: 'stcontosoretail',
      sub: 'storage account',
      pattern: 'storage',
      cols: 2,
      children: [
        {
          id: 'receipts',
          label: 'receipts',
          sub: 'container',
          pattern: 'storage',
          children: [{ id: 'blob', label: 'order-1042.json', sub: 'a block blob', pattern: 'storage', icon: 'blobblock' }],
        },
        {
          id: 'images',
          label: 'product-images',
          sub: 'container',
          pattern: 'storage',
          children: [{ id: 'img', label: 'bottle.png', sub: 'a block blob', pattern: 'storage', icon: 'blobblock' }],
        },
      ],
    },
    {
      id: 'url',
      kind: 'code',
      filename: 'the blob has a URL',
      label: `https://stcontosoretail.blob.core.windows.net
  /receipts/order-1042.json`,
    },
  ],
  edges: [
    { source: 'upload', target: 'account', label: 'writes into' },
    { source: 'account', target: 'url', label: 'addressed as' },
  ],
}
