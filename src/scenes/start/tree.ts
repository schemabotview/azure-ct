import type { TreeEntry } from '@graphlearning/flow'
import { projectTree } from '../project'

// risk-on-azure as Course 3 builds it, step by step. `fresh` marks what the section adds; `active` is
// the file in the editor.
const AT: Record<string, string[]> = {
  '04': ['env.sh', 'requirements.txt'],
  '05': ['env.sh', 'infra/01-lake.sh', 'requirements.txt'],
  '06': ['budgets/risk-dev-monthly.json', 'env.sh', 'infra/01-lake.sh', 'infra/teardown.sh', 'requirements.txt', 'tools/cost_ledger.py'],
}

export const startTree = (step: keyof typeof AT, active: string, fresh: string[] = []): TreeEntry[] => projectTree(AT[step], active, fresh)
