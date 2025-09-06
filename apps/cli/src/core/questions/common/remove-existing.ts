import { confirm } from '@clack/prompts'

export async function askRemoveExisting(projectName: string) {
  return await confirm({
    message: `目标目录 "${projectName}" 已存在。是否删除现有内容后继续？`,
    initialValue: false,
  })
}
