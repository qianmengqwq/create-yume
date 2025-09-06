import type { QuestionFn } from '@/types/question'
import { isCancel } from '@clack/prompts'
import { Effect } from 'effect'

// promise => Effect
function handlePromptResult<T>(questionFn: QuestionFn<T>): Effect.Effect<T, never, never> {
  return Effect.gen(function* () {
    // 取消时 Promise 会被 resolve 为一个特殊的 symbol，而不是 reject
    const result = yield* Effect.promise(questionFn)

    // 针对这种情况给他 interrupt 掉。硬中断，无需操心 fiberId 等
    if (isCancel(result)) {
      return yield* Effect.interrupt
    }

    return result as T
  })
}

// 包装一层主要是为了统一处理 cancel
export const ask = <T>(questionFn: QuestionFn<T>) => handlePromptResult(questionFn)
