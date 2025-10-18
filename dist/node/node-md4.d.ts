/**
 * Applies a workaround to the Node.js crypto module to support MD4 hashing.
 * This is necessary because MD4 is no longer supported in Node.js 20 and later.
 * @example
 * ```js
 * applyNodeMD4Issue()
 * ```
 */
export declare function applyNodeMD4Issue(): void;
