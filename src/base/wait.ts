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
