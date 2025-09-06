import { confirm } from '@clack/prompts'

export async function askGit() {
  return await confirm({
    message: 'initialize Git repository?',
    initialValue: true,
  })
}
