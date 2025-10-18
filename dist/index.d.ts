export { OmitPartials, Prettify, PrettifyRecord } from './types.js';

/**
 * Creates an array of numbers from start (inclusive) to end (exclusive).
 * @param start The starting number (inclusive)
 * @param end The ending number (exclusive)
 * @returns An array of numbers from start to end - 1
 */
declare function numberRange(start: number, end: number): number[];
/**
 * Returns a new array with the elements shuffled randomly.
 * @param arr The array to shuffle
 * @returns A new shuffled array
 */
declare function arrayShuffle<T>(arr: T[]): T[];
/**
 * Splits an array into chunks of the specified size.
 * @param arr The array to chunk
 * @param size The size of each chunk
 * @returns An array of array chunks
 */
declare function arrayChunk<T>(arr: T[], size: number): T[][];
/**
 * Partitions an array into two arrays based on a predicate function.
 * @param arr The array to partition
 * @param predicate The function to test each element
 * @returns A tuple: [elements passing predicate, elements failing predicate]
 */
declare function arrayPartition<T>(arr: T[], predicate: (v: T) => boolean): [T[], T[]];

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
declare function hexToRGB(hex: string): {
    r: number;
    g: number;
    b: number;
};

/**
 * Generates a random integer between min and max (inclusive).
 * @param max Maximum value (default: 1)
 * @param min Minimum value (default: 0)
 * @returns Random integer between min and max
 * @example
 *   randomNumber(10, 5) // 5, 6, 7, 8, 9, or 10
 */
declare function randomNumber(max?: number, min?: number): number;
/**
 * Parses a string or number to a number, supporting 'px' units.
 * @param value The value to parse (string or number)
 * @returns The parsed number, or null if invalid
 */
declare function getSizeAsNumber(value: string | number): number | null;
/**
 * Clamps a number between a minimum and maximum value.
 * @param num The number to clamp
 * @param min The minimum value
 * @param max The maximum value
 * @returns The clamped number
 */
declare function numberClamp(num: number, min: number, max: number): number;

/**
 * Creates a new object by picking the specified keys from the input object.
 * @param obj The source object
 * @param keys The keys to pick
 * @returns A new object with only the picked keys
 */
declare function objectPick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
/**
 * Creates a new object by omitting the specified keys from the input object.
 * @param obj The source object
 * @param keys The keys to omit
 * @returns A new object without the omitted keys
 */
declare function objectOmit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;

/**
 * The available OTP generation types.
 */
type OTPGenerationType = 'base64' | 'digits' | 'letters' | 'letters-upper' | 'letters-lower' | 'alphanumeric' | 'alphanumeric-upper' | 'alphanumeric-lower';
/**
 * Generates a one-time password (OTP) of the specified type and length.
 * @param type The OTP generation type
 * @param length The length of the OTP
 * @returns The generated OTP string
 * @throws {Error} If the OTP type is invalid
 */
declare function generateOtp(type: OTPGenerationType, length: number): string;

/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize
 * @returns The capitalized string
 */
declare function stringCapitalize(str: string): string;
/**
 * Converts a string to title case (first letter of each word capitalized).
 * @param str The string to convert
 * @returns The title-cased string
 */
declare function stringToTitleCase(str: string): string;

/**
 * Returns a promise that resolves after a specified duration (in milliseconds).
 * @param duration Time to wait in milliseconds (default: 0)
 * @returns Promise that resolves after the duration
 * @example
 *   await wait(1000) // waits 1 second
 */
declare function wait(duration?: number): Promise<void>;

export { arrayChunk, arrayPartition, arrayShuffle, generateOtp, getSizeAsNumber, hexToRGB, numberClamp, numberRange, objectOmit, objectPick, randomNumber, stringCapitalize, stringToTitleCase, wait };
export type { OTPGenerationType };
