/**
 * Creates a React Suspense handler for promises, allowing you to throw a promise to trigger React Suspense boundaries.
 *
 * @template T The resolved type of the promise
 * @param promise Optional promise to be handled by the suspense boundary
 * @returns A function to handle promises for Suspense, or the result/error tuple if promise is provided
 *
 * @example
 * // Usage with a promise
 * const [data, error] = createReactSuspense(fetchData())
 *
 * // Usage as a handler
 * const handleSuspense = createReactSuspense()
 * const [data, error] = handleSuspense(fetchData())
 */
export declare function createReactSuspense<T = void>(promise?: Promise<T>): T extends void ? <P extends Promise<unknown>>(promise: P) => [Awaited<P>, unknown] : () => [T, unknown];
