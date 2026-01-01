/**
 * Utility type to allow string literals to be used as strings.
 * @example
 *   type A = StringLiteralLoose<'hello' | 'world'>
 *   const a: A = 'hello'
 *   const b: A = 'world'
 *   const c: A = 'something else'
 */
export type StringLiteralLoose<T extends string> = T | (string & {})
