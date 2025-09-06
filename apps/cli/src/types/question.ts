import type { Option } from '@clack/prompts'

export interface Question<T> {
  readonly _tag: 'Question'
  readonly message: string
  readonly options?: Option<T>[]
  readonly validate?: (input: T) => string | null
}

export type QuestionFn<T> = () => Promise<T | symbol>
