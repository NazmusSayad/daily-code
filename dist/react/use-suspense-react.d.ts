/**
 * React Suspense utility hook. Throws a promise when suspended is true, triggering a Suspense boundary.
 *
 * @param suspended If true, throws a promise to suspend rendering
 *
 * @example
 * useSuspense(isLoading)
 */
export declare function useSuspense(suspended?: boolean): void;
