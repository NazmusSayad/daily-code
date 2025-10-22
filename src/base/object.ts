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

/**
 * Returns undefined if the object has no keys.
 * @param obj The object to check
 * @returns The object if it has keys, undefined otherwise
 */
export function undefinedIfHasNoKeys<T extends object>(obj: T): T | undefined {
  const values = Object.values(obj)

  if (values.every((value) => value == null)) {
    return undefined
  }

  return obj
}
