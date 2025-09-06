import { text } from '@clack/prompts'

export async function askProjectName() {
  const name = await text({
    message: 'Project Name:',
    placeholder: 'my-project',
    validate: (value) => {
      // 如果为空，使用默认值，不需要验证
      if (!value)
        return undefined
      if (!/^[\w-]+$/.test(value)) {
        return '项目名称只能包含字母、数字、连字符和下划线'
      }
      return undefined
    },
  })

  return name || 'my-project'
}
