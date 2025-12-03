import { describe, expect, it } from 'vitest'
import {
  arrayChunk,
  arrayPartition,
  arrayShuffle,
  numberRange,
  sortByFrequency,
} from './array'

describe('numberRange', () => {
  it('should create an array from start to end (exclusive)', () => {
    expect(numberRange(1, 5)).toEqual([1, 2, 3, 4])
    expect(numberRange(0, 3)).toEqual([0, 1, 2])
    expect(numberRange(-2, 2)).toEqual([-2, -1, 0, 1])
  })

  it('should return empty array when start equals end', () => {
    expect(numberRange(5, 5)).toEqual([])
  })

  it('should return empty array when start is greater than end', () => {
    expect(numberRange(10, 5)).toEqual([])
  })

  it('should work with negative numbers', () => {
    expect(numberRange(-5, -2)).toEqual([-5, -4, -3])
  })

  it('should work with floating point numbers', () => {
    expect(numberRange(1.5, 4.5)).toEqual([1.5, 2.5, 3.5])
  })
})

describe('arrayShuffle', () => {
  it('should return a new array with the same elements', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = arrayShuffle(arr)
    expect(shuffled).toHaveLength(arr.length)
    expect(shuffled.sort()).toEqual(arr.sort())
    expect(shuffled).not.toBe(arr)
  })

  it('should work with empty arrays', () => {
    expect(arrayShuffle([])).toEqual([])
  })

  it('should work with single element arrays', () => {
    expect(arrayShuffle([42])).toEqual([42])
  })

  it('should work with strings', () => {
    const arr = ['a', 'b', 'c']
    const shuffled = arrayShuffle(arr)
    expect(shuffled.sort()).toEqual(arr.sort())
  })

  it('should work with mixed types', () => {
    const arr = [1, 'hello', true, null, undefined]
    const shuffled = arrayShuffle(arr)
    expect(shuffled.sort()).toEqual(arr.sort())
  })
})

describe('arrayChunk', () => {
  it('should split array into chunks of specified size', () => {
    expect(arrayChunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    expect(arrayChunk([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [4]])
  })

  it('should return single chunk when size equals array length', () => {
    expect(arrayChunk([1, 2, 3], 3)).toEqual([[1, 2, 3]])
  })

  it('should return single chunk when size is larger than array length', () => {
    expect(arrayChunk([1, 2], 5)).toEqual([[1, 2]])
  })

  it('should work with empty arrays', () => {
    expect(arrayChunk([], 2)).toEqual([])
  })

  it('should handle size of 1', () => {
    expect(arrayChunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
  })

  it('should work with strings', () => {
    expect(arrayChunk(['a', 'b', 'c', 'd'], 2)).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ])
  })
})

describe('arrayPartition', () => {
  it('should partition array based on predicate', () => {
    const [even, odd] = arrayPartition([1, 2, 3, 4, 5, 6], (n) => n % 2 === 0)
    expect(even).toEqual([2, 4, 6])
    expect(odd).toEqual([1, 3, 5])
  })

  it('should return empty arrays for empty input', () => {
    const [pass, fail] = arrayPartition([], (n) => n > 0)
    expect(pass).toEqual([])
    expect(fail).toEqual([])
  })

  it('should work when all elements pass predicate', () => {
    const [pass, fail] = arrayPartition([2, 4, 6], (n) => n % 2 === 0)
    expect(pass).toEqual([2, 4, 6])
    expect(fail).toEqual([])
  })

  it('should work when all elements fail predicate', () => {
    const [pass, fail] = arrayPartition([1, 3, 5], (n) => n % 2 === 0)
    expect(pass).toEqual([])
    expect(fail).toEqual([1, 3, 5])
  })

  it('should work with strings', () => {
    const [long, short] = arrayPartition(
      ['hello', 'hi', 'world'],
      (s) => s.length > 3
    )
    expect(long).toEqual(['hello', 'world'])
    expect(short).toEqual(['hi'])
  })

  it('should work with objects', () => {
    const users = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 17 },
      { name: 'Charlie', age: 30 },
    ]
    const [adults, minors] = arrayPartition(users, (user) => user.age >= 18)
    expect(adults).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 30 },
    ])
    expect(minors).toEqual([{ name: 'Bob', age: 17 }])
  })
})

describe('sortByFrequency', () => {
  it('should sort array by frequency in descending order', () => {
    expect(sortByFrequency([1, 2, 2, 3, 3, 3])).toEqual([3, 2, 1])
    expect(sortByFrequency(['a', 'b', 'b', 'c', 'c', 'c', 'd'])).toEqual([
      'c',
      'b',
      'a',
      'd',
    ])
  })

  it('should handle empty arrays', () => {
    expect(sortByFrequency([])).toEqual([])
  })

  it('should handle arrays with single element', () => {
    expect(sortByFrequency([42])).toEqual([42])
  })

  it('should handle arrays with all unique elements', () => {
    expect(sortByFrequency([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
  })

  it('should handle arrays with all same elements', () => {
    expect(sortByFrequency([1, 1, 1, 1])).toEqual([1])
  })

  it('should handle mixed types', () => {
    expect(sortByFrequency([1, 'hello', 1, 'hello', 1, 2])).toEqual([
      1,
      'hello',
      2,
    ])
  })

  it('should maintain stable order for same frequencies', () => {
    expect(sortByFrequency([1, 2, 1, 2, 3, 3])).toEqual([1, 2, 3])
  })

  it('should work with objects', () => {
    const obj1 = { id: 1 }
    const obj2 = { id: 2 }
    const obj3 = { id: 1 }
    const obj4 = { id: 3 }
    const arr = [obj1, obj2, obj3, obj4]
    const result = sortByFrequency(arr)
    expect(result).toHaveLength(4)
    expect(result[0]).toEqual(obj1)
    expect(result[1]).toEqual(obj2)
    expect(result[2]).toEqual(obj3)
    expect(result[3]).toEqual(obj4)
  })
})
