import type { BaseFrontendAppConfig } from '@/types/config'
import type { TemplateRegistry } from '@/types/template'

export const commonTemplates: TemplateRegistry<BaseFrontendAppConfig> = {
  'index.html': {
    template: 'fragments/common/index.html.hbs',
    target: 'index.html',
    condition: () => true,
  },

  'vite.config.ts': {
    template: 'fragments/common/vite.config.ts.hbs',
    target: config => `vite.config.${config.language === 'typescript' ? 'ts' : 'js'}`,
    condition: () => true,
  },

  'tsconfig.json': {
    template: 'fragments/common/ts/tsconfig.json.hbs',
    target: 'tsconfig.json',
    condition: config => config.language === 'typescript',
  },
  'tsconfig.node.json': {
    template: 'fragments/common/ts/tsconfig.node.json.hbs',
    target: 'tsconfig.node.json',
    condition: config => config.language === 'typescript',
  },
  'tsconfig.app.json': {
    template: 'fragments/common/ts/tsconfig.app.json.hbs',
    target: 'tsconfig.app.json',
    condition: config => config.language === 'typescript',
  },

  'vite-env.d.ts': {
    template: 'fragments/common/ts/vite-env.d.ts.hbs',
    target: 'src/vite-env.d.ts',
    condition: config => config.language === 'typescript',
  },

  'eslint.config.mjs': {
    template: 'fragments/common/linter/eslint.config.mjs.hbs',
    target: 'eslint.config.mjs',
    condition: config => config.linting === 'antfu-eslint',
  },
  'vscode.settings.json': {
    template: 'fragments/common/linter/vscode.settings.json.hbs',
    target: '.vscode/settings.json',
    condition: config => config.linting === 'antfu-eslint',
  },

  '.gitignore': {
    template: 'fragments/common/gitignore.hbs',
    target: '.gitignore',
    condition: config => config.git === true,
  },

  'README.md': {
    template: 'fragments/common/README.md.hbs',
    target: 'README.md',
    condition: () => true,
  },

  'style.css': {
    template: 'fragments/common/css/style.css.hbs',
    target: config => `src/style.${config.cssPreprocessor === 'css' ? 'css' : config.cssPreprocessor === 'less' ? 'less' : 'scss'}`,
    condition: () => true,
  },

  'commitlint.config.ts': {
    template: 'fragments/common/code-quality/commitlint.config.ts.hbs',
    target: config => `commitlint.config.${config.language === 'typescript' ? 'ts' : 'js'}`,
    condition: config => config.codeQuality.includes('commitlint'),
  },

  '.lintstagedrc.json': {
    template: 'fragments/common/code-quality/.lintstagedrc.json.hbs',
    target: '.lintstagedrc.json',
    condition: config => config.codeQuality.includes('lint-staged'),
  },
}
