// DSL Builders
// 是否读已有文件取决于任务的阶段，如果是 generate + modify 则需要后续操作覆盖原有模板，默认 false，即视为纯由函数组合生成，此时的基础内容由 base 构建
export interface JsonBuilder {
  readExisting: (flag?: boolean) => JsonBuilder
  // 是否在写出 JSON 前对对象键进行稳定排序（一般按字母序）。
  // package.json有更细致的实现
  // 仅影响输出顺序，不改变语义
  sortKeys: (flag?: boolean) => JsonBuilder
  base: (fn: () => Record<string, unknown>) => JsonBuilder
  // 不可变打补丁
  merge: (
    patch: Record<string, unknown> | ((draft: Record<string, unknown>) => Record<string, unknown>),
  ) => JsonBuilder
  // 可变就地改
  modify: (
    fn: (draft: Record<string, unknown>) => void,
  ) => JsonBuilder
  finalize: (
    fn: (draft: Record<string, unknown>) => void,
  ) => void
}

export interface TextBuilder {
  readExisting: (flag?: boolean) => TextBuilder
  base: (fn: () => string) => TextBuilder
  // 纯函数式文本变换
  transform: (
    fn: (current: string) => string,
  ) => TextBuilder
}

export interface ComposeDSL {
  json: (path: string) => JsonBuilder
  text: (path: string) => TextBuilder
  copy: (src: string, path: string) => void
  render: (src: string, path: string, data?: object) => void
}
