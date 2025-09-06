import type { VueProjectConfig } from '@/types/config'
import type { TemplateRegistry } from '@/types/template'

export const VueTemplates: TemplateRegistry<VueProjectConfig> = {
  'main.ts': {
    template: 'fragments/vue/main.ts.hbs',
    target: config => `src/main.${config.language === 'typescript' ? 'ts' : 'js'}`,
    condition: () => true,
  },

  'App.vue': {
    template: 'fragments/vue/App.vue.hbs',
    target: 'src/App.vue',
    condition: () => true,
  },

  'index.html': {
    template: 'fragments/common/index.html.hbs',
    target: 'index.html',
    condition: () => true,
  },

  'Counter.vue': {
    template: 'fragments/vue/Counter.vue.hbs',
    target: 'src/components/Counter.vue',
    condition: () => true,
  },

  'router.ts': {
    template: 'fragments/vue/router.ts.hbs',
    target: config => `src/router/index.${config.language === 'typescript' ? 'ts' : 'js'}`,
    condition: config => config.router === true,
  },

  'Home.vue': {
    template: 'fragments/vue/Home.vue.hbs',
    target: 'src/views/Home.vue',
    condition: () => true,
  },

  'About.vue': {
    template: 'fragments/vue/About.vue.hbs',
    target: 'src/views/About.vue',
    condition: config => config.router === true,
  },

  'counter-store.ts': {
    template: 'fragments/vue/counter-store.ts.hbs',
    target: config => `src/stores/counter.${config.language === 'typescript' ? 'ts' : 'js'}`,
    condition: config => config.stateManagement,
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
}
