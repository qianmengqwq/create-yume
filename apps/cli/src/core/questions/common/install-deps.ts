import { confirm } from '@clack/prompts'

export async function askInstallDeps() {
  return await confirm({
    message: 'install dependencies immediately?',
    initialValue: false,
  })
}
