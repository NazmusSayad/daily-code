/**
 * Calculates the CRC32 checksum for an array of bytes.
 * @param bytes The input byte array
 * @returns The CRC32 checksum as a 4-byte array
 */
export function crc32(bytes: number[]): number[] {
  let crc = ~0
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i]
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
    }
  }
  crc = ~crc
  return [(crc >>> 24) & 255, (crc >>> 16) & 255, (crc >>> 8) & 255, crc & 255]
}

/**
 * Calculates the Adler-32 checksum for an array of bytes.
 * @param data The input byte array
 * @returns The Adler-32 checksum as a 4-byte array
 */
export function adler32(data: number[]): number[] {
  const MOD_ADLER = 65521
  let s1 = 1
  let s2 = 0
  for (let i = 0; i < data.length; i++) {
    s1 = (s1 + data[i]) % MOD_ADLER
    s2 = (s2 + s1) % MOD_ADLER
  }
  return [(s2 >>> 8) & 255, s2 & 255, (s1 >>> 8) & 255, s1 & 255]
}

/**
 * Creates a PNG chunk with the given type and data.
 * @param type The 4-character chunk type
 * @param data The chunk data as a byte array
 * @returns The PNG chunk as a byte array
 */
export function chunk(type: string, data: number[]): number[] {
  const length = data.length
  const typeBytes = [...type].map((c) => c.charCodeAt(0))
  const crc = crc32([...typeBytes, ...data])
  return [
    (length >>> 24) & 255,
    (length >>> 16) & 255,
    (length >>> 8) & 255,
    length & 255,
    ...typeBytes,
    ...data,
    ...crc,
  ]
}
