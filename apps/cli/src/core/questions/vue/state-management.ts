import { confirm } from '@clack/prompts'

export async function askVueStateManagement() {
  return await confirm({
    message: 'use Pinia for state management?',
    initialValue: true,
  })
}
