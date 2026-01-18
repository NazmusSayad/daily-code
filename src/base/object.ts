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
 * Creates a new object by omitting null and undefined values from the input object.
 * @param obj The source object
 * @returns A new object without null and undefined values
 */
export function objectOmitNullish<T extends object>(
  obj: T
): {
  [K in keyof T as null extends T[K]
    ? never
    : undefined extends T[K]
      ? never
      : K]: T[K]
} {
  const result = {} as Record<string, unknown>

  for (const key in obj) {
    const value = obj[key]

    if (value !== null && value !== undefined) {
      result[key] = value
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result as any
}

/**
 * Creates a new object by omitting null values from the input object.
 * @param obj The source object
 * @returns A new object without null values
 */
export function objectOmitNull<T extends object>(
  obj: T
): {
  [K in keyof T as null extends T[K] ? never : K]: T[K]
} {
  const result = {} as Record<string, unknown>

  for (const key in obj) {
    const value = obj[key]

    if (value !== null) {
      result[key] = value
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result as any
}

/**
 * Creates a new object by omitting undefined values from the input object.
 * @param obj The source object
 * @returns A new object without undefined values
 */
export function objectOmitUndefined<T extends object>(
  obj: T
): {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
} {
  const result = {} as Record<string, unknown>

  for (const key in obj) {
    const value = obj[key]

    if (value !== undefined) {
      result[key] = value
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result as any
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
