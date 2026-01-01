/**
 * Utility type to omit partial properties from an object type.
 * @example
 *   type A = { a: number; b?: string }
 *   type B = OmitPartials<A> // { a: number }
 */
export type OmitPartials<T> = {
  [K in keyof T as null extends T[K] ? never : K]: T[K]
}
