import { describe, expect, it } from 'bun:test'
import { formatBytesToHumanReadable } from './size'

describe('formatBytesToHumanReadable', () => {
  it('should format bytes in B unit', () => {
    const result = formatBytesToHumanReadable(512)
    expect(result.value).toBe(512)
    expect(result.unit).toBe('B')
    expect(result.text).toBe('512.00 B')
  })

  it('should format bytes in KB unit', () => {
    const result = formatBytesToHumanReadable(1024)
    expect(result.value).toBe(1)
    expect(result.unit).toBe('KB')
    expect(result.text).toBe('1.00 KB')
  })

  it('should format fractional KB values', () => {
    const result = formatBytesToHumanReadable(1536) // 1.5 KB
    expect(result.value).toBe(1.5)
    expect(result.unit).toBe('KB')
    expect(result.text).toBe('1.50 KB')
  })

  it('should format bytes in MB unit', () => {
    const result = formatBytesToHumanReadable(1024 * 1024)
    expect(result.value).toBe(1)
    expect(result.unit).toBe('MB')
    expect(result.text).toBe('1.00 MB')
  })

  it('should format bytes in GB unit', () => {
    const result = formatBytesToHumanReadable(1024 * 1024 * 1024)
    expect(result.value).toBe(1)
    expect(result.unit).toBe('GB')
    expect(result.text).toBe('1.00 GB')
  })

  it('should format bytes in TB unit', () => {
    const result = formatBytesToHumanReadable(1024 * 1024 * 1024 * 1024)
    expect(result.value).toBe(1)
    expect(result.unit).toBe('TB')
    expect(result.text).toBe('1.00 TB')
  })

  it('should format larger values correctly', () => {
    const result = formatBytesToHumanReadable(1024 * 1024 * 1024 * 1024 * 1024) // 1 PB
    expect(result.value).toBe(1)
    expect(result.unit).toBe('PB')
    expect(result.text).toBe('1.00 PB')
  })

  it('should handle large numbers that exceed available units', () => {
    const veryLargeNumber = Math.pow(1024, 10) // Should be in YB range
    const result = formatBytesToHumanReadable(veryLargeNumber)
    expect(result.unit).toBe('YB')
    expect(result.text).toMatch(/YB$/)
  })

  it('should format decimal byte values', () => {
    const result = formatBytesToHumanReadable(1024 + 512) // 1.5 KB
    expect(result.value).toBe(1.5)
    expect(result.unit).toBe('KB')
    expect(result.text).toBe('1.50 KB')
  })

  it('should handle large numbers that exceed available units', () => {
    const veryLargeNumber = Math.pow(1024, 10) // Should be capped to YB
    const result = formatBytesToHumanReadable(veryLargeNumber)
    expect(result.unit).toBe('YB')
    expect(result.text).toMatch(/YB$/)
  })
})
