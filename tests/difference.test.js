import difference from '../library/difference.js'

describe('difference', () => {

  test('TC1 – Basic difference: returns values from first array not in second', () => {
    expect(difference([2, 1], [2, 3])).toEqual([1]);
  });

  test('TC2 – Multiple values arrays', () => {
    expect(difference([1, 2, 3, 4], [1], [4])).toEqual([2, 3]);
  });

  test('TC3 – No differences between arrays', () => {
    expect(difference([1, 2], [1, 2])).toEqual([]);
  });

  test('TC4 – No values to exclude', () => {
    expect(difference([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('TC5 – Values array empty', () => {
    expect(difference([1, 2], [])).toEqual([1, 2]);
  });

  test('TC6 – Handle duplicates properly', () => {
    expect(difference([1, 2, 2, 3], [2])).toEqual([1, 3]);
  });

  test('TC7 – Different data types', () => {
    expect(difference([1, 'a', true], ['a'])).toEqual([1, true]);
  });

  test('TC8 – Objects are compared by reference', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 1 };

    expect(difference([obj1, obj2], [obj1])).toEqual([obj2]);
  });

  test('TC9 – SameValueZero handling: NaN should be excluded properly', () => {
    expect(difference([NaN, 1], [NaN])).toEqual([1]);
  });

  test('TC10 – Input is not array-like (null)', () => {
    expect(difference(null, [1])).toEqual([]);
  });

  test('TC11 – Input is not array-like (number)', () => {
    expect(difference(123, [1])).toEqual([]);
  });

  test('TC12 – Values list contains non-array-like items', () => {
    expect(difference([1, 2, 3], 2)).toEqual([1, 2, 3]); 
  });

  test('TC13 – Empty first array always returns empty', () => {
    expect(difference([], [1, 2])).toEqual([]);
  });

  test('TC14 – Duplicate values in exclusion arrays should not change result', () => {
  expect(difference([1, 2, 3], [2, 2, 2])).toEqual([1, 3]);
});

});
