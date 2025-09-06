import type { CSSFramework } from '@/types/project'
import { select } from '@clack/prompts'

export async function askCSSFramework() {
  return await select<CSSFramework>({
    message: 'choose css framework:',
    options: [
      { value: 'tailwind', label: 'Tailwind CSS' },
      { value: 'none', label: 'None' },
    ],
  })
}
