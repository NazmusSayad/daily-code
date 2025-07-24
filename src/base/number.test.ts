import { describe, expect, it } from 'bun:test'
import { getSizeAsNumber, numberClamp, randomNumber } from './number'

describe('randomNumber', () => {
  it('should generate a number within the range', () => {
    for (let i = 0; i < 100; i++) {
      const n = randomNumber(10, 5)
      expect(n).toBeGreaterThanOrEqual(5)
      expect(n).toBeLessThanOrEqual(10)
    }
  })
  it('should default to 0-1 if no args', () => {
    for (let i = 0; i < 20; i++) {
      const n = randomNumber()
      expect(n === 0 || n === 1).toBe(true)
    }
  })
  it('should work with negative numbers', () => {
    for (let i = 0; i < 20; i++) {
      const n = randomNumber(-1, -10)
      expect(n).toBeGreaterThanOrEqual(-10)
      expect(n).toBeLessThanOrEqual(-1)
    }
  })
})

describe('getSizeAsNumber', () => {
  it('should return the number if input is a number', () => {
    expect(getSizeAsNumber(42)).toBe(42)
  })
  it('should parse px values', () => {
    expect(getSizeAsNumber('12px')).toBe(12)
  })
  it('should parse numeric strings', () => {
    expect(getSizeAsNumber('5')).toBe(5)
    expect(getSizeAsNumber('3.14')).toBe(3.14)
  })
  it('should return null for invalid strings', () => {
    expect(getSizeAsNumber('abc')).toBeNull()
    expect(getSizeAsNumber('12em')).toBeNull()
    expect(getSizeAsNumber('')).toBeNull()
  })
})

describe('numberClamp', () => {
  it('should clamp below min', () => {
    expect(numberClamp(-5, 0, 10)).toBe(0)
  })
  it('should clamp above max', () => {
    expect(numberClamp(15, 0, 10)).toBe(10)
  })
  it('should return the number if in range', () => {
    expect(numberClamp(5, 0, 10)).toBe(5)
  })
})
