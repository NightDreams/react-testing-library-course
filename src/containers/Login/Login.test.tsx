import { act, fireEvent, render, screen } from '@testing-library/react'
import { Login } from './Login'
import { MemoryRouter } from 'react-router-dom'
import { SessionProvider } from '../../context/AuthContext'
import { getAuth } from '../../services/getAuth'
import { Mock } from 'vitest'

vi.mock('../../services/getAuth', () => ({
  getAuth: vi.fn(),
}))

const mockGetAuth = getAuth as Mock

describe('login', async () => {
  it('login error ', async () => {
    mockGetAuth.mockRejectedValueOnce(new Error('Invalid credentials'))

    render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    )
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
})
