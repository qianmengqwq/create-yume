// 编排整个阶段

import type { CommandExecutor } from '@effect/platform/CommandExecutor'
import type { ProjectConfig } from '@/types/config'
import type { ComposeDSL } from '@/types/dsl'
import type { CommandError, FileIOError, TemplateError } from '@/types/error'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Context, Effect, Layer } from 'effect'
import { isFrontendProject } from '@/utils/type-guard'
import { PlanService } from '~/planner'
import { TemplateEngineService } from '~/template-engine'
import { buildPackageJson } from '../modifier/package-json'
import { buildRootSvg } from '../template-registry/root-svg'
import { buildTemplates, collectPartialEntries } from './compose'

interface OrchestratorService {
  readonly execute: (
    baseDir: string,
    config: ProjectConfig,
  ) => Effect.Effect<void, FileIOError | TemplateError | CommandError, CommandExecutor>
}

class OrchestratorTag extends Context.Tag('Orchestrator')<OrchestratorTag, OrchestratorService>() {}

export const OrchestratorLive = Layer.effect(
  OrchestratorTag,
  Effect.gen(function* () {
    const planner = yield* PlanService
    const templateEngine = yield* TemplateEngineService
    // 计算模板根目录：dist 文件夹旁的 templates 目录（发布包中二者同级）
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const templateRoot = path.resolve(__dirname, '../templates')
    const partialRoot = path.join(templateRoot, 'partials')

    const execute: OrchestratorService['execute'] = (baseDir, config) =>
      Effect.gen(function* () {
        // 1. 注册 helpers
        yield* templateEngine.registerHelpers()

        // 2. 注册 partials（按框架命名空间 + 全局）
        const partialEntries = collectPartialEntries(config, partialRoot)
        for (const p of partialEntries) {
          yield* templateEngine.registerPartials(p.dir, p.namespace)
        }

        // 3. 组合 DSL（纯同步，不能产生 Effect）
        const program = (dsl: ComposeDSL) => {
          if (!isFrontendProject(config))
            return

          // root.svg + package.json
          buildRootSvg(dsl, templateRoot)
          buildPackageJson(dsl, config)

          // 注册模板（纯函数）
          buildTemplates(dsl, templateRoot, config)
        }

        // 4. 生成计划并应用
        const plan = yield* planner.build(program)
        yield* planner.apply(plan, baseDir, config)
      })

    return OrchestratorTag.of({ execute })
  }),
)

export { OrchestratorTag as OrchestratorService }
