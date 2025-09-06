import type { ProjectConfig } from '@/types/config'
import type { ComposeDSL } from '@/types/dsl'
import type { TemplateRegistry } from '@/types/template'
import path from 'node:path'
import { Effect } from 'effect'
import { isReactProject, isVueProject } from '@/utils/type-guard'
import { ReactTemplates } from '../template-registry/react'
import { VueTemplates } from '../template-registry/vue'
import { OrchestratorService } from './orchestrator'

// 纯函数：直接把符合条件的模板注册到 DSL（不依赖环境）
export function buildTemplates(dsl: ComposeDSL, templateRoot: string, config: ProjectConfig) {
  const register = <T>(registry: TemplateRegistry<T>) => {
    for (const item of Object.values(registry)) {
      if (!item.condition(config as T))
        continue
      const target = typeof item.target === 'string' ? item.target : item.target(config as T)
      const src = path.join(templateRoot, item.template)
      dsl.render(src, target)
    }
  }
  if (isVueProject(config))
    register(VueTemplates)
  if (isReactProject(config))
    register(ReactTemplates)
}

// 返回需要注册的 partial 目录（供调用方自行调用 templateEngine.registerPartials）
export function collectPartialEntries(config: ProjectConfig, partialRoot: string) {
  const entries: Array<{ dir: string, namespace: string }> = []
  if (isVueProject(config))
    entries.push({ dir: path.join(partialRoot, 'vue'), namespace: 'vue' })
  if (isReactProject(config))
    entries.push({ dir: path.join(partialRoot, 'react'), namespace: 'react' })
  entries.push({ dir: partialRoot, namespace: 'global' })
  return entries
}

export function generateProject(projectConfig: ProjectConfig) {
  return Effect.gen(function* () {
    yield* Effect.logInfo('🔧 Generating your project...')
    const orchestrator = yield* OrchestratorService
    const targetDir = `./${projectConfig.name}`
    yield* orchestrator.execute(targetDir, projectConfig)
  })
}

export function finishProject() {
  return Effect.gen(function* () {
    yield* Effect.logInfo('🎉 Project generated successfully!')
  })
}
