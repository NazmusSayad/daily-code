/**
 * Creates an array of numbers from start (inclusive) to end (exclusive).
 * @param start The starting number (inclusive)
 * @param end The ending number (exclusive)
 * @returns An array of numbers from start to end - 1
 */
export function numberRange(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, i) => start + i)
}

/**
 * Returns a new array with the elements shuffled randomly.
 * @param arr The array to shuffle
 * @returns A new shuffled array
 */
export function arrayShuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

/**
 * Splits an array into chunks of the specified size.
 * @param arr The array to chunk
 * @param size The size of each chunk
 * @returns An array of array chunks
 */
export function arrayChunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )
}

/**
 * Partitions an array into two arrays based on a predicate function.
 * @param arr The array to partition
 * @param predicate The function to test each element
 * @returns A tuple: [elements passing predicate, elements failing predicate]
 */
export function arrayPartition<T>(
  arr: T[],
  predicate: (v: T) => boolean
): [T[], T[]] {
  const pass: T[] = []
  const fail: T[] = []
  for (const item of arr) (predicate(item) ? pass : fail).push(item)
  return [pass, fail]
}

/**
 * Sorts an array by frequency of elements.
 * @param arr The array to sort
 * @returns A new array sorted by frequency
 */
export function sortByFrequency<T>(arr: T[]): T[] {
  const freqMap = new Map<T, number>()

  for (const item of arr) {
    freqMap.set(item, (freqMap.get(item) ?? 0) + 1)
  }

  const sorted = [...freqMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([item]) => item)

  return [...new Set(sorted)]
}
