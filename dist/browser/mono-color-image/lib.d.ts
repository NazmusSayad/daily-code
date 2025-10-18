/**
 * Calculates the CRC32 checksum for an array of bytes.
 * @param bytes The input byte array
 * @returns The CRC32 checksum as a 4-byte array
 */
export declare function crc32(bytes: number[]): number[];
/**
 * Calculates the Adler-32 checksum for an array of bytes.
 * @param data The input byte array
 * @returns The Adler-32 checksum as a 4-byte array
 */
export declare function adler32(data: number[]): number[];
/**
 * Creates a PNG chunk with the given type and data.
 * @param type The 4-character chunk type
 * @param data The chunk data as a byte array
 * @returns The PNG chunk as a byte array
 */
export declare function chunk(type: string, data: number[]): number[];
