import type { Scene } from '@graphlearning/flow'

// Ch3 §2 — an App Service plan is the compute (region, size, instance count); apps are what runs on
// it and they SHARE it. The plan, not the app, is the billing unit. Tier eligibility varies by SKU.
export const plansApps: Scene = {
  id: 'ch03-plans-apps',
  title: 'One plan, several apps',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'plan',
      label: 'App Service plan: plan-retail-dev',
      sub: 'region, size, instances',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'site', label: 'Shop site', sub: 'web app', pattern: 'service', icon: 'appservice' },
        { id: 'api', label: 'Order API', sub: 'web app', pattern: 'service', icon: 'appservice' },
        { id: 'admin', label: 'Admin tool', sub: 'web app', pattern: 'service', icon: 'appservice' },
      ],
    },
    {
      id: 'choices',
      label: 'What the plan fixes',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'os', label: 'Operating system', sub: 'Linux or Windows', pattern: 'network', icon: 'server' },
        { id: 'tier', label: 'Pricing tier', sub: 'sets features and size', pattern: 'warn', icon: 'gauge' },
        { id: 'runtime', label: 'Runtime stack', sub: 'Python, .NET, Node.js', pattern: 'storage', icon: 'code' },
        { id: 'bill', label: 'The bill', sub: 'follows the plan', pattern: 'external', icon: 'receipt' },
      ],
    },
  ],
  edges: [{ source: 'plan', target: 'choices', label: 'decides' }],
}
