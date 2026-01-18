import { describe, expect, it } from 'vitest'
import {
  objectOmit,
  objectOmitNull,
  objectOmitNullish,
  objectOmitUndefined,
  objectPick,
} from './object'

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

describe('objectOmitNullish', () => {
  it('should omit null and undefined values', () => {
    const obj = { a: 1, b: null, c: undefined, d: 2 }
    expect(objectOmitNullish(obj)).toEqual({ a: 1, d: 2 })
  })
  it('should keep falsy values that are not null or undefined', () => {
    const obj = { a: 0, b: false, c: '', d: null, e: undefined }
    expect(objectOmitNullish(obj)).toEqual({ a: 0, b: false, c: '' })
  })
  it('should return empty object if all values are nullish', () => {
    const obj = { a: null, b: undefined }
    expect(objectOmitNullish(obj)).toEqual({})
  })
  it('should return same object if no nullish values', () => {
    const obj = { a: 1, b: 'test', c: false }
    expect(objectOmitNullish(obj)).toEqual({ a: 1, b: 'test', c: false })
  })
})

describe('objectOmitNull', () => {
  it('should omit null values', () => {
    const obj = { a: 1, b: null, c: 2 }
    expect(objectOmitNull(obj)).toEqual({ a: 1, c: 2 })
  })
  it('should keep undefined values', () => {
    const obj = { a: 1, b: null, c: undefined }
    expect(objectOmitNull(obj)).toEqual({ a: 1, c: undefined })
  })
  it('should keep falsy values that are not null', () => {
    const obj = { a: 0, b: false, c: '', d: null }
    expect(objectOmitNull(obj)).toEqual({ a: 0, b: false, c: '' })
  })
  it('should return empty object if all values are null', () => {
    const obj = { a: null, b: null }
    expect(objectOmitNull(obj)).toEqual({})
  })
  it('should return same object if no null values', () => {
    const obj = { a: 1, b: undefined, c: false }
    expect(objectOmitNull(obj)).toEqual({ a: 1, b: undefined, c: false })
  })
})

describe('objectOmitUndefined', () => {
  it('should omit undefined values', () => {
    const obj = { a: 1, b: undefined, c: 2 }
    expect(objectOmitUndefined(obj)).toEqual({ a: 1, c: 2 })
  })
  it('should keep null values', () => {
    const obj = { a: 1, b: undefined, c: null }
    expect(objectOmitUndefined(obj)).toEqual({ a: 1, c: null })
  })
  it('should keep falsy values that are not undefined', () => {
    const obj = { a: 0, b: false, c: '', d: undefined }
    expect(objectOmitUndefined(obj)).toEqual({ a: 0, b: false, c: '' })
  })
  it('should return empty object if all values are undefined', () => {
    const obj = { a: undefined, b: undefined }
    expect(objectOmitUndefined(obj)).toEqual({})
  })
  it('should return same object if no undefined values', () => {
    const obj = { a: 1, b: null, c: false }
    expect(objectOmitUndefined(obj)).toEqual({ a: 1, b: null, c: false })
  })
})
