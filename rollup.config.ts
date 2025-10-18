import typescript from '@rollup/plugin-typescript'
import crypto from 'node:crypto'
import { defineConfig, type ModuleFormat, type OutputOptions } from 'rollup'
import dts from 'rollup-plugin-dts'

const inputs = {
  index: 'src/index.ts',

  node: 'src/node/index.ts',
  server: 'src/server/index.ts',

  browser: 'src/browser/index.ts',
  react: 'src/react/index.ts',
} as const

export default defineConfig([
  {
    input: inputs,
    external: [/node_modules/gim],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
    output: [
      createOutput({ format: 'esm', ext: 'mjs', sourcemap: true }),
      createOutput({ format: 'commonjs', ext: 'cjs', sourcemap: true }),
      createOutput({ format: 'amd', ext: 'amd.js', sourcemap: true }),
      createOutput({ format: 'system', ext: 'system.js', sourcemap: true }),
    ],
  },

  {
    input: inputs,
    plugins: [dts({ tsconfig: './tsconfig.json' })],
    output: createOutput({ format: 'esm', ext: 'd.ts', sourcemap: false }),
  },
])

function createOutput(options: {
  format: ModuleFormat
  ext: string
  sourcemap: boolean
}): OutputOptions {
  return {
    dir: 'dist',
    indent: '  ',

    format: options.format,
    sourcemap: options.sourcemap,

    entryFileNames({ name }) {
      return `${name}.${options.ext}`
    },

    chunkFileNames({ name }) {
      return `${name}.${crypto.randomUUID()}.${options.ext}`
    },
  }
}
