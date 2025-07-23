/**
 * Utility type to simplify and flatten object types for better readability in type hints.
 * @example
 *   type A = { a: number }
 *   type B = Prettify<A & { b: string }> // { a: number; b: string }
 */
export type Prettify<T extends object> = {
  [Key in keyof T]: T[Key]
} & {}
