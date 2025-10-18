/**
 * @param color - Hex color code (e.g. #FFFF00 or #FF0)
 * @returns Base64 encoded PNG image data URL of a 1x1 pixel image with the specified color
 *
 * @example
 * ```js
 * generateColorImage('#ff0000')
 * // data:image/png;base64,iVBO...
 * ```
 *
 * @throws {Error} If the hex color code is invalid or if Buffer is not available in the environment
 *
 * @requires Buffer
 * @requires Uint8Array
 */
export declare function monoColorImage(color: string): string;
