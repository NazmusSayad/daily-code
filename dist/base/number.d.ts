/**
 * Generates a random integer between min and max (inclusive).
 * @param max Maximum value (default: 1)
 * @param min Minimum value (default: 0)
 * @returns Random integer between min and max
 * @example
 *   randomNumber(10, 5) // 5, 6, 7, 8, 9, or 10
 */
export declare function randomNumber(max?: number, min?: number): number;
/**
 * Parses a string or number to a number, supporting 'px' units.
 * @param value The value to parse (string or number)
 * @returns The parsed number, or null if invalid
 */
export declare function getSizeAsNumber(value: string | number): number | null;
/**
 * Clamps a number between a minimum and maximum value.
 * @param num The number to clamp
 * @param min The minimum value
 * @param max The maximum value
 * @returns The clamped number
 */
export declare function numberClamp(num: number, min: number, max: number): number;
