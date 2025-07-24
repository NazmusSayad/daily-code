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

export function getSizeAsNumber(value: string | number): number | null {
  if (typeof value === 'number') return value

  const floatValue = parseFloat(value)
  if (isNaN(floatValue)) return null

  if (value.endsWith('px')) return floatValue

  if (String(floatValue) === value) return floatValue

  return null
}

export function numberClamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}
