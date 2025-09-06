import { confirm } from '@clack/prompts'

export async function askVueRouter() {
  return await confirm({
    message: 'use Vue Router?',
    initialValue: true,
  })
}
