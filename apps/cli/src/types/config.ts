import type {
  BaseFrontendAppType,
  BuildTool,
  CSSFramework,
  CSSPreprocessor,
  NodeFramework,
  NodeRuntime,
  PackageManager,
  ReactRouter,
  ReactStateManagement,
  Router,
  StateManagement,
} from './project'

export type CreateMode = 'create' | 'preset'
export type Preset = 'react-app' | 'vue-app'

export type Language = 'typescript' | 'javascript'
export type Linting = 'antfu-eslint' | 'none'

export interface BaseProjectConfig {
  readonly name: string
  readonly language: Language
  readonly git: boolean
  readonly linting: Linting
}

export interface BaseFrontendAppConfig extends BaseProjectConfig {
  readonly type: BaseFrontendAppType
  readonly buildTool: BuildTool
  readonly router: Router
  readonly stateManagement: StateManagement
  readonly cssPreprocessor: CSSPreprocessor
  readonly cssFramework: CSSFramework
}

export interface VueProjectConfig extends BaseFrontendAppConfig {
  readonly type: 'vue'
  readonly router: boolean
  readonly stateManagement: boolean
}

export interface ReactProjectConfig extends BaseFrontendAppConfig {
  readonly type: 'react'
  readonly router: ReactRouter
  readonly stateManagement: ReactStateManagement
}

export interface NodeProjectConfig extends BaseProjectConfig {
  readonly type: 'node'
  readonly runtime: NodeRuntime
  readonly packageManager: PackageManager
  readonly framework: NodeFramework
}

export type ProjectConfig = VueProjectConfig | ReactProjectConfig | NodeProjectConfig
