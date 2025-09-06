import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  outDir: 'dist',
  format: 'esm',
  dts: false,
  // 外部依赖：不打进包，由运行时从 node_modules 加载
  external: ['effect', '@clack/prompts', 'handlebars-helpers'],
  tsconfig: 'tsconfig.build.json',
  minify: true,
})
