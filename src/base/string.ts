/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize
 * @returns The capitalized string
 */
export function stringCapitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Converts a string to title case (first letter of each word capitalized).
 * @param str The string to convert
 * @returns The title-cased string
 */
export function stringToTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()
  )
}
