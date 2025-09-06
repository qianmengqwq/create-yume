import { Effect } from 'effect'
import { FileIOError } from '@/types/error'

export function safeParseJson(input: string, path: string) {
  return Effect.try({
    try: () => JSON.parse(input),
    catch: e => new FileIOError({
      op: 'parse',
      path,
      message: `Failed to parse JSON: ${e}`,
    }),
  })
}
