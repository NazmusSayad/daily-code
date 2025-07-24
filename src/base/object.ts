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

export function objectOmit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach((k) => delete result[k])
  return result
}
