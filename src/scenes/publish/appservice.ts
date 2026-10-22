import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import code from '../../../spine/publish/02-appservice/project/templates/modules/app.bicep?raw'
import session from '../../../spine/publish/02-appservice/session.txt?raw'

// App Service: an App Service plan is the set of VMs (its SKU and instance count); apps run on it.
// Premium v3 supports zone redundancy (instances spread across zones, minimum count applies). Linux
// apps choose a runtime stack (linuxFxVersion) and a startup command; app settings become
// environment variables; VNet integration sends outbound traffic through a delegated subnet;
// a health check path takes unhealthy instances out of rotation.
// source: https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans
// source: https://learn.microsoft.com/en-us/azure/reliability/reliability-app-service
// source: https://learn.microsoft.com/en-us/azure/app-service/configure-language-python
// source: https://learn.microsoft.com/en-us/azure/app-service/overview-vnet-integration
// source: https://learn.microsoft.com/en-us/azure/app-service/monitor-instances-health-check
export const appservice: Scene = mapFrame('app-service', [...BUILT_BY[11], 'app'], {
  id: 'appservice-pane',
  label: 'side',
  bare: true,
  children: [
    { id: 'appservice-code', kind: 'code', filename: 'templates/modules/app.bicep', label: code.replace(/\n+$/, ''), show: [[14, 20], [23, 34]], highlight: [18, 19, 26, 27, 30, 31, 32], pattern: 'service' },
    { id: 'appservice-run', kind: 'terminal', filename: 'Terminal — risk-on-azure', label: session.replace(/\n+$/, '') },
    {
      id: 'appservice-words',
      kind: 'table',
      label: 'App Service, word by word',
      headers: ['word', 'means'],
      values: [
        ['plan', 'the machines: P1v3, three, one per zone'],
        ['app', 'the API, running on every instance'],
        ['runtime stack', 'PYTHON|3.12, kept patched by Azure'],
        ['startup command', 'python app/server.py'],
        ['app settings', 'environment variables'],
        ['deployment', 'a zip of app/, to a slot'],
      ],
    },
  ],
})
