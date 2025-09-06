import type { BuildTool } from '@/types/project'
import { select } from '@clack/prompts'

export async function askBuildTool() {
  return await select<BuildTool>({
    message: 'choose build tool:',
    options: [
      { value: 'vite', label: 'vite' },
      { value: 'none', label: 'none' },
    ],
  })
}
