export type TemplateRegistry<T> = Record<string, Template<T>>

export interface Template<T> {
  template: string
  target: string | ((config: T) => string)
  condition: (config: T) => boolean
}
