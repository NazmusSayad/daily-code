export function stringCapitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function stringToTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()
  )
}
