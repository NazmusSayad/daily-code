import { type InternalModuleFormat } from 'rolldown'
import { defineConfig } from 'tsdown'
import packageJSON from './package.json' with { type: 'json' }

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'base/array': './src/base/array.ts',
    'base/object': './src/base/object.ts',
    'base/string': './src/base/string.ts',
    'base/number': './src/base/number.ts',
    'base/size': './src/base/size.ts',
    'base/otp': './src/base/otp.ts',

    node: './src/node/index.ts',
    'node/md4': './src/node/node-md4.ts',
    'node/windows-env': './src/node/win-env.ts',

    server: './src/server/index.ts',
    'server/route': './src/server/route-wrapper/index.ts',
    'server/socket-io': './src/server/socket-router/index.ts',

    browser: './src/browser/index.ts',

    react: './src/react/index.ts',
  },

  outDir: './dist',
  tsconfig: './tsconfig.json',
  format: ['cjs', 'es'] satisfies InternalModuleFormat[],

  dts: true,
  sourcemap: true,

  target: 'ES6',
  minify: 'dce-only',

  external: [
    /node:/gim,
    /node_modules/gim,
    ...getExternal((packageJSON as any).dependencies),
    ...getExternal((packageJSON as any).devDependencies),
    ...getExternal((packageJSON as any).peerDependencies),
  ],

  outputOptions(options, format) {
    const ext = format === 'cjs' ? 'cjs' : format === 'es' ? 'mjs' : 'js'

    return {
      ...options,
      entryFileNames: `[name].${ext}`,
      chunkFileNames: `__[name].[hash].${ext}`,
    }
  },
})

function getExternal(dependencies: unknown) {
  return Object.keys((dependencies ?? {}) as Record<string, string>).map(
    (dep) => new RegExp(`(^${dep}$)|(^${dep}/)`)
  )
}
