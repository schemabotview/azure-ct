import type { Scene, SceneEdge, SceneNode } from '@graphlearning/flow'
import { SCENE_ASPECT } from '@graphlearning/shell'

// The platform's map: ONE architecture diagram that every map frame in the course is drawn from, the
// way aws-ct's shop map grows with its project. Every part is always present, with the same label and
// place, so the layout never moves between frames. A part the platform has not built yet keeps its
// label but trades its Azure icon for a neutral outline glyph in the `group` colour — an Azure icon is
// drawn in its own colours whatever the pattern, so the icon itself has to go. A tile's icon box is a
// fixed size, so the swap moves nothing. What a section is about is its focus.
//
// The data flows top to bottom: the bank's sources → the private network → ingest → lake and
// Databricks → serving stores → what the risk team touches → its readers. The controls that wrap
// everything sit underneath. Part ids are stable for the whole course — scenes and sections refer to
// them by name.

export type Part =
  | 'tradebook' | 'files' | 'feed'
  | 'er' | 'vnet' | 'pe'
  | 'shir' | 'adf' | 'eg' | 'evh' | 'sb'
  | 'lake' | 'dbx' | 'reports'
  | 'mart' | 'cosmos' | 'cache'
  | 'app' | 'apim' | 'fn' | 'logic' | 'filer' | 'bi'
  | 'fd' | 'team' | 'regulator'
  | 'entra' | 'mi' | 'policy' | 'kv' | 'bicep' | 'pipeline' | 'monitor' | 'defender' | 'backup' | 'cost'

export const ALL_PARTS: Part[] = [
  'tradebook', 'files', 'feed', 'er', 'vnet', 'pe', 'shir', 'adf', 'eg', 'evh', 'sb', 'lake', 'dbx', 'reports',
  'mart', 'cosmos', 'cache', 'app', 'apim', 'fn', 'logic', 'filer', 'bi', 'fd', 'team', 'regulator',
  'entra', 'mi', 'policy', 'kv', 'bicep', 'pipeline', 'monitor', 'defender', 'backup', 'cost',
]

interface Spec { label: string; icon: string; pattern: NonNullable<SceneNode['pattern']> }

const PARTS: Record<Part, Spec> = {
  tradebook: { label: 'TradeBook', icon: 'postgresql', pattern: 'external' },
  files: { label: 'Daily files', icon: 'file', pattern: 'external' },
  feed: { label: 'Market feed', icon: 'kafka', pattern: 'external' },
  er: { label: 'ExpressRoute', icon: 'expressroute', pattern: 'network' },
  vnet: { label: 'Spoke VNet', icon: 'vnet', pattern: 'network' },
  pe: { label: 'Private endpoints', icon: 'privateendpoint', pattern: 'network' },
  shir: { label: 'Integration runtime', icon: 'vm', pattern: 'service' },
  adf: { label: 'Data Factory', icon: 'datafactory', pattern: 'service' },
  eg: { label: 'Event Grid', icon: 'eventgrid', pattern: 'network' },
  evh: { label: 'Event Hubs', icon: 'eventhubs', pattern: 'network' },
  sb: { label: 'Service Bus', icon: 'servicebus', pattern: 'network' },
  lake: { label: 'Lake', icon: 'adls', pattern: 'storage' },
  dbx: { label: 'Databricks', icon: 'databricks', pattern: 'service' },
  reports: { label: 'Locked reports', icon: 'blob', pattern: 'storage' },
  mart: { label: 'Risk mart', icon: 'postgres', pattern: 'storage' },
  cosmos: { label: 'Group lookup', icon: 'cosmos', pattern: 'storage' },
  cache: { label: 'Cache', icon: 'redis', pattern: 'storage' },
  app: { label: 'Exposure API', icon: 'appservice', pattern: 'service' },
  apim: { label: 'API Management', icon: 'apim', pattern: 'service' },
  fn: { label: 'Breach alert', icon: 'functions', pattern: 'service' },
  logic: { label: 'Breach workflow', icon: 'logicapps', pattern: 'service' },
  filer: { label: 'Report filer', icon: 'containerapps', pattern: 'service' },
  bi: { label: 'Power BI', icon: 'powerbi', pattern: 'service' },
  fd: { label: 'Front Door', icon: 'frontdoor', pattern: 'network' },
  team: { label: 'Risk team', icon: 'users', pattern: 'user' },
  regulator: { label: 'Regulator', icon: 'building', pattern: 'user' },
  entra: { label: 'Entra ID + RBAC', icon: 'tenant', pattern: 'user' },
  mi: { label: 'Managed identities', icon: 'managedidentity', pattern: 'user' },
  policy: { label: 'Policy', icon: 'policy', pattern: 'warn' },
  kv: { label: 'Key Vault', icon: 'keyvault', pattern: 'warn' },
  bicep: { label: 'Bicep', icon: 'template', pattern: 'service' },
  pipeline: { label: 'Pipeline', icon: 'githubactions', pattern: 'service' },
  monitor: { label: 'Monitor', icon: 'monitor', pattern: 'network' },
  defender: { label: 'Defender', icon: 'defender', pattern: 'warn' },
  backup: { label: 'Backup', icon: 'recoveryvault', pattern: 'storage' },
  cost: { label: 'Cost', icon: 'costanalysis', pattern: 'external' },
}

