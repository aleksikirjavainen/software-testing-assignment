import clamp from '../library/clamp.js'

describe('clamp', () => {
    describe('within bounds', () => {
        test('Number within range', () => {
            expect(clamp(0, -5, 5)).toBe(0)
        })

        test('Equal to lower bound', () => {
            expect(clamp(-5, -5, 5)).toBe(-5)
        })

        test('Equal to upper bound', () => {
            expect(clamp(5, -5, 5)).toBe(5)
        })
    })

    describe('clamps value', () => {
        test('Number below lower bound', () => {
            expect(clamp(-10, -5, 5)).toBe(-5)
        })

        test('Number above upper bound', () => {
            expect(clamp(10, -5, 5)).toBe(5)
        })

        test('Negative bounds', () => {
            expect(clamp(-20, -15, -10)).toBe(-15)
        })
    })
})
