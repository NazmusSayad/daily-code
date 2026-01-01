/**
 * Utility type to simplify and flatten record types for better readability in type hints.
 * @deprecated Use `Nullable` instead
 * @example
 *   type A = { a: number }
 *   type B = Nullify<{ a: number }> // { a: number | null | undefined }
 *   type C = Nullify<{ a: number; b: string }> // { a: number | null | undefined; b: string | null | undefined }
 */
export type Nullify<T> = {
  [K in keyof T]: T[K] | null | undefined
}

/**
 * Utility type to simplify and flatten record types for better readability in type hints.
 * @example
 *   type A = { a: number }
 *   type B = Nullify<{ a: number }> // { a: number | null | undefined }
 *   type C = Nullify<{ a: number; b: string }> // { a: number | null | undefined; b: string | null | undefined }
 */
export type Nullable<T> = {
  [K in keyof T]: T[K] | null | undefined
}

/**
 * Utility type to simplify and flatten array types for better readability in type hints.
 * @deprecated Use `NullablePartial` instead
 * @example
 *   type A = { a: number }
 *   type B = NullifyPartials<{ a: number }> // { a?: number | null | undefined }
 *   type C = NullifyPartial<{ a: number; b: string }> // { a?: number | null | undefined; b?: string | null | undefined }
 */
export type NullifyPartial<T> = {
  [K in keyof T]?: T[K] | null | undefined
}

/**
 * Utility type to simplify and flatten record types for better readability in type hints.
 * @example
 *   type A = { a: number }
 *   type B = NullablePartial<{ a: number }> // { a?: number | null | undefined }
 *   type C = NullablePartial<{ a: number; b: string }> // { a?: number | null | undefined; b?: string | null | undefined }
 */
export type NullablePartial<T> = {
  [K in keyof T]?: T[K] | null | undefined
}
