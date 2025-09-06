import { FileSystem } from '@effect/platform'
import { Context, Effect, Layer } from 'effect'
import { FileIOError } from '@/types/error'

// 借助平台能力，但转化为领域错误
interface FsService {
  readonly exists: (path: string) => Effect.Effect<boolean, FileIOError>
  readonly readFileString: (path: string) => Effect.Effect<string, FileIOError>
  readonly writeFileString: (path: string, content: string) => Effect.Effect<void, FileIOError>
  readonly readFile: (path: string) => Effect.Effect<Uint8Array, FileIOError>
  readonly writeFile: (path: string, data: Uint8Array) => Effect.Effect<void, FileIOError>
  readonly readDirectory: (path: string) => Effect.Effect<readonly string[], FileIOError>
  readonly makeDirectory: (
    path: string,
    options?: { recursive?: boolean }
  ) => Effect.Effect<void, FileIOError>
  readonly ensureDir: (path: string) => Effect.Effect<void, FileIOError>
  readonly remove: (
    path: string,
    options?: { recursive?: boolean, force?: boolean }
  ) => Effect.Effect<void, FileIOError>
  readonly copyFile: (src: string, dest: string) => Effect.Effect<void, FileIOError>
}

class FsServiceTag extends Context.Tag('Fs')<FsServiceTag, FsService>() {}

export const FsLive = Layer.effect(
  FsServiceTag,
  Effect.gen(function* () {
    const platformFs = yield* FileSystem.FileSystem

    const mapErr = (
      op: FileIOError['op'],
      path: string,
    ) => (e: unknown) =>
      new FileIOError({
        op,
        path,
        message: `${op} failed: \n path: ${path} \n ${String(e)}`,
      })

    const exists: FsService['exists'] = path =>
      platformFs.exists(path).pipe(Effect.mapError(mapErr('exists', path))).pipe(Effect.provideService(FileSystem.FileSystem, platformFs))

    const readFileString: FsService['readFileString'] = path =>
      platformFs.readFileString(path).pipe(Effect.mapError(mapErr('read', path))).pipe(Effect.provideService(FileSystem.FileSystem, platformFs))

    const writeFileString: FsService['writeFileString'] = (path, content) =>
      platformFs.writeFileString(path, content).pipe(Effect.mapError(mapErr('write', path))).pipe(Effect.provideService(FileSystem.FileSystem, platformFs))

    const readFile: FsService['readFile'] = path =>
      platformFs.readFile(path).pipe(Effect.mapError(mapErr('read', path))).pipe(Effect.provideService(FileSystem.FileSystem, platformFs))

    const writeFile: FsService['writeFile'] = (path, data) =>
      platformFs.writeFile(path, data).pipe(Effect.mapError(mapErr('write', path))).pipe(Effect.provideService(FileSystem.FileSystem, platformFs))

    const readDirectory: FsService['readDirectory'] = path =>
      platformFs.readDirectory(path).pipe(Effect.mapError(mapErr('read', path))).pipe(Effect.provideService(FileSystem.FileSystem, platformFs))

    const makeDirectory: FsService['makeDirectory'] = (path, options) =>
      platformFs.makeDirectory(path, options).pipe(Effect.mapError(mapErr('mkdir', path))).pipe(Effect.provideService(FileSystem.FileSystem, platformFs))

    const ensureDir: FsService['ensureDir'] = path =>
      makeDirectory(path, { recursive: true })

    const remove: FsService['remove'] = (path, options) =>
      platformFs.remove(path, options).pipe(Effect.mapError(mapErr('remove', path))).pipe(Effect.provideService(FileSystem.FileSystem, platformFs))

    const copyFile: FsService['copyFile'] = (src, dest) =>
      platformFs.copyFile(src, dest).pipe(Effect.mapError(mapErr('write', dest))).pipe(Effect.provideService(FileSystem.FileSystem, platformFs))

    return FsServiceTag.of({ exists, readFileString, writeFileString, readFile, writeFile, readDirectory, makeDirectory, ensureDir, remove, copyFile })
  }),
)

export { FsServiceTag as FsService }
