import filter from '../library/filter.js'
import { jest } from '@jest/globals';

describe('filter - pre-planned', () => {
  test('TC1 – Filter numeric values that are greater than 1', () => {
    const input = [1, 2, 3];
    const predicate = (n) => n > 1;
    const result = filter(input, predicate);
    expect(result).toEqual([2, 3]);
  })

  test('TC2 – Filter strings that start with letter A', () => {
    const input = ['Apple', 'Banana', 'Avocado'];
    const predicate = (s) => s.startsWith('A');
    const result = filter(input, predicate);
    expect(result).toEqual(['Apple', 'Avocado']);
  })

  test('TC3 – No elements match the predicate', () => {
    const input = [1, 2, 3];
    const predicate = (n) => n > 5;
    const result = filter(input, predicate);
    expect(result).toEqual([]);
  })

  test('TC4 – Handle empty input array', () => {
    const input = [];
    const predicate = (n) => true;
    const result = filter(input, predicate);
    expect(result).toEqual([]);
  })

  test('TC5 – Handle null input array', () => {
    const input = null;
    const predicate = (n) => true;
    const result = filter(input, predicate);
    expect(result).toEqual([]);
  })

  test('TC6 – Predicate receives correct arguments', () => {
    const input = [10];
    const predicate = jest.fn(() => true);

    const result = filter(input, predicate);

    expect(predicate).toHaveBeenCalledWith(10, 0, input);
    expect(result).toEqual([10]);
  })

  test('TC7 – Complex object filtering', () => {
    const input = [
      {user: 'barney', active: true},
      {user: 'fred', active: false}
    ];
    const predicate = (u) => u.active;
    const result = filter(input, predicate);
    expect(result).toEqual([{user: 'barney', active: true}]);
  })

  test('TC8 – Filter boolean true values', () => {
    const input = [true, false, true];
    const predicate = (v) => v === true;
    const result = filter(input, predicate);
    expect(result).toEqual([true, true]);
  })

  test('TC9 – Filters by even numbers', () => {
    const input = [1, 2, 3, 4];
    const predicate = (n) => n % 2  === 0;
    const result = filter(input, predicate);
    expect(result).toEqual([2, 4]);
  })
})

describe ('filter - AI-assisted', () => {
  
  const products = [
      { id: 'p-100', name: 'Wireless Mouse', price: 29.99, currency: 'EUR', category: 'electronics', inStock: true,  rating: 4.2 },
      { id: 'p-101', name: 'Laptop Sleeve',  price: 19.99, currency: 'EUR', category: 'fashion',     inStock: true,  rating: 4.0 },
      { id: 'p-102', name: 'Coffee Maker',   price: 79.00, currency: 'EUR', category: 'home',        inStock: false, rating: 4.6 },
      { id: 'p-103', name: 'HDMI Cable',     price: 10.00, currency: 'EUR', category: 'electronics', inStock: true,  rating: 3.8 },
      { id: 'p-104', name: 'Organic Pasta',  price: 3.50,  currency: 'EUR', category: 'grocery',     inStock: false },
    ];


  it('TC1 – returns a new array with elements matching the predicate', () => {
      const result = filter(products, p => p.inStock);
      expect(result).toEqual([
        products[0],
        products[1],
        products[3],
      ]);
    });
    
  it('TC2 – does not mutate the original array', () => {
      const original = products.slice(); 
      const result = filter(products, p => p.price > 20);
      expect(result).toHaveLength(2);
      expect(products).toEqual(original);  
      expect(result).not.toBe(products);   
    });

  
  it('TC3 – invokes the predicate with (value, index, array)', () => {
      const spy = jest.fn((value, index, array) => {
        return value.inStock && index % 2 === 0 && array.length === products.length;
      });

      const result = filter(products, spy);

      expect(spy).toHaveBeenCalledTimes(products.length);
      expect(spy).toHaveBeenNthCalledWith(1, products[0], 0, products);
      expect(spy).toHaveBeenNthCalledWith(2, products[1], 1, products);
      expect(result).toEqual([products[0]]);
    });


  it('TC4 – works with an empty array', () => {
      expect(filter([], () => true)).toEqual([]);
      expect(filter([], () => false)).toEqual([]);
    });

  
  it('TC5 – returns [] when array is null or undefined (lodash-like)', () => {
      expect(filter(null, () => true)).toEqual([]);
      expect(filter(undefined, () => true)).toEqual([]);
    });

  
  it('TC6 – handles predicates that check derived fields (e.g., price ranges)', () => {
      const midRange = filter(products, p => p.price >= 20 && p.price <= 80);
      expect(midRange.map(p => p.id)).toEqual(['p-100', 'p-102']);
    });

  
  it('TC7 – filters by category and stock (typical e-commerce scenario)', () => {
      const availableElectronics = filter(products, p => p.category === 'electronics' && p.inStock);
      expect(availableElectronics.map(p => p.id)).toEqual(['p-100', 'p-103']);
    });

  
  it('TC8 – supports predicates using optional fields', () => {
      const highlyRated = filter(products, p => (p.rating != null ? p.rating : 0) >= 4.5);
      expect(highlyRated.map(p => p.id)).toEqual(['p-102']);
    });


  it('TC9 – preserves object references (no deep cloning)', () => {
      const result = filter(products, p => p.inStock);
      result[0].name = 'Wireless Mouse (New)';
      expect(products[0].name).toBe('Wireless Mouse (New)');
      result[0].name = 'Wireless Mouse';
      products[0].name = 'Wireless Mouse';
    });


  it('TC10 – accepts complex predicate logic combining index & collection context', () => {
      const sorted = products.slice().sort((a, b) => a.price - b.price);
      const medianIndex = Math.floor(sorted.length / 2);
      const threshold = sorted[medianIndex].price;

      const result = filter(products, (p, i, arr) => {
        const avg = arr.reduce((sum, x) => sum + x.price, 0) / arr.length;
        return p.price >= Math.min(avg, threshold);
      });

      expect(result.map(p => p.id)).toEqual(['p-100', 'p-101', 'p-102']);
    });


  it('TC11 – throws a TypeError when predicate is not a function', () => {
      expect(() => filter(products, 'not-a-function')).toThrow(TypeError);
      expect(() => filter(products, 123)).toThrow(TypeError);
      expect(() => filter(products, null)).toThrow(TypeError);
      expect(() => filter(products, undefined)).toThrow(TypeError);
    });

  it('TC12 –works with array-like objects (if supported)', () => {
    const arrayLike = { 0: 'A', 1: 'B', 2: 'C', length: 3 };
    const result = filter(arrayLike, (v) => v !== 'B');
    expect(result).toEqual(['A', 'C']);
    });

  it('TC13 – correctly handles functions that always return falsy/truthy', () => {
    expect(filter(products, () => false)).toEqual([]);
    expect(filter(products, () => true)).toEqual(products);
  });

})