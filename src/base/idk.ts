export function getSizeAsNumber(value: string | number): number | null {
  if (typeof value === 'number') return value

  const floatValue = parseFloat(value)
  if (isNaN(floatValue)) return null

  if (value.endsWith('px')) return floatValue

  if (String(floatValue) === value) return floatValue

  return null
}
