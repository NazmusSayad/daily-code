/**
 * Converts a hex color code to an RGB object.
 * @param hex - The hex color code to convert.
 * @returns An object with the red, green, and blue values.
 * @throws {Error} If the hex color code is invalid.
 * @example
 * ```js
 * hexToRGB('#ff0000') // { r: 255, g: 0, b: 0 }
 * ```
 */
export function hexToRGB(hex: string) {
  let localHex = hex.toUpperCase()

  if (/^#[0-9A-F]{3}$/.test(localHex)) {
    localHex = `#${localHex[1]}${localHex[1]}${localHex[2]}${localHex[2]}${localHex[3]}${localHex[3]}`
  }

  if (!/^#[0-9A-F]{6}$/.test(localHex)) {
    throw new Error('Invalid hex color code')
  }

  const color = localHex.replace('#', '')
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)

  return { r, g, b }
}
