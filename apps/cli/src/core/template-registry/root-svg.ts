import type { ComposeDSL } from '@/types/dsl'
import * as path from 'node:path'

export function buildRootSvg(dsl: ComposeDSL, templateRoot: string) {
  const src = path.join(templateRoot, 'assets', 'moon-star.svg')
  dsl.copy(src, 'public/moon-star.svg')
}
