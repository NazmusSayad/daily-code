/**
 * Finds the dominant color in an image.
 * @param src - The URL of the image to find the dominant color of.
 * @param sampleThreshold - The threshold for sampling the image.
 * @returns A promise that resolves to the dominant color.
 * @example
 * ```js
 * findDominantColor('https://example.com/image.png')
 * // #F29034
 * ```
 */
export declare function findDominantColor(src: string, sampleThreshold?: number): Promise<string>;
