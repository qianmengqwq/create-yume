import type { ReactProjectConfig } from '@/types/config'
import type { TemplateRegistry } from '@/types/template'
import { commonTemplates } from './frontend-app'

export const ReactTemplates: TemplateRegistry<ReactProjectConfig> = {
  ...commonTemplates,
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
}
