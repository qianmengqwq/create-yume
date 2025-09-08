#!/usr/bin/env node

import { NodeContext, NodeFileSystem, NodeRuntime } from '@effect/platform-node'
import { Effect, Logger, LogLevel, pipe } from 'effect'
import { OrchestratorLive } from '@/core/services/orchestrator'
import { FsLive } from '~/fs'
import { TemplateEngineLive } from '~/template-engine'
import { showConfigSummary, showWelcome } from './core/compose'
import { collectQuestions } from './core/questions/compose'
import { CommandLive } from './core/services/command'
import { finishProject, generateProject } from './core/services/compose'
import { PlanLive } from './core/services/planner'

// andThen: 顺序执行，丢弃前者结构
// tap: 基于当前值副作用 & 不改变 pipeline 的值
const main = pipe(
  showWelcome,
  Effect.andThen(collectQuestions),
  Effect.tap(showConfigSummary),
  Effect.tap(generateProject),
  Effect.tap(finishProject),
)

// 需要注意provide的顺序！
const program = main.pipe(
  Effect.provide(Logger.minimumLogLevel(LogLevel.Debug)),
  Effect.provide(Logger.pretty),
  Effect.provide(OrchestratorLive),
  Effect.provide(PlanLive),
  Effect.provide(TemplateEngineLive),
  Effect.provide(CommandLive),
  Effect.provide(FsLive),
  // 平台
  Effect.provide(NodeFileSystem.layer),
  Effect.provide(NodeContext.layer),
)

// https://effect.website/docs/platform/runtime/#running-your-main-program-with-runmain
NodeRuntime.runMain(program)
