import antfu from '@antfu/eslint-config'

export default antfu(
  { typescript: true },
  { rules: {
    // yield 出去的，声明时候也有不用 new 的情况
    'unicorn/throw-new-error': 'off',
  } },
)
