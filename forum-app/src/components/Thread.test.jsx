// eslint-disable-next-line no-unused-vars
import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import Thread from './Thread'
import { likeThread, dislikeThread, neutralLikeThread } from '../utils/data'
import { actionUpVoteThread, actionDownVoteThread } from '../utils/redux/thread/action'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

vi.mock('../utils/data', () => ({
  likeThread: vi.fn(),
  dislikeThread: vi.fn(),
  neutralLikeThread: vi.fn()
}))

describe('Thread Component', () => {
  let store
  const mockUser = { id: 'user1', name: 'User 1', avatar: '', email: '' }
  const mockThread = {
    title: 'Test Thread',
    body: 'This is a test thread body',
    category: 'Test Category',
    createdAt: '2023-01-01T00:00:00Z',
    totalComments: 5,
    likes: [],
    dislikes: [],
    ownerId: 'user1',
    id: 'thread1',
    users: [mockUser],
    userLoggedIn: mockUser
  }

  beforeEach(() => {
    store = mockStore({})
  })

  it('renders thread details correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Thread {...mockThread} />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText('Test Category')).toBeInTheDocument()
    expect(screen.getByText('Test Thread')).toBeInTheDocument()
    expect(screen.getByText('This is a test thread body')).toBeInTheDocument()
    expect(screen.getByText('5x')).toBeInTheDocument()
    expect(screen.getByText('Dibuat oleh User 1')).toBeInTheDocument()
  })

  it('handles upvote correctly', async () => {
    likeThread.mockResolvedValue({ error: false, message: '', data: { id: 'thread1' } })
    neutralLikeThread.mockResolvedValue({ error: false, message: '', data: { id: 'thread1' } })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Thread {...mockThread} />
        </MemoryRouter>
      </Provider>
    )

    const upVoteButton = screen.getByRole('button', { name: /thumb_up/i })
    fireEvent.click(upVoteButton)

    expect(likeThread).toHaveBeenCalledWith({ threadId: 'thread1' })
    const threadId = 'thread1'
    const expectedAction = {
        type: 'UP_VOTE_THREAD',
        payload: threadId
    }
    expect(actionUpVoteThread(threadId)).toEqual(expectedAction)
})

  it('handles downvote correctly', async () => {
        dislikeThread.mockResolvedValue({ error: false, message: '', data: { id: 'thread1' } })
        neutralLikeThread.mockResolvedValue({ error: false, message: '', data: { id: 'thread1' } })

        render(
            <Provider store={store}>
                <MemoryRouter>
                <Thread {...mockThread} />
                </MemoryRouter>
            </Provider>
        )

        const downVoteButton = screen.getByRole('button', { name: /thumb_down/i })
        fireEvent.click(downVoteButton)
        expect(dislikeThread).toHaveBeenCalledWith({ threadId: 'thread1' })

        const threadId = 'thread1'
        const expectedAction = {
            type: 'DOWN_VOTE_THREAD',
            payload: threadId
        }
        expect(actionDownVoteThread(threadId)).toEqual(expectedAction)
    })
})
