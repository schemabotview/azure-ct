import { foundations } from './foundations'
import { identity } from './identity'
import { appService } from './app-service'
import { networking } from './networking'
import { compute } from './compute'
import { storage } from './storage'
import { databases } from './databases'
import { integration } from './integration'
import { analytics } from './analytics'
import { delivery } from './delivery'
import { operations } from './operations'
import { optimisation } from './optimisation'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored.
export const COURSES: Record<string, Course> = {
  [foundations.id]: foundations,
  [identity.id]: identity,
  [appService.id]: appService,
  [networking.id]: networking,
  [compute.id]: compute,
  [storage.id]: storage,
  [databases.id]: databases,
  [integration.id]: integration,
  [analytics.id]: analytics,
  [delivery.id]: delivery,
  [operations.id]: operations,
  [optimisation.id]: optimisation,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
