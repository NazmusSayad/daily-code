import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'

const inputs = {
  index: 'src/index.ts',
  types: 'src/types/index.ts',
  node: 'src/node/index.ts',
  server: 'src/server/index.ts',
  browser: 'src/browser/index.ts',
  react: 'src/react/index.ts',
} as const

export default defineConfig([
  {
    input: inputs,
    output: [
      {
        dir: 'dist',
        format: 'es',
        sourcemap: true,
        entryFileNames({ name }) {
          return `${name}.mjs`
        },
      },

      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
        entryFileNames({ name }) {
          return `${name}.cjs`
        },
      },
    ],

    external: [/node_modules/],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },

  {
    input: inputs,
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames({ name }) {
        return `${name}.d.ts`
      },
    },

    plugins: [dts({ tsconfig: './tsconfig.json' })],
  },
])
