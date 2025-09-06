import type { ReactStateManagement } from '@/types/project'
import { select } from '@clack/prompts'

export async function askReactStateManagement() {
  return await select<ReactStateManagement>({
    message: 'choose state management:',
    options: [
      { value: 'zustand', label: 'Zustand' },
      { value: 'jotai', label: 'Jotai' },
      { value: 'none', label: 'No State Management' },
    ],
  })
}
