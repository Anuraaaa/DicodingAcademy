// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserLeaderboard from './UserLeaderboard'

describe('UserLeaderboard Component', () => {
  const mockProps = {
    name: 'John Doe',
    score: 100,
    avatar: 'https://example.com/avatar.jpg'
  }

  it('renders the user name', () => {
    render(<UserLeaderboard {...mockProps} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders the user score', () => {
    render(<UserLeaderboard {...mockProps} />)
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders the user avatar', () => {
    render(<UserLeaderboard {...mockProps} />)
    const avatar = screen.getByAltText('John Doe')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg')
  })
})
