/**
 * Creates a new object by picking the specified keys from the input object.
 * @param obj The source object
 * @param keys The keys to pick
 * @returns A new object with only the picked keys
 */
export function objectPick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce(
    (res, key) => {
      res[key] = obj[key]
      return res
    },
    {} as Pick<T, K>
  )
}

/**
 * Creates a new object by omitting the specified keys from the input object.
 * @param obj The source object
 * @param keys The keys to omit
 * @returns A new object without the omitted keys
 */
export function objectOmit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach((k) => delete result[k])
  return result
}
