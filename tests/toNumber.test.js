import toNumber from '../library/toNumber.js'

describe('toNumber - pre-planned and AI tools used', () => {
  test('TC1 – Integer string conversion', () => {
    expect(toNumber('5')).toBe(5)
  })

  test('TC2 – Decimal string conversion', () => {
    expect(toNumber('3.2')).toBe(3.2)
  })

  test('TC3 – String with whitespace', () => {
    expect(toNumber('  7  ')).toBe(7)
  })

  test('TC4 – Binary string', () => {
    expect(toNumber('0b101')).toBe(5)
  })

  test('TC5 – Octal string', () => {
    expect(toNumber('0o10')).toBe(8)
  })

  test('TC6 – Bad signed hexadecimal', () => {
    expect(toNumber('-0x1F')).toBeNaN()
  })

  test('TC7 – Valid hexadecimal', () => {
    expect(toNumber('0x1F')).toBe(31)
  })

  test('TC8 – Boolean true/false', () => {
    expect(toNumber(true)).toBe(1)
    expect(toNumber(false)).toBe(0)
  })

  test('TC9 – Null value', () => {
    expect(toNumber(null)).toBe(0)
  })

  test('TC10 – Undefined value', () => {
    expect(toNumber(undefined)).toBeNaN()
  })

  test('TC11 – Symbol value', () => {
    expect(toNumber(Symbol('x'))).toBeNaN()
  })

  test('TC12 – Object with valueOf()', () => {
    const obj = {
      valueOf() {
        return 5
      },
    }
    expect(toNumber(obj)).toBe(5)
  })

  test('TC13 – Plain object without valueOf()', () => {
    expect(toNumber({})).toBeNaN()
  })

  test('TC14 – Number input', () => {
    expect(toNumber(42)).toBe(42)
  })

  test('TC15 – Infinity constant', () => {
    expect(toNumber(Infinity)).toBe(Infinity)
  })

  test('TC16 – String "Infinity"', () => {
    expect(toNumber('Infinity')).toBe(Infinity)
  })

  test('TC17 – Empty string', () => {
    expect(toNumber('')).toBe(0)
  })

  test('TC18 – NaN input', () => {
    expect(toNumber(NaN)).toBeNaN()
  })

  test('TC19 – Negative string', () => {
    expect(toNumber('-10.5')).toBe(-10.5)
  })

  test('TC20 – Non-string array', () => {
    expect(toNumber([1, 2])).toBeNaN()
  })
})
