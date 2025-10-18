/**
 * Converts a hex color code to an RGB object.
 * @param hex - The hex color code to convert.
 * @returns An object with the red, green, and blue values.
 * @throws {Error} If the hex color code is invalid.
 * @example
 * ```js
 * hexToRGB('#ff0000') // { r: 255, g: 0, b: 0 }
 * ```
 */
export declare function hexToRGB(hex: string): {
    r: number;
    g: number;
    b: number;
};
