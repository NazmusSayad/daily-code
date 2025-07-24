import { describe, expect, it } from 'bun:test'
import { adler32, chunk, crc32 } from './lib'

describe('crc32', () => {
  it('should calculate CRC32 correctly for empty data', () => {
    expect(crc32([])).toEqual([0, 0, 0, 0])
  })
})

describe('adler32', () => {
  it('should calculate Adler-32 correctly for empty data', () => {
    expect(adler32([])).toEqual([0, 0, 0, 1])
  })
})

describe('chunk', () => {
  it('should create a chunk with correct structure for IHDR type', () => {
    const type = 'IHDR'
    const data = [0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0]
    const expectedLength = data.length
    const typeBytes = [...'IHDR'].map((c) => c.charCodeAt(0))
    const expectedCrc = crc32([...typeBytes, ...data])

    const result = chunk(type, data)

    expect(result.slice(0, 4)).toEqual([
      (expectedLength >>> 24) & 255,
      (expectedLength >>> 16) & 255,
      (expectedLength >>> 8) & 255,
      expectedLength & 255,
    ])

    expect(result.slice(4, 8)).toEqual(typeBytes)

    expect(result.slice(8, 8 + expectedLength)).toEqual(data)

    expect(result.slice(8 + expectedLength)).toEqual(expectedCrc)
  })

  it('should create a chunk with correct structure for IDAT type with empty data', () => {
    const type = 'IDAT'
    const data: number[] = []
    const typeBytes = [...'IDAT'].map((c) => c.charCodeAt(0))
    const expectedCrc = crc32([...typeBytes, ...data])

    const result = chunk(type, data)

    expect(result.length).toBe(4 + 4 + 0 + 4)
    expect(result.slice(0, 4)).toEqual([0, 0, 0, 0])
    expect(result.slice(4, 8)).toEqual(typeBytes)
    expect(result.slice(8)).toEqual(expectedCrc)
  })

  it('should create a chunk with correct structure for a custom type', () => {
    const type = 'tEXt'
    const data = [...'Comment'].map((c) => c.charCodeAt(0))
    const expectedLength = data.length
    const typeBytes = [...'tEXt'].map((c) => c.charCodeAt(0))
    const expectedCrc = crc32([...typeBytes, ...data])

    const result = chunk(type, data)

    expect(result.length).toBe(4 + 4 + data.length + 4)
    expect(result.slice(0, 4)).toEqual([
      (expectedLength >>> 24) & 255,
      (expectedLength >>> 16) & 255,
      (expectedLength >>> 8) & 255,
      expectedLength & 255,
    ])
    expect(result.slice(4, 8)).toEqual(typeBytes)
    expect(result.slice(8, 8 + expectedLength)).toEqual(data)
    expect(result.slice(8 + expectedLength)).toEqual(expectedCrc)
  })
})
