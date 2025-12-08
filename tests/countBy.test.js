import countBy from '../library/countBy.js'

describe('countBy', () => {
  const products = [
    { id: 1, name: 'Laptop', price: 1200, inStock: true,  category: 'electronics' },
    { id: 2, name: 'Headphones', price: 100, inStock: false, category: 'electronics' },
    { id: 3, name: 'Coffee Mug', price: 15, inStock: true, category: 'home' },
    { id: 4, name: 'Notebook', price: 5, inStock: true, category: 'office' },
    { id: 5, name: 'Smartphone', price: 800, inStock: false, category: 'electronics' },
  ];

  test('TC1 – Counts products by stock status', () => {
    const result = countBy(products, p => p.inStock);
    expect(result).toEqual({ true: 3, false: 2 });
  });

  test('TC2 – Counts products by category', () => {
    const result = countBy(products, p => p.category);
    expect(result).toEqual({
      electronics: 3,
      home: 1,
      office: 1,
    });
  });

  test('TC3 – Counts products by price range', () => {
    const result = countBy(products, p => (p.price > 500 ? 'expensive' : 'affordable'));
    expect(result).toEqual({
      expensive: 2,
      affordable: 3,
    });
  });

  test('TC4 – Counts products by even/odd price', () => {
    const result = countBy(products, p => (p.price % 2 === 0 ? 'even' : 'odd'));
    expect(result).toEqual({
      even: 3,
      odd: 2,
    });
  });

  test('TC5 – Handles empty array', () => {
    const result = countBy([], p => p.category);
    expect(result).toEqual({});
  });

  test('TC6 – Counts products by length of product name', () => {
    const result = countBy(products, p => p.name.length);
    expect(result).toEqual({
      6: 1,   
      10: 2,  
      11: 1,  
      8: 1,   
    });
  });

  test('TC7 – Counts with a boolean expression', () => {
    const result = countBy(products, p => (p.inStock && p.price > 100 ? 'yes' : 'no'));
    expect(result).toEqual({
      yes: 1,
      no: 4,
    });
  });

  test('TC8 – Supports object as collection input', () => {
    const input = {
      a: { price: 10 },
      b: { price: 20 },
      c: { price: 10 },
    };

    const result = countBy(input, v => v.price);
    expect(result).toEqual({
      10: 2,
      20: 1,
    });
  });

  test('TC9 – Handles null or undefined input', () => { 
    expect(countBy(null, x => x)).toEqual({}); 
    expect(countBy(undefined, x => x)).toEqual({}); 
  });
});