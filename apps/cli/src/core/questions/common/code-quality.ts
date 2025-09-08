// 前置：选择 git + eslint

import type { CodeQuality } from '@/types/config'
import { multiselect } from '@clack/prompts'

export async function askCodeQuality() {
  return await multiselect<CodeQuality>({
    message: 'choose code quality tools:',
    required: false,
    options: [
      { value: 'lint-staged', label: 'Lint Staged' },
      { value: 'commitlint', label: 'Commitlint' },
    ],
  })
}
