import { Mock, MockInstance } from 'vitest'

import { renderHook, waitFor } from '@testing-library/react'
import * as ReactRouter from 'react-router-dom'
import { useOrders } from './useOrders'
import * as AuthContext from '../context/AuthContext'
import * as OrderService from '../services/getOrders'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}))

describe('useOrders', () => {
  let useSessionSpy: MockInstance
  let getOrdersSpy: MockInstance
  const mockNavigate = vi.fn()

  beforeEach(() => {
    //prepare mocks before each test
    useSessionSpy = vi.spyOn(AuthContext, 'useSession')
    getOrdersSpy = vi.spyOn(OrderService, 'getOrders')
    ;(ReactRouter.useNavigate as Mock).mockReturnValueOnce(mockNavigate)

    vi.clearAllMocks()
  })

  afterEach(() => {
    //reset mocks after each test
    vi.restoreAllMocks()
  })

  it('should render error', async () => {
    //inyect values
    useSessionSpy.mockReturnValue({ user: { id: '1' } })
    getOrdersSpy.mockRejectedValue(new Error('API error'))

    const { result } = renderHook(() => useOrders())
    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBeNull()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('Failed to fetch orders. Please try again later.')
      expect(getOrdersSpy).toHaveBeenCalledTimes(1)
    })
  })

  // end
})
