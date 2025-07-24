/**
 * Generates a random integer between min and max (inclusive).
 * @param max Maximum value (default: 1)
 * @param min Minimum value (default: 0)
 * @returns Random integer between min and max
 * @example
 *   randomNumber(10, 5) // 5, 6, 7, 8, 9, or 10
 */
export function randomNumber(max = 1, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Parses a string or number to a number, supporting 'px' units.
 * @param value The value to parse (string or number)
 * @returns The parsed number, or null if invalid
 */
export function getSizeAsNumber(value: string | number): number | null {
  if (typeof value === 'number') return value

  const floatValue = parseFloat(value)
  if (isNaN(floatValue)) return null

  if (value.endsWith('px')) return floatValue

  if (String(floatValue) === value) return floatValue

  return null
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param num The number to clamp
 * @param min The minimum value
 * @param max The maximum value
 * @returns The clamped number
 */
export function numberClamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}
