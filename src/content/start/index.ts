import type { Course } from '../types'
import { theFinishedProjectToured } from './01-the-finished-project-toured'
import { theTenantAndItsBreakGlassAccounts } from './02-the-tenant-and-its-break-glass-accounts'
import { aFirstSession } from './03-a-first-session'
import { theEmulatorsBesideAzure } from './04-the-emulators-beside-azure'
import { theFirstResources } from './05-the-first-resources'
import { budgetsTagsAndCleanup } from './06-budgets-tags-and-cleanup'

// Course 3 — Start the project. The finished project toured, the tenant's break-glass accounts, a
// first session, the emulators, the first resources, and cost and cleanup from day one.
export const start: Course = {
  id: 'start',
  title: 'Start the project',
  sections: [theFinishedProjectToured, theTenantAndItsBreakGlassAccounts, aFirstSession, theEmulatorsBesideAzure, theFirstResources, budgetsTagsAndCleanup],
}
