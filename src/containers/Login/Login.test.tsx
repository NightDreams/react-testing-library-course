import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Login } from './Login'
import { MemoryRouter } from 'react-router-dom'
import { SessionProvider } from '../../context/AuthContext'
import { getAuth } from '../../services/getAuth'
import { Mock } from 'vitest'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})
vi.mock('../../services/getAuth', () => ({
  getAuth: vi.fn(),
}))

const mockNavigate = vi.fn()
const mockGetAuth = getAuth as Mock

describe('login', async () => {
  const handleLogin = () => {
    return render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    )
  }
  it('login error ', async () => {
    mockGetAuth.mockRejectedValue(new Error('Invalid credentials'))

    handleLogin()
    // prepara ui elements for interaction
    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const buttonLogin = screen.getByRole('button', { name: 'Login' })

    // fire events to simulate user interaction
    await act(() => {
      fireEvent.change(usernameInput, { target: { value: 'wrongUser' } })
      fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } })
      fireEvent.click(buttonLogin)
    })
    // expects
    const errorMessage = screen.getByText('Invalid credentials')
    expect(errorMessage).toBeInTheDocument()
  })

  it('deberia redirigir a /orders', async () => {
    mockGetAuth.mockResolvedValue({ success: true })
    handleLogin()

    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const buttonLogin = screen.getByRole('button', { name: 'Login' })
    await act(() => {
      fireEvent.change(usernameInput, { target: { value: 'validUser' } })
      fireEvent.change(passwordInput, { target: { value: 'validPassword' } })
      fireEvent.click(buttonLogin)
    })
    await waitFor(() => {
      expect(mockGetAuth).toHaveBeenCalledWith('validUser', 'validPassword')
      expect(mockNavigate).toHaveBeenCalledWith('/orders')
    })
  })
})
