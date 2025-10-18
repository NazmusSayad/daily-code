/**
 * Creates an HTMLElement from an HTML string.
 * @param input HTML string to convert
 * @returns The first HTMLElement parsed from the string
 * @example
 *   createElementFromString('<div>Hello</div>') // <div>Hello</div>
 */
declare function createElementFromString(input: string): HTMLElement;

/**
 * Options for the file explorer dialog.
 */
type FileExplorerOptions = {
    accept?: string;
    multiple?: boolean;
};
/**
 * Opens a file picker dialog and returns the selected files.
 * @param options Options for accepted file types and multiple selection
 * @returns A promise that resolves to the selected FileList
 * @throws {Error} If no files are selected
 */
declare function openFileExplorer(options?: FileExplorerOptions): Promise<FileList>;

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
declare function findDominantColor(src: string, sampleThreshold?: number): Promise<string>;

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
declare function monoColorImage(color: string): string;

export { createElementFromString, findDominantColor, monoColorImage, openFileExplorer };
