import { render, fireEvent, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with the correct label', () => {
    render(<Button label="click me "></Button>)
    const button = screen.getByText('click me ')
    expect(button).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    const { getByRole } = render(<Button label="Click me" onClick={handleClick} />)
    fireEvent.click(getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('uses the default type "button"', () => {
    const { getByRole } = render(<Button label="Default type" />)
    expect(getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('uses the provided type', () => {
    const { getByRole } = render(<Button label="Submit" type="submit" />)
    expect(getByRole('button')).toHaveAttribute('type', 'submit')
  })
})
