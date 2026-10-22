import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'

// The finished platform: every part of the map built, beside the course as the order it is built in.
export const build: Scene = mapFrame('risk-on-azure', BUILT_BY[14], {
  id: 'build-side',
  label: 'side',
  bare: true,
  children: [
    {
      id: 'route',
      kind: 'table',
      label: 'The course is the order we build it in',
      headers: ['course', 'the platform gains'],
      values: [
        ['3  start', 'a project, a session, a first container'],
        ['4  secure', 'groups, identities, roles, policies'],
        ['5  network', 'a private network to the bank'],
        ['6  automate', 'Bicep and a pipeline with no secret'],
        ['7  land', 'the lake and the locked reports'],
        ['8  batch', 'Data Factory and its runtime'],
        ['9  stream', 'Event Hubs and Service Bus'],
        ['10 transform', 'Databricks, inside the network'],
        ['11 serve', 'the risk mart, a lookup, a cache'],
        ['12 publish', 'the API, alerts, the report filer'],
        ['13 operate', 'monitoring, defence, backups'],
        ['14 evolve', 'Front Door, a priced, reviewed map'],
      ],
    },
    {
      id: 'rules',
      kind: 'list',
      icon: 'layers',
      label: 'How to read the map',
      pattern: 'user',
      items: [
        'Data flows down, from the bank’s systems to its readers',
        'Every part keeps its place from the first frame to the last',
        'A grey outline is a part not built yet',
        'Alternatives are drawn beside the map, never inside it',
      ],
    },
    {
      id: 'frames',
      kind: 'table',
      label: 'Four kinds of frame',
      headers: ['frame', 'shows'],
      values: [
        ['map', 'this map, and what a section adds to it'],
        ['map + terminal', 'the map beside a command and its output'],
        ['IDE', 'one file of the project, run in a terminal'],
        ['concept', 'an idea with no command: a zone failing'],
      ],
    },
  ],
})
