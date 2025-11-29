import isEmpty from '../library/isEmpty.js'

describe('isEmpty', () => {
  describe('true', () => {
    test('Empty array', () => {
      expect(isEmpty([])).toBe(true)
    })

    test('Empty object', () => {
      expect(isEmpty({})).toBe(true)
    })

    test('Empty string', () => {
      expect(isEmpty('')).toBe(true)
    })

    test('Null value', () => {
      expect(isEmpty(null)).toBe(true)
    })

    test('Empty Map', () => {
      expect(isEmpty(new Map())).toBe(true)
    })

    test('Empty Set', () => {
      expect(isEmpty(new Set())).toBe(true)
    })
  })

  describe('false', () => {
    test('Array with elements', () => {
      expect(isEmpty([1, 2, 3])).toBe(false)
    })

    test('Object with properties', () => {
      expect(isEmpty({ a: 1 })).toBe(false)
    })

    test('Non-empty string', () => {
      expect(isEmpty('abc')).toBe(false)
    })

    test('Non-empty Map', () => {
      const map = new Map()
      map.set('key', 'value')
      expect(isEmpty(map)).toBe(false)
    })
  })
})