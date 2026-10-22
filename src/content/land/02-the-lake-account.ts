import type { Section } from '../types'

export const theLakeAccount: Section = {
  id: 'the-lake-account',
  title: 'The lake account',
  scene: 'lake-zones',
  narration:
    "The lake is one storage account with a hierarchical namespace turned on, which is what makes it Data Lake Storage. With it, folders are real: renaming a folder, or giving one a permission, is a single operation instead of one for every file inside. The code at the top is the lake module, now with its four zones as a parameter: landing, bronze, silver and gold. It sets is H n s Enabled to true, and adds a blob service with soft delete for fourteen days, for files and for whole containers, and then one container per zone. The terminal does the same in the storage emulator, against the development account. It creates the four containers, lists them, and uploads the hierarchy file into landing, under a folder for its date, two thousand twenty six, ten, thirteen. The list shows it arrived, five hundred and seven bytes. One difference is worth saying aloud: the emulator has no hierarchical namespace, so the slashes in that name are just characters. On Azure they are folders. The table at the bottom says what each zone is for. Landing holds files exactly as they were delivered, for thirty days, written by the sources and by Data Factory. Bronze holds everything ever received, kept, written by Data Factory and Event Hubs. Silver holds the data cleaned, joined and typed, by Databricks. And gold holds what the risk team reads, the exposures and limits, also built by Databricks. Data only moves forward through the zones, so anything in silver or gold can be rebuilt from bronze. Next, who is allowed to write into landing, and how a source that is not in Azure gets in.",
}
