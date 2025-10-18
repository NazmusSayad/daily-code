import { h as hexToRGB } from './hex-to-rgb-Bv8HmjOn.js';

/**
 * Creates an HTMLElement from an HTML string.
 * @param input HTML string to convert
 * @returns The first HTMLElement parsed from the string
 * @example
 *   createElementFromString('<div>Hello</div>') // <div>Hello</div>
 */
function createElementFromString(input) {
    return new DOMParser().parseFromString(input, 'text/html').body
        .firstElementChild;
}

/**
 * Opens a file picker dialog and returns the selected files.
 * @param options Options for accepted file types and multiple selection
 * @returns A promise that resolves to the selected FileList
 * @throws {Error} If no files are selected
 */
function openFileExplorer(options = {}) {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = options.accept ?? 'image/*';
        input.multiple = options.multiple ?? false;
        input.onchange = async (e) => {
            const files = e.target.files;
            if (!files)
                return reject(new Error('No files selected'));
            resolve(files);
        };
        input.click();
    });
}

const DEFAULT_SAMPLE_COUNT = 20;
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
function findDominantColor(src, sampleThreshold) {
    const imgEl = document.createElement('img');
    imgEl.src = src;
    return new Promise((resolve, reject) => {
        imgEl.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                resolve(getDominantColor(canvas, imgEl, sampleThreshold));
            }
            catch (err) {
                if (err instanceof Error) {
                    reject(err);
                }
                else {
                    reject(new Error('Failed to get dominant color.'));
                }
            }
        };
        imgEl.onerror = () => {
            reject(new Error('Failed to load image. Ensure the image URL allows cross-origin requests.'));
        };
    });
}
function getDominantColor(canvas, imgEl, sampleThreshold) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Failed to get canvas context');
    }
    const colorsMap = new Map();
    canvas.width = imgEl.naturalWidth;
    canvas.height = imgEl.naturalHeight;
    ctx.drawImage(imgEl, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const totalPixels = canvas.width * canvas.height;
    const skipThreshold = 4 *
        Math.max(1, Math.round(totalPixels /
            (sampleThreshold ? sampleThreshold ** 2 : DEFAULT_SAMPLE_COUNT)));
    for (let i = 0; i < data.length; i += skipThreshold) {
        const color = [data[i], data[i + 1], data[i + 2]].join(',');
        if (colorsMap.has(color)) {
            colorsMap.set(color, colorsMap.get(color) + 1);
        }
        else {
            colorsMap.set(color, 1);
        }
    }
    const sortedColors = Array.from(colorsMap.entries()).sort((a, b) => b[1] - a[1]);
    const rgbValue = sortedColors?.[0]?.[0]?.trim();
    if (!rgbValue) {
        throw new Error('No dominant color found.');
    }
    return `rgb(${rgbValue})`;
}

/**
 * Calculates the CRC32 checksum for an array of bytes.
 * @param bytes The input byte array
 * @returns The CRC32 checksum as a 4-byte array
 */
function crc32(bytes) {
    let crc = -1;
    for (let i = 0; i < bytes.length; i++) {
        crc ^= bytes[i];
        for (let j = 0; j < 8; j++) {
            crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
        }
    }
    crc = ~crc;
    return [(crc >>> 24) & 255, (crc >>> 16) & 255, (crc >>> 8) & 255, crc & 255];
}
/**
 * Calculates the Adler-32 checksum for an array of bytes.
 * @param data The input byte array
 * @returns The Adler-32 checksum as a 4-byte array
 */
function adler32(data) {
    const MOD_ADLER = 65521;
    let s1 = 1;
    let s2 = 0;
    for (let i = 0; i < data.length; i++) {
        s1 = (s1 + data[i]) % MOD_ADLER;
        s2 = (s2 + s1) % MOD_ADLER;
    }
    return [(s2 >>> 8) & 255, s2 & 255, (s1 >>> 8) & 255, s1 & 255];
}
/**
 * Creates a PNG chunk with the given type and data.
 * @param type The 4-character chunk type
 * @param data The chunk data as a byte array
 * @returns The PNG chunk as a byte array
 */
function chunk(type, data) {
    const length = data.length;
    const typeBytes = [...type].map((c) => c.charCodeAt(0));
    const crc = crc32([...typeBytes, ...data]);
    return [
        (length >>> 24) & 255,
        (length >>> 16) & 255,
        (length >>> 8) & 255,
        length & 255,
        ...typeBytes,
        ...data,
        ...crc,
    ];
}

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
function monoColorImage(color) {
    const { r, g, b } = hexToRGB(color);
    const idatRawData = [0x00, r, g, b];
    const adler = adler32(idatRawData);
    const zlibStream = [
        0x78,
        0x01,
        0x01,
        0x04,
        0x00,
        0xfb,
        0xff,
        ...idatRawData,
        ...adler,
    ];
    const png = [
        0x89,
        0x50,
        0x4e,
        0x47,
        0x0d,
        0x0a,
        0x1a,
        0x0a,
        ...chunk('IHDR', [0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0]),
        ...chunk('IDAT', zlibStream),
        ...chunk('IEND', []),
    ];
    if (typeof Buffer === 'undefined' || typeof Buffer.from !== 'function') {
        throw new Error('Buffer is not available in this environment');
    }
    const base64 = Buffer.from(Uint8Array.from(png)).toString('base64');
    return `data:image/png;base64,${base64}`;
}

export { createElementFromString, findDominantColor, monoColorImage, openFileExplorer };
