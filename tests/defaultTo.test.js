import defaultTo from '../library/defaultTo.js'

describe('defaultTo', () => {
  test('TC1 – Return value when it is a valid number', () => {
    expect(defaultTo(1, 10)).toBe(1);
  })

  test('TC2 – Return default when value is undefined', () => {
    expect(defaultTo(undefined, 10)).toBe(10);
  })

  test('TC3 – Return default when value is null', () => {
    expect(defaultTo(null, 10)).toBe(10);
  })

  test('TC4 – Return default when value is NaN', () => {
    const result = defaultTo(NaN, 10);
    expect(result).toBe(10);
  })

  test('TC5 – Return value when it is zero', () => {
    expect(defaultTo(0, 10)).toBe(0);
  })

  test('TC6 – Return value when it is empty string', () => {
    expect(defaultTo('', 10)).toBe('');
  })

  test('TC7 – Return value when it is false', () => {
    expect(defaultTo(false, 10)).toBe(false);
  })

  test('TC8 – Works with objects', () => {
    const obj = {name: 'Apple'};
    expect(defaultTo(obj, { name: 'Default' })).toBe(obj);
  })

  test('TC9 – Default value can be an object', () => {
    const defaultObj = { id: 1 };
    expect(defaultTo(undefined, defaultObj)).toBe(defaultObj);
  });

  test('TC10 – Works with boolean default values', () => {
    expect(defaultTo(null, true)).toBe(true);
  });

  test('TC11 – Works with array values', () => {
    const arr = [1, 2, 3];
    expect(defaultTo(arr, [])).toBe(arr);
  });

  test('TC12 – Works with default array', () => {
    const def = ['x'];
    expect(defaultTo(undefined, def)).toBe(def);
  });

})