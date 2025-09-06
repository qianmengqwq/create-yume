import type { Linting } from '@/types/config'
import { select } from '@clack/prompts'

export async function askLinting() {
  return await select<Linting>({
    message: 'choose a linting tool:',
    options: [
      { value: 'antfu-eslint', label: 'Antfu ESLint' },
      { value: 'none', label: 'No Linting' },
    ],
  })
}
