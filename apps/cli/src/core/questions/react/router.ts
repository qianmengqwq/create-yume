import type { ReactRouter } from '@/types/project'
import { select } from '@clack/prompts'

export async function askReactRouter() {
  return await select<ReactRouter>({
    message: 'select a router?',
    options: [
      { value: 'react-router', label: 'React Router' },
      { value: 'tanstack-router', label: 'TanStack Router' },
      { value: 'none', label: 'No Router' },
    ],
  })
}
