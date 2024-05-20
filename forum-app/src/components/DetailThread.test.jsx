// eslint-disable-next-line no-unused-vars
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import DetailThread from './DetailThread'
import { createComment, dislikeThread, likeThread } from '../utils/data'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

vi.mock('../utils/data', () => ({
    createComment: vi.fn().mockResolvedValue({ error: false, message: '', data: {} }),
    dislikeThread: vi.fn().mockResolvedValue({ error: false, message: '', data: {} }),
    likeThread: vi.fn().mockResolvedValue({ error: false, message: '', data: {} })
}))

describe('DetailThread', () => {
  let store

  beforeEach(() => {
    store = mockStore({})
  })

  const defaultProps = {
    threadId: '1',
    loading: false,
    thread: {
      body: 'Thread body',
      category: 'Category',
      createdAt: '2023-01-01',
      id: '1',
      title: 'Thread title',
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        avatar: 'avatar.png',
        id: '1',
        name: 'Owner name'
      },
      comments: []
    },
    users: [
      {
        id: '1',
        name: 'Owner name',
        avatar: 'avatar.png'
      }
    ],
    userLoggedIn: {
      id: '2',
      name: 'User name',
      avatar: 'user-avatar.png',
      email: 'user@example.com'
    },
    isAuthenticate: true
  }

  it('renders thread details correctly', () => {
    render(
      <Provider store={store}>
        <DetailThread {...defaultProps} />
      </Provider>
    )

    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Thread title')).toBeInTheDocument()
    expect(screen.getByText('Thread body')).toBeInTheDocument()
    expect(screen.getByText('Dibuat oleh Owner name')).toBeInTheDocument()
  })

  it('handles comment submission', async () => {
    createComment.mockResolvedValue({ error: false, message: '', data: {} })
    render(
      <Provider store={store}>
        <DetailThread {...defaultProps} />
      </Provider>
    )

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New comment' } })
    fireEvent.click(screen.getByText('Kirim'))

    expect(createComment).toHaveBeenCalledWith({ threadId: '1', content: 'New comment' })
  })

  it('handles upvote', async () => {
    likeThread.mockResolvedValue({ error: false, message: '', data: {} })
    render(
      <Provider store={store}>
        <DetailThread {...defaultProps} />
      </Provider>
    )

    fireEvent.click(screen.getByText('thumb_up'))

    expect(likeThread).toHaveBeenCalledWith({ threadId: '1' })
  })

  it('handles downvote', async () => {
    dislikeThread.mockResolvedValue({ error: false, message: '', data: {} })
    render(
      <Provider store={store}>
        <DetailThread {...defaultProps} />
      </Provider>
    )

    fireEvent.click(screen.getByText('thumb_down'))

    expect(dislikeThread).toHaveBeenCalledWith({ threadId: '1' })
  })
})
