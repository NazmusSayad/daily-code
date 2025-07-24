import { hexToRGB } from '@/base/hex-to-rgb'
import { adler32, chunk } from './lib'

/**
 * @param color - Hex color code (e.g. #FFFF00 or #FF0)
 * @returns Base64 encoded PNG image data URL of a 1x1 pixel image with the specified color
 *
 * @example
 * ```js
 * generateColorImage('#ff0000')
 * // data:image/png;base64,iVBO...
 * ```
 *
 * @throws {Error} If the hex color code is invalid or if Buffer is not available in the environment
 *
 * @requires Buffer
 * @requires Uint8Array
 */
export function monoColorImage(color: string): string {
  const { r, g, b } = hexToRGB(color)

  const idatRawData = [0x00, r, g, b]
  const adler = adler32(idatRawData)

  const zlibStream = [
    0x78,
    0x01,
    0x01,
    0x04,
    0x00,
    0xfb,
    0xff,
    ...idatRawData,
    ...adler,
  ]

  const png = [
    0x89,
    0x50,
    0x4e,
    0x47,
    0x0d,
    0x0a,
    0x1a,
    0x0a,
    ...chunk('IHDR', [0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0]),
    ...chunk('IDAT', zlibStream),
    ...chunk('IEND', []),
  ]

  if (typeof Buffer === 'undefined' || typeof Buffer.from !== 'function') {
    throw new Error('Buffer is not available in this environment')
  }

  const base64 = Buffer.from(Uint8Array.from(png)).toString('base64')
  return `data:image/png;base64,${base64}`
}
