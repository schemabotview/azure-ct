import { ch01Foundations } from './ch01-foundations'
import { ch02IdentityGovernance } from './ch02-identity-governance'
import { ch03AppService } from './ch03-app-service'
import { ch04Networking } from './ch04-networking'
import { ch05Compute } from './ch05-compute'
import { ch06Storage } from './ch06-storage'
import { ch07Databases } from './ch07-databases'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored.
export const COURSES: Record<string, Course> = {
  [ch01Foundations.id]: ch01Foundations,
  [ch02IdentityGovernance.id]: ch02IdentityGovernance,
  [ch03AppService.id]: ch03AppService,
  [ch04Networking.id]: ch04Networking,
  [ch05Compute.id]: ch05Compute,
  [ch06Storage.id]: ch06Storage,
  [ch07Databases.id]: ch07Databases,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
