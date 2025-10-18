import typescript from '@rollup/plugin-typescript'
import { defineConfig, type OutputOptions, type RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'

function createOutput(
  input_NO_EXT: string,
  output_NO_EXT: string
): RollupOptions[] {
  return [
    {
      input: `src/${input_NO_EXT}.ts`,
      output: [
        { file: `dist/${output_NO_EXT}.mjs`, format: 'es', sourcemap: true },
        { file: `dist/${output_NO_EXT}.cjs`, format: 'cjs', sourcemap: true },
      ] satisfies OutputOptions[],
      plugins: [typescript({ tsconfig: './tsconfig.json' })],
      external: [/node_modules/],
    },

    {
      input: `src/${input_NO_EXT}.ts`,
      output: { file: `dist/${output_NO_EXT}.d.ts`, format: 'es' },
      plugins: [dts()],
    },
  ]
}

export default defineConfig([
  ...createOutput('base/index', 'index'),
  ...createOutput('types/index', 'types'),
  ...createOutput('node/index', 'node'),
  ...createOutput('server/index', 'server'),
  ...createOutput('browser/index', 'browser'),
])
