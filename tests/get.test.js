import get from '../library/get.js'

describe('get', () => {
    describe('returns value', () => {
        test('Nested property', () => {
            const object = { a: [{ b: { c: 3 } }] }
            expect(get(object, 'a[0].b.c')).toBe(3)
        })

        test('Array path', () => {
            const object = { a: [{ b: { c: 3 } }] }
            expect(get(object, ['a', '0', 'b', 'c'])).toBe(3)
        })

        test('Direct property', () => {
            const object = { name: 'John', age: 30 }
            expect(get(object, 'name')).toBe('John')
        })
    })

    describe('returns default value', () => {
        test('Undefined path', () => {
            const object = { a: { b: 1 } }
            expect(get(object, 'a.b.c', 'default')).toBe('default')
        })

        test('Null object', () => {
            expect(get(null, 'a.b', 'default')).toBe('default')
        })

        test('Missing nested property', () => {
            const object = { name: 'John' }
            expect(get(object, 'address.street', 'N/A')).toBe('N/A')
        })
    })
})
