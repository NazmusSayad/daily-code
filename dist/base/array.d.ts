/**
 * Creates an array of numbers from start (inclusive) to end (exclusive).
 * @param start The starting number (inclusive)
 * @param end The ending number (exclusive)
 * @returns An array of numbers from start to end - 1
 */
export declare function numberRange(start: number, end: number): number[];
/**
 * Returns a new array with the elements shuffled randomly.
 * @param arr The array to shuffle
 * @returns A new shuffled array
 */
export declare function arrayShuffle<T>(arr: T[]): T[];
/**
 * Splits an array into chunks of the specified size.
 * @param arr The array to chunk
 * @param size The size of each chunk
 * @returns An array of array chunks
 */
export declare function arrayChunk<T>(arr: T[], size: number): T[][];
/**
 * Partitions an array into two arrays based on a predicate function.
 * @param arr The array to partition
 * @param predicate The function to test each element
 * @returns A tuple: [elements passing predicate, elements failing predicate]
 */
export declare function arrayPartition<T>(arr: T[], predicate: (v: T) => boolean): [T[], T[]];
