import type { CSSPreprocessor } from '@/types/project'
import { select } from '@clack/prompts'

export async function askCSSPreprocessor() {
  return await select<CSSPreprocessor>({
    message: 'Choose a CSS preprocessor:',
    options: [
      { value: 'css', label: 'CSS' },
      { value: 'less', label: 'Less' },
      { value: 'sass', label: 'Sass/SCSS' },
    ],
  })
}
