import { render, screen } from '@testing-library/react'
import HomePage from '@/pages/index'

// This is a sample test, to be removed

describe('HomePage', () => {
  it('renders the home page', () => {
    render(<HomePage />)

    const mainText = screen.getByText('GovStack');

    expect(mainText).toBeInTheDocument();
  })
})
