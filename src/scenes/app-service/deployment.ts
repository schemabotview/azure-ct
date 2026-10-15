import type { Scene } from '@graphlearning/flow'

// Ch3 §3 — create, configure, deploy. Names are synthetic and the runtime string should be re-checked
// against `az webapp list-runtimes`. The instance steps describe the general sequence, not exact logs.
export const deployment: Scene = {
  id: 'deployment',
  title: 'From a zip file to a running process',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'commands',
      kind: 'code',
      filename: 'Cloud Shell',
      label: `az appservice plan create -g rg-retail-dev \\
  -n plan-retail-dev --is-linux --sku B1

az webapp create -g rg-retail-dev \\
  -p plan-retail-dev -n contoso-shop-dev \\
  --runtime "PYTHON:3.12"

az webapp config appsettings set \\
  -g rg-retail-dev -n contoso-shop-dev \\
  --settings CATALOG_URL=https://catalog.example

az webapp deploy -g rg-retail-dev \\
  -n contoso-shop-dev --src-path app.zip --type zip`,
    },
    {
      id: 'instance',
      label: 'On the app instance',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'artifact', label: 'Release artefact', sub: 'the zip, unchanged', pattern: 'storage', icon: 'file' },
        { id: 'settings', label: 'App settings', sub: 'become env variables', pattern: 'network', icon: 'wrench' },
        { id: 'start', label: 'Start command', sub: 'launches the process', pattern: 'service', icon: 'terminal' },
        { id: 'listen', label: 'Listening', sub: 'on the platform port', pattern: 'user', icon: 'globe' },
      ],
    },
  ],
  edges: [{ source: 'commands', target: 'instance', label: 'creates and starts' }],
}
