import type { Language } from '@/types/config'
import { select } from '@clack/prompts'

export async function askLanguage() {
  return await select<Language>({
    message: 'choose programming language:',
    options: [
      { value: 'typescript', label: 'TypeScript' },
      { value: 'javascript', label: 'JavaScript' },
    ],
  })
}
