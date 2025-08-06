import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Calculator } from './Calculator'

// TDT: Tabla de casos de prueba
const cases = [
  { a: 2, b: 3, operation: 'add', expected: '5' },
  { a: 5, b: 2, operation: 'subtract', expected: '3' },
  { a: 4, b: 3, operation: 'multiply', expected: '12' },
  { a: 10, b: 2, operation: 'divide', expected: '5' },
  { a: 10, b: 0, operation: 'divide', expected: 'Error' },
  { a: 1, b: 2, operation: 'modulo', expected: 'Invalid operation' },
  // Casos adicionales
  { a: -2, b: -3, operation: 'add', expected: '-5' },
  { a: 0, b: 0, operation: 'add', expected: '0' },
  { a: 7, b: 0, operation: 'multiply', expected: '0' },
  { a: 0, b: 7, operation: 'subtract', expected: '-7' },
  { a: 9, b: 3, operation: 'divide', expected: '3' },
  { a: 9, b: 0, operation: 'subtract', expected: '9' },
]

describe('<Calculator /> TDT', () => {
  it.each(cases)(
    'debería mostrar "Result: $expected" para $a $operation $b',
    ({ a, b, operation, expected }) => {
      render(<Calculator a={a} b={b} operation={operation} />)
      expect(screen.getByText(`Result: ${expected}`)).toBeInTheDocument()
    }
  )
})
