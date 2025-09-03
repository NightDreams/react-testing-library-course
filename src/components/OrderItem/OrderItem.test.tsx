import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { OrderItem } from './OrderItem'
import { StatusBadge } from '../../components/StatusBadge'
import type { Order } from '../../types/Orders'

// 🔹 Mock StatusBadge para no depender de su implementación
vi.mock('../../components/StatusBadge', () => ({
  StatusBadge: ({ status }: { status: string }) => <div data-testid="status-badge">{status}</div>,
}))

const mockOrder: Order = {
  id: '123456789abcdef',
  orderDate: '2023-12-25T15:30:00Z',
  status: 'PENDING',
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
  },
  products: [
    { id: 'p1', name: 'Product 1', price: 10, quantity: 2 },
    { id: 'p2', name: 'Product 2', price: 5.5, quantity: 3 },
  ],
  paymentMethod: 'CREDIT_CARD',
  total: 36.5,
}

describe('OrderItem', () => {
  it('renders without crashing', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText(/Order #/i)).toBeInTheDocument()
  })

  it('shows the order id truncated to 8 characters', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText(/Order #12345678/)).toBeInTheDocument()
  })

  it('formats and displays the order date', () => {
    render(<OrderItem order={mockOrder} />)
    // Dependiendo de la zona horaria, mejor usar regex parcial
    expect(screen.getByText(/Dec/)).toBeInTheDocument()
    expect(screen.getByText(/2023/)).toBeInTheDocument()
  })

  it('renders the status badge with correct status', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByTestId('status-badge')).toHaveTextContent('PENDING')
  })

  it('shows customer name and email', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('renders all products with quantity and price', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText('Product 1 x2')).toBeInTheDocument()
    expect(screen.getByText('$20.00')).toBeInTheDocument()
    expect(screen.getByText('Product 2 x3')).toBeInTheDocument()
    expect(screen.getByText('$16.50')).toBeInTheDocument()
  })

  it('shows the payment method with underscores replaced', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText(/CREDIT CARD/)).toBeInTheDocument()
  })

  it('shows the total amount formatted', () => {
    render(<OrderItem order={mockOrder} />)
    expect(screen.getByText('$36.50')).toBeInTheDocument()
  })
})
