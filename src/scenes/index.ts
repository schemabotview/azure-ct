import type { Scene } from '@graphlearning/flow'
import { ch01Scenes } from './ch01-foundations'
import { ch02Scenes } from './ch02-identity-governance'
import { ch03Scenes } from './ch03-app-service'
import { ch04Scenes } from './ch04-networking'
import { ch05Scenes } from './ch05-compute'
import { ch06Scenes } from './ch06-storage'
import { ch07Scenes } from './ch07-databases'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored.
const ALL: Scene[] = [...ch01Scenes, ...ch02Scenes, ...ch03Scenes, ...ch04Scenes, ...ch05Scenes, ...ch06Scenes, ...ch07Scenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
