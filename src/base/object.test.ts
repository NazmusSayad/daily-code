import { describe, expect, it } from 'bun:test'
import { objectOmit, objectPick } from './object'

describe('objectPick', () => {
  it('should pick specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(objectPick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  })
  it('should return empty object if no keys', () => {
    expect(objectPick({ a: 1 }, [])).toEqual({})
  })
})

describe('objectOmit', () => {
  it('should omit specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(objectOmit(obj, ['b'])).toEqual({ a: 1, c: 3 })
  })
  it('should return same object if no keys', () => {
    expect(objectOmit({ a: 1 }, [])).toEqual({ a: 1 })
  })
  it('should ignore keys not in object', () => {
    const obj = { a: 1 }
    expect(objectOmit(obj, ['b' as unknown as keyof typeof obj])).toEqual({
      a: 1,
    })
  })
})
