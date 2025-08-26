import { act, render, screen, waitFor } from '@testing-library/react'
import { Login } from './Login'
import { MemoryRouter } from 'react-router-dom'
import { SessionProvider } from '../../context/AuthContext'
import { getAuth } from '../../services/getAuth'
import { Mock } from 'vitest'
import userEvent from '@testing-library/user-event'

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
  const handleLogin = async () => {
    // render dentro de act async para manejar updates async del provider
    await act(async () => {
      render(
        <SessionProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </SessionProvider>
      )
    })
  }
  it('login error', async () => {
    mockGetAuth.mockRejectedValue(new Error('Invalid credentials'))

    await handleLogin()

    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const buttonLogin = screen.getByRole('button', { name: 'Login' })

    // limpia los inputs antes de escribir
    await userEvent.clear(usernameInput)
    await userEvent.type(usernameInput, 'wrongUser')
    await userEvent.clear(passwordInput)
    await userEvent.type(passwordInput, 'wrongPassword')
    await userEvent.click(buttonLogin)

    // espera el mensaje de error
    const errorMessage = screen.getByText('Invalid credentials')
    expect(errorMessage).toBeInTheDocument()
  })

  it('debería redirigir a /orders', async () => {
    mockGetAuth.mockResolvedValue({ success: true })

    await handleLogin()

    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const buttonLogin = screen.getByRole('button', { name: 'Login' })

    await userEvent.clear(usernameInput)
    await userEvent.type(usernameInput, 'validUser')
    await userEvent.clear(passwordInput)
    await userEvent.type(passwordInput, 'validPassword')
    await userEvent.click(buttonLogin)

    await waitFor(() => {
      expect(mockGetAuth).toHaveBeenCalledWith('validUser', 'validPassword')
      expect(mockNavigate).toHaveBeenCalledWith('/orders')
    })
  })
})
