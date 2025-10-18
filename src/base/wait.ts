/**
 * Returns a promise that resolves after a specified duration (in milliseconds).
 * @param duration Time to wait in milliseconds (default: 0)
 * @returns Promise that resolves after the duration
 * @example
 *   await wait(1000) // waits 1 second
 */
export function wait(duration?: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

/**
 * Creates a debounce function.
 * @param fn - The function to debounce.
 * @param delay - The delay in milliseconds.
 * @returns The debounced function.
 * @example
 * ```js
 * const debouncedFn = createDebounce(() => console.log('debounced'), 1000)
 * debouncedFn()
 * ```
 */
export function createDebounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Creates a throttle function.
 * @param fn - The function to throttle.
 * @param limit - The limit in milliseconds.
 * @returns The throttled function.
 * @example
 * ```js
 * const throttledFn = createThrottle(() => console.log('throttled'), 1000)
 * throttledFn()
 * ```
 */
export function createThrottle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean | undefined

  return (...args) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
