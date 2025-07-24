import { describe, expect, it } from 'bun:test'
import { stringCapitalize, stringToTitleCase } from './string'

describe('stringCapitalize', () => {
  it('should capitalize first letter', () => {
    expect(stringCapitalize('hello')).toBe('Hello')
  })
  it('should handle empty string', () => {
    expect(stringCapitalize('')).toBe('')
  })
  it('should not change first letter if already capitalized', () => {
    expect(stringCapitalize('Hello')).toBe('Hello')
  })
})

describe('stringToTitleCase', () => {
  it('should convert to title case', () => {
    expect(stringToTitleCase('hello world')).toBe('Hello World')
  })
  it('should handle mixed case', () => {
    expect(stringToTitleCase('hELLo wORld')).toBe('Hello World')
  })
  it('should handle single word', () => {
    expect(stringToTitleCase('test')).toBe('Test')
  })
  it('should handle empty string', () => {
    expect(stringToTitleCase('')).toBe('')
  })
})
