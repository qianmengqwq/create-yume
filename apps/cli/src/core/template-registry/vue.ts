import type { VueProjectConfig } from '@/types/config'
import type { TemplateRegistry } from '@/types/template'
import { commonTemplates } from './frontend-app'

export const VueTemplates: TemplateRegistry<VueProjectConfig> = {
  ...commonTemplates,
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
}
