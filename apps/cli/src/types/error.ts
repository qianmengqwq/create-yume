// 引入了 platform，针对未处理的冒泡情况，还是包含比较好
import type { PlatformError } from '@effect/platform/Error'
import { Data } from 'effect'

export class TemplateError extends Data.TaggedError('TemplateCompileError')<{
  message: string
  templatePath?: string
  stage?: 'compile' | 'render'
  cause?: unknown
}> {}

export class FileIOError extends Data.TaggedError('FileIOError')<{
  op: 'read' | 'write' | 'mkdir' | 'exists' | 'remove' | 'copy' | 'parse'
  path: string
  message: string
  projectType?: string
  targetDir?: string
}> {}

export class UnknownError extends Data.TaggedError('UnknownError') {
  constructor() {
    super()
    this.message = '未知错误'
  }
}

export type CLIError
  = | PlatformError
    | TemplateError
    | FileIOError
    | UnknownError
