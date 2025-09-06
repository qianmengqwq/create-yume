export type GenerateTask = RenderTask | CopyTask
export type ModifyTask = JsonTask | TextTask
export type Task = GenerateTask | ModifyTask

interface ITask {
  kind: 'render' | 'copy' | 'json' | 'text'
  path: string
}

export interface RenderTask extends ITask {
  kind: 'render'
  src: string
  data?: unknown
}
export interface CopyTask extends ITask {
  kind: 'copy'
  src: string
}

export interface JsonTask extends ITask {
  kind: 'json'
  // 需要显示指定才不报错，是bug？
  readExisting: boolean | undefined
  sortKeys: boolean | undefined
  reducers: Array<(draft: Record<string, unknown>) => void>
  base?: () => Record<string, unknown>
  finalize?: (draft: Record<string, unknown>) => void
}

export interface TextTask extends ITask {
  kind: 'text'
  readExisting: boolean | undefined
  transforms: Array<(current: string) => string>
  base?: () => string
}

export interface Plan { tasks: Task[] }
