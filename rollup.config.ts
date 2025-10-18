import typescript from '@rollup/plugin-typescript'
import { defineConfig, type OutputOptions, type RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'

function createOutput(input: string, output: string): RollupOptions[] {
  return [
    {
      input: `src/${input}`,
      output: [
        { file: `dist/${output}.mjs`, format: 'es', sourcemap: true },
        { file: `dist/${output}.cjs`, format: 'cjs', sourcemap: true },
      ] satisfies OutputOptions[],
      plugins: [typescript({ tsconfig: './tsconfig.json' })],
      external: [/node_modules/],
    },

    {
      input: `src/${input}`,
      output: { file: `dist/${output}.d.ts`, format: 'es' },
      plugins: [dts()],
    },
  ]
}

export default defineConfig([
  ...createOutput('base/index.ts', 'index'),
  ...createOutput('types/index.ts', 'types'),
  ...createOutput('node/index.ts', 'node'),
  ...createOutput('server/index.ts', 'server'),
  ...createOutput('browser/index.ts', 'browser'),
  ...createOutput('react/index.ts', 'react'),
])
