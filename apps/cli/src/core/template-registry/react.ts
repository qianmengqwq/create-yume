import type { ReactProjectConfig } from '@/types/config'
import type { TemplateRegistry } from '@/types/template'

export const ReactTemplates: TemplateRegistry<ReactProjectConfig> = {
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

  'App.tsx': {
    template: 'fragments/react/App.tsx.hbs',
    target: config => `src/pages/app.${config.language === 'typescript' ? 'tsx' : 'jsx'}`,
    condition: () => true,
  },

  'About.tsx': {
    template: 'fragments/react/About.tsx.hbs',
    target: config => `src/pages/about.${config.language === 'typescript' ? 'tsx' : 'jsx'}`,
    condition: config => config.router !== 'none',
  },

  'Home.tsx': {
    template: 'fragments/react/Home.tsx.hbs',
    target: config => `src/pages/home.${config.language === 'typescript' ? 'tsx' : 'jsx'}`,
    condition: () => true,
  },

  'Counter.tsx': {
    template: 'fragments/react/Counter.tsx.hbs',
    target: config => `src/components/Counter.${config.language === 'typescript' ? 'tsx' : 'jsx'}`,
    condition: () => true,
  },

  'CounterStore.ts': {
    template: 'fragments/react/Counter.ts.hbs',
    target: config => `src/stores/counter.${config.language === 'typescript' ? 'ts' : 'js'}`,
    condition: config => config.stateManagement !== 'none',
  },

  'main.tsx': {
    template: 'fragments/react/main.tsx.hbs',
    target: config => `src/main.${config.language === 'typescript' ? 'tsx' : 'jsx'}`,
    condition: () => true,
  },

  'router.ts': {
    template: 'fragments/react/router.ts.hbs',
    target: config => `src/router/index.${config.language === 'typescript' ? 'tsx' : 'jsx'}`,
    condition: config => config.router !== 'none',
  },

  'style.css': {
    template: 'fragments/common/css/style.css.hbs',
    target: config => `src/style.${config.cssPreprocessor === 'css' ? 'css' : config.cssPreprocessor === 'less' ? 'less' : 'scss'}`,
    condition: () => true,
  },
}
