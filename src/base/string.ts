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

/**
 * Truncates a string to a specified length.
 * @param str - The string to truncate.
 * @param length - The maximum length of the string.
 * @returns The truncated string.
 */
export function stringTruncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + '...' : str
}

/**
 * Generates a UUID (v4).
 * @returns The generated UUID.
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  )
}
