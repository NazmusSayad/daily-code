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
