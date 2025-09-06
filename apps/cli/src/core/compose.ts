import type { ProjectConfig } from '../types/config'
import { intro, outro } from '@clack/prompts'
import { Effect, pipe } from 'effect'

export const showWelcome = Effect.sync(() => {
  intro('welcome to create-yume')
})

export function showCompletionMessage(projectConfig: ProjectConfig) {
  return Effect.sync(() => {
    outro(`项目 ${projectConfig.name} 创建成功！🎉`)
  })
}

// for debugging
function formatConfigSummary(config: ProjectConfig) {
  const baseInfo = [
    '\n📋 Project Configuration:',
    `  Name: ${config.name}`,
    `  Type: ${config.type}`,
    `  Language: ${config.language}`,
    `  Git: ${config.git ? 'Yes' : 'No'}`,
    `  Linting: ${config.linting}`,
  ]

  if (config.type === 'vue') {
    return [
      ...baseInfo,
      `  Build Tool: ${config.buildTool}`,
      `  Router: ${config.router ? 'Yes' : 'No'}`,
      `  State Management: ${config.stateManagement}`,
      `  CSS Preprocessor: ${config.cssPreprocessor}`,
      `  CSS Framework: ${config.cssFramework}`,
    ]
  }
  else if (config.type === 'react') {
    return [
      ...baseInfo,
      `  Build Tool: ${config.buildTool}`,
      `  Router: ${config.router}`,
      `  State Management: ${config.stateManagement}`,
      `  CSS Preprocessor: ${config.cssPreprocessor}`,
      `  CSS Framework: ${config.cssFramework}`,
    ]
  }
  else if (config.type === 'node') {
    return [
      ...baseInfo,
      `  Runtime: ${config.runtime}`,
      `  Package Manager: ${config.packageManager}`,
      `  Framework: ${config.framework}`,
    ]
  }

  return baseInfo
}

export function showConfigSummary(projectConfig: ProjectConfig) {
  return pipe(
    formatConfigSummary(projectConfig),
    Effect.forEach(line => Effect.logInfo(line), { discard: true }),
  )
}
