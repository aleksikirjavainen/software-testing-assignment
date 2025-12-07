import map from '../library/map.js'

describe('map', () => {

  test('TC1 – Basic mapping: square numbers', () => {
    const result = map([2, 4], n => n * n);
    expect(result).toEqual([4, 16]);
  });

  test('TC2 – Handle empty array', () => {
    expect(map([], x => x)).toEqual([]);
  });

  test('TC3 – Handle null or undefined input', () => {
    expect(map(null, x => x)).toEqual([]);
    expect(map(undefined, x => x)).toEqual([]);
  });

  test('TC4 – Mapping strings', () => {
    const input = ['a', 'b', 'c'];
    const result = map(input, s => s.toUpperCase());
    expect(result).toEqual(['A', 'B', 'C']);
  });

  test('TC5 – Mapping objects', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];
    const result = map(users, u => u.name);

    expect(result).toEqual(['Alice', 'Bob']);
  });

  test('TC6 – Ensure new array returned', () => {
    const input = [1, 2, 3];
    const result = map(input, n => n * 2);

    expect(result).not.toBe(input);
    expect(result).toEqual([2, 4, 6]);
  });

  test('TC7 – Map booleans to strings', () => {
    const input = [true, false, true];
    const result = map(input, b => b.toString());
    expect(result).toEqual(['true', 'false', 'true']);
  });

  test('TC8 – Map numbers to objects', () => {
    const input = [1, 2];
    const result = map(input, n => ({ num: n }));
    expect(result).toEqual([{ num: 1 }, { num: 2 }]);
  });

  test('TC9 – Mapping over array containing undefined values', () => {
    const input = [1, undefined, 3];
    const result = map(input, x => (x === undefined ? 'U' : x));

    expect(result).toEqual([1, 'U', 3]);
  });

  test('TC10 – Mapping with index-based logic', () => {
    const input = ['a', 'b', 'c'];
    const result = map(input, (value, index) => `${value}${index}`);

    expect(result).toEqual(['a0', 'b1', 'c2']);
  });

  test('TC11 – Transform product objects to new shape', () => {
  const products = [
    { id: 1, name: 'Apple', price: 2 },
    { id: 2, name: 'Milk', price: 3 }
  ];

  const result = map(products, p => ({
    label: p.name,
    cost: p.price
  }));

  expect(result).toEqual([
    { label: 'Apple', cost: 2 },
    { label: 'Milk', cost: 3 }
  ]);
  });

});