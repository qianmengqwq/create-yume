import type { ProjectType } from '@/types/project'
import { select } from '@clack/prompts'

export async function askProjectType() {
  return await select<ProjectType>({
    message: 'Choose project type:',
    options: [
      { value: 'vue', label: 'Vue Application' },
      { value: 'react', label: 'React Application' },
      { value: 'node', label: 'Node.js Project' },
    ],
  })
}
