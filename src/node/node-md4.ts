import * as crypto from 'crypto'

/**
 * Applies a workaround to the Node.js crypto module to support MD4 hashing.
 * This is necessary because MD4 is no longer supported in Node.js 20 and later.
 * @example
 * ```js
 * applyNodeMD4Issue()
 * ```
 */
export function applyNodeMD4Issue() {
  try {
    crypto.createHash('md4')
  } catch {
    console.warn(
      'Crypto "md4" is not supported anymore by this Node version',
      '\n',
      'Replacing "md4" with "md5"'
    )

    const origCreateHash = crypto.createHash

    function fakeCreateHash(alg: string, opts: crypto.HashOptions) {
      return origCreateHash(alg === 'md4' ? 'md5' : alg, opts)
    }

    // @ts-expect-error - This is a workaround to support MD4 hashing
    crypto.createHash = fakeCreateHash
  }
}
