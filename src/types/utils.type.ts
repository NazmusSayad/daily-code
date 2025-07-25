/**
 * Utility type to simplify and flatten object types for better readability in type hints.
 * @example
 *   type A = { a: number }
 *   type B = Prettify<A & { b: string }> // { a: number; b: string }
 */
export type Prettify<T extends object> = {
  [Key in keyof T]: T[Key]
} & {}

/**
 * Utility type to omit partial properties from an object type.
 * @example
 *   type A = { a: number; b?: string }
 *   type B = OmitPartials<A> // { a: number }
 */
export type OmitPartials<T> = {
  [K in keyof T as null extends T[K] ? never : K]: T[K]
}
