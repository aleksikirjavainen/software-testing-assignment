import camelCase from '../library/camelCase.js'

describe('camelCase', () => {
  test('Simple two-word string', () => {
    expect(camelCase('Product name')).toBe('productName')
  })

  test('Multiple words', () => {
    expect(camelCase('hello world test')).toBe('helloWorldTest')
  })

  test('Hyphen separated', () => {
    expect(camelCase('hello-world')).toBe('helloWorld')
  })

  test('Underscore separated', () => {
    expect(camelCase('hello_world')).toBe('helloWorld')
  })

  test('Dot separated', () => {
    expect(camelCase('hello.world.test')).toBe('helloWorldTest')
  })

  test('PascalCase input', () => {
    expect(camelCase('PascalCaseTest')).toBe('pascalCaseTest')
  })
})
