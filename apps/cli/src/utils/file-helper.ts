import type { PropertyPath } from 'lodash-es'
import { get as _get, has as _has, merge as _merge, set as _set, unset as _unset } from 'lodash-es'

export type JsonDraft = Record<string, unknown>
export type Path = string | Array<string | number>

export function when(cond: boolean, mod: (draft: JsonDraft) => void) {
  return (draft: JsonDraft) => {
    if (cond)
      mod(draft)
  }
}

// setAt: 设置路径上的值（默认覆盖）
export function setAt(path: Path, value: unknown, opts?: { overwrite?: boolean }) {
  return (draft: JsonDraft) => {
    const p = path as PropertyPath
    if (opts?.overwrite === false && _has(draft, p))
      return
    _set(draft, p, value)
  }
}

// mergeAt: 将一组键值合并到路径对应的对象下
export function mergeAt(path: Path, values: Record<string, unknown>, opts?: { overwrite?: boolean }) {
  return (draft: JsonDraft) => {
    const p = path as PropertyPath
    const current = _get(draft, p)
    const base: Record<string, unknown> = (current && typeof current === 'object') ? (current as Record<string, unknown>) : {}
    if (opts?.overwrite === true) {
      _set(draft, p, _merge(base, values))
    }
    else {
    // 只在缺失时写入
      const merged: Record<string, unknown> = { ...base }
      for (const k of Object.keys(values)) {
        if (!(k in merged))
          merged[k] = values[k]
      }
      _set(draft, p, merged)
    }
  }
}

// updateAt: 用函数更新路径上的值
export function updateAt(path: Path, updater: (cur: unknown) => unknown) {
  return (draft: JsonDraft) => {
    const p = path as PropertyPath
    const cur = _get(draft, p)
    _set(draft, p, updater(cur))
  }
}

// removeAt: 删除路径上的键
export function removeAt(path: Path) {
  return (draft: JsonDraft) => {
    const p = path as PropertyPath
    _unset(draft, p)
  }
}

export function scripts(entries: Record<string, string>, opts?: { overwrite?: boolean }) {
  return mergeAt('scripts', entries, opts)
}

export function deps(entries: Record<string, string>, opts?: { overwrite?: boolean }) {
  return mergeAt('dependencies', entries, opts)
}

export function devDeps(entries: Record<string, string>, opts?: { overwrite?: boolean }) {
  return mergeAt('devDependencies', entries, opts)
}

export function appendLineOnce(line: string) {
  return (s: string) =>
    s.split(/\r?\n/).includes(line) ? s : `${(s.endsWith('\n') ? s : `${s}\n`) + line}\n`
}

export function ensureHeader(header: string) {
  return (s: string) =>
    s.startsWith(header) ? s : `${header}${header.endsWith('\n') ? '' : '\n'}${s}`
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return Object.prototype.toString.call(v) === '[object Object]'
}

export interface SortJsonKeysOptions {
  caseSensitive?: boolean
  natural?: boolean
  comparator?: (a: string, b: string) => number
}

// 深度排序对象键，确保稳定 JSON 输出（对象按键名排序，数组保持顺序）
// 默认大小写不敏感 + 自然排序，可通过 options 覆盖
// 和 eslint 规则依然有区别，怎么办
export function sortJsonKeys(
  input: Record<string, unknown>,
  options: SortJsonKeysOptions = {},
): Record<string, unknown> {
  const { caseSensitive = false, natural = true, comparator } = options
  const collator = new Intl.Collator(undefined, {
    numeric: natural,
    sensitivity: caseSensitive ? 'variant' : 'base',
  })
  const compare = comparator ?? ((a: string, b: string) => collator.compare(a, b))

  const sortDeep = (value: unknown): unknown => {
    if (Array.isArray(value))
      return value.map(sortDeep)
    if (isPlainObject(value)) {
      const entries = Object.entries(value)
      entries.sort(([ka], [kb]) => compare(ka, kb))
      const out: Record<string, unknown> = {}
      for (const [k, v] of entries) out[k] = sortDeep(v)
      return out
    }
    return value
  }

  return sortDeep(input) as Record<string, unknown>
}
