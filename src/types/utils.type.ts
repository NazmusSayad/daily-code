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

/**
 * Utility type to simplify and flatten record types for better readability in type hints.
 * @example
 *   type A = { a: number }
 *   type B = Nullify<{ a: number }> // { a: number | null | undefined }
 *   type C = Nullify<{ a: number; b: string }> // { a: number | null | undefined; b: string | null | undefined }
 */
export type Nullify<T> = {
  [K in keyof T]: T[K] | null | undefined
}

/**
 * Utility type to simplify and flatten array types for better readability in type hints.
 * @example
 *   type A = { a: number }
 *   type B = NullifyPartials<{ a: number }> // { a?: number | null | undefined }
 *   type C = NullifyPartial<{ a: number; b: string }> // { a?: number | null | undefined; b?: string | null | undefined }
 */
export type NullifyPartial<T> = {
  [K in keyof T]?: T[K] | null | undefined
}
