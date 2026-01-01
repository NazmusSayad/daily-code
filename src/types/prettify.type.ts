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
 * Utility type to simplify and flatten record types for better readability in type hints.
 * @example
 *   type A = { a: number }
 *   type B = PrettifyRecord<{ a: number }> // { a: number }
 *   type C = PrettifyRecord<{ a: number; b: string }> // { a: number; b: string }
 */
export type PrettifyRecord<T> =
  T extends Record<string, unknown> ? Prettify<T> : T

/**
 * Utility type to simplify and flatten array types for better readability in type hints.
 * @example
 *   type A = { a: number }
 *   type B = PrettifyArray<{ a: number }> // { a: number }
 *   type C = PrettifyArray<{ a: number; b: string }> // { a: number; b: string }
 */
export type PrettifyArray<T> =
  T extends Array<infer U> ? (U extends object ? Prettify<U> : U)[] : T
