import type { Course } from '../types'
import { dataModelsAndAccessPatterns } from './01-data-models-and-access-patterns'
import { azureSqlManagedInstanceAndVm } from './02-azure-sql-managed-instance-and-vm'
import { postgresqlAndManagedRelationalSelection } from './03-postgresql-and-managed-relational-selection'
import { transactionsConnectionPoolsAndRetries } from './04-transactions-connection-pools-and-retries'
import { availabilityReplicasBackupsAndRestore } from './05-availability-replicas-backups-and-restore'
import { cosmosDbApisPartitionsAndThroughput } from './06-cosmos-db-apis-partitions-and-throughput'
import { cosmosDbConsistencyAndTransactions } from './07-cosmos-db-consistency-and-transactions'
import { cachingInvalidationAndDatabaseMigration } from './08-caching-invalidation-and-database-migration'

// Chapter 7 of the Azure course (AZURE-COURSE-PLAN.md). Narration wavs are not yet produced.
export const ch07Databases: Course = {
  id: 'ch07-databases',
  title: 'Databases and Application State',
  sections: [
    dataModelsAndAccessPatterns,
    azureSqlManagedInstanceAndVm,
    postgresqlAndManagedRelationalSelection,
    transactionsConnectionPoolsAndRetries,
    availabilityReplicasBackupsAndRestore,
    cosmosDbApisPartitionsAndThroughput,
    cosmosDbConsistencyAndTransactions,
    cachingInvalidationAndDatabaseMigration,
  ],
}
