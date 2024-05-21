/*
  - Test Scenarios for Header Component:
    - Render Header with Correct Text:
      - Verify that the Header component renders with the text "Forum App"
    - Header Contains Correct Styles:
      - Verify that the Header component's container has the class container mx-auto
*/

// eslint-disable-next-line no-unused-vars
import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header Component', () => {
  it('renders the header with correct text', () => {
    render(<Header />)

    expect(screen.getByText('Forum App')).toBeInTheDocument()
  })

  it('has the correct styles', () => {
    render(<Header />)

    const headerElement = screen.getByText('Forum App').closest('div')
    expect(headerElement).toHaveClass('container mx-auto')
  })
})