export interface MapState {
  /** the parts the platform has at this point of the course; everything else is drawn neutral */
  built: Part[]
}

/** Every part, in course order: what the platform has by the END of each course. The bank's own
 *  sources and readers exist before the platform does. */
export const BUILT_BY: Record<number, Part[]> = (() => {
  const adds: Record<number, Part[]> = {
    1: ['tradebook', 'files', 'feed', 'team', 'regulator'],
    3: ['lake', 'cost'],
    4: ['entra', 'mi', 'policy'],
    5: ['er', 'vnet', 'pe'],
    6: ['bicep', 'pipeline', 'kv'],
    7: ['reports'],
    8: ['shir', 'adf', 'eg'],
    9: ['evh', 'sb'],
    10: ['dbx'],
    11: ['mart', 'cosmos', 'cache'],
    12: ['app', 'apim', 'fn', 'logic', 'filer', 'bi'],
    13: ['monitor', 'defender', 'backup'],
    14: ['fd'],
  }
  const out: Record<number, Part[]> = {}
  let acc: Part[] = []
  for (let c = 1; c <= 14; c++) {
    acc = [...acc, ...(adds[c] ?? [])]
    out[c] = acc
  }
  return out
})()

export function platformMap(prefix: string, state: MapState): SceneNode {
  const built = new Set(state.built)
  const part = (p: Part): SceneNode => {
    const s = PARTS[p]
    return built.has(p)
      ? { id: `${prefix}${p}`, label: s.label, icon: s.icon, pattern: s.pattern, variant: 'tile' }
      : { id: `${prefix}${p}`, label: s.label, icon: 'box', pattern: 'group', variant: 'tile' }
  }
  const group = (id: string, label: string, parts: Part[], extra: Partial<SceneNode> = {}): SceneNode => ({
    id: `${prefix}${id}`, label, pattern: 'group', icon: 'none', children: parts.map(part), ...extra,
  })
  const e = (a: string, b: string, label?: string): SceneEdge => ({ source: `${prefix}${a}`, target: `${prefix}${b}`, ...(label ? { label } : {}) })

  return {
    id: `${prefix}map`,
    label: 'The platform',
    bare: true,
    flow: 'LR',
    align: 'start',
    gap: 'tight',
    children: [
      {
        id: `${prefix}path`,
        label: 'Data path',
        bare: true,
        children: [
          {
            id: `${prefix}inbound`,
            label: 'Into Azure',
            bare: true,
            flow: 'LR',
            children: [
              group('sources', 'Woodgrove on-premises', ['tradebook', 'files', 'feed'], { cols: 3 }),
              group('network', 'Private network', ['er', 'vnet', 'pe'], { cols: 3 }),
            ],
            edges: [e('sources', 'network')],
          },
          {
            id: `${prefix}region`,
            label: 'UK South · risk-prod',
            pattern: 'group',
            icon: 'region',
            children: [
              group('ingest', 'Ingest', ['shir', 'adf', 'eg', 'evh', 'sb'], { cols: 5 }),
              {
                id: `${prefix}stores`,
                label: 'Stores',
                bare: true,
                flow: 'LR',
                children: [
                  group('lakehouse', 'Lake and Databricks', ['lake', 'dbx', 'reports'], { cols: 3 }),
                  group('serve', 'Serve', ['mart', 'cosmos', 'cache'], { cols: 3 }),
                ],
                edges: [e('lakehouse', 'serve')],
              },
              group('publish', 'Publish', ['app', 'apim', 'fn', 'logic', 'filer', 'bi'], { cols: 6 }),
            ],
            edges: [e('ingest', 'stores'), e('stores', 'publish')],
          },
          group('readers', 'Readers', ['fd', 'team', 'regulator'], { cols: 3 }),
        ],
        edges: [e('inbound', 'region'), e('region', 'readers')],
      },
      group('controls', 'Around everything', ['entra', 'mi', 'policy', 'kv', 'bicep', 'pipeline', 'monitor', 'defender', 'backup', 'cost'], { cols: 2 }),
    ],
  }
}

// A map frame: the map on the left at its natural size, the lesson on the right in a side pane that
// is pinned to fill the rest of a 16:9 frame. The map's size never changes (every part is always
// drawn, with the same label), so as long as the side's content fits inside its floor the map sits
// at the same pixels in every map frame of the course — check-render.mjs holds it there.
// MAP_W × MAP_H is the map as computeLayout places it; measured, and re-measured if a label changes.
export const MAP_W = 1318
export const MAP_H = 1227
const GAP = 10
export const MAP_SIDE_W = Math.round(MAP_H * SCENE_ASPECT) - MAP_W - GAP

export function mapFrame(id: string, built: Part[], side: SceneNode): Scene {
  const fill = (n: SceneNode): SceneNode => (n.bare && n.children ? { ...n, minW: MAP_SIDE_W, children: n.children.map((c) => ({ ...c, minW: MAP_SIDE_W })) } : { ...n, minW: MAP_SIDE_W })
  return {
    id,
    padding: 0.04,
    flow: 'LR',
    align: 'start',
    gap: 'tight',
    nodes: [
      { ...platformMap('', { built }), id: `${id}-map` },
      { id: `${id}-side`, label: 'side', bare: true, framed: true, minW: MAP_SIDE_W, minH: MAP_H, children: [fill(side)] },
    ],
    edges: [],
  }
}
