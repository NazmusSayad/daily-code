export function numberRange(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, i) => start + i)
}

export function arrayShuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function arrayChunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )
}

export function arrayPartition<T>(
  arr: T[],
  predicate: (v: T) => boolean
): [T[], T[]] {
  const pass: T[] = []
  const fail: T[] = []
  for (const item of arr) (predicate(item) ? pass : fail).push(item)
  return [pass, fail]
}
