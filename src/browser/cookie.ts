export interface CookieOptions {
  expires?: Date | string
  maxAge?: number
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}

/**
 * Sets a cookie with the specified name, value, and options.
 * @param name The name of the cookie
 * @param value The value of the cookie
 * @param options Additional options for the cookie
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (options.expires) {
    const expires =
      options.expires instanceof Date
        ? options.expires.toUTCString()
        : options.expires
    cookieStr += `; expires=${expires}`
  }

  if (options.maxAge) cookieStr += `; max-age=${options.maxAge}`
  if (options.path) cookieStr += `; path=${options.path}`
  if (options.domain) cookieStr += `; domain=${options.domain}`
  if (options.secure) cookieStr += `; secure`
  if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`

  document.cookie = cookieStr
}

/**
 * Gets the value of a cookie by name.
 * @param name The name of the cookie to retrieve
 * @returns The cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split('; ') : []
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=')
    if (decodeURIComponent(key) === name) return decodeURIComponent(value)
  }
  return null
}

/**
 * Deletes a cookie by setting its expiration to a past date.
 * @param name The name of the cookie to delete
 * @param options Additional options (path, domain, etc.)
 */
export function deleteCookie(name: string, options: CookieOptions = {}): void {
  setCookie(name, '', { ...options, expires: 'Thu, 01 Jan 1970 00:00:00 GMT' })
}

/**
 * Checks if a cookie with the given name exists.
 * @param name The name of the cookie to check
 * @returns True if the cookie exists, false otherwise
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null
}

/**
 * Gets all cookies as a key-value object.
 * @returns An object containing all cookie key-value pairs
 */
export function getAllCookies(): Record<string, string> {
  const cookies = document.cookie ? document.cookie.split('; ') : []
  return cookies.reduce((acc: Record<string, string>, cookie) => {
    const [key, value] = cookie.split('=')
    acc[decodeURIComponent(key)] = decodeURIComponent(value)
    return acc
  }, {})
}
