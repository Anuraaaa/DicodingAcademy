/*
  - Test Scenarios for Comment Component:
    - Render Comment Details Correctly:
      - Ensure the component renders the provided user name and comment text
    - Handle Upvote (Like) Action:
      - Simulate a click on the 'thumb_up' button and verify the likeComment function is called with the correct arguments
    - Handle Downvote (Dislike) Action:
      - Simulate a click on the 'thumb_down' button and verify the dislikeComment function is called with the correct arguments
*/

// eslint-disable-next-line no-unused-vars
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import Comment from './Comment'
import { likeComment, dislikeComment } from '../utils/data'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

vi.mock('../utils/data', () => ({
  likeComment: vi.fn().mockResolvedValue({ error: false, message: '', data: {} }),
  dislikeComment: vi.fn().mockResolvedValue({ error: false, message: '', data: {} })
}))

describe('Comment', () => {
  let store

  beforeEach(() => {
    store = mockStore({})
  })

  const defaultProps = {
    name: 'User name',
    id: '1',
    threadId: '1',
    comment: 'This is a comment',
    avatar: 'avatar.png',
    createdAt: '2023-01-01',
    likes: [],
    dislikes: [],
    userLoggedIn: {
      id: '2',
      name: 'User name',
      avatar: 'user-avatar.png',
      email: 'user@example.com'
    }
  }

  it('renders comment details correctly', () => {
    render(
      <Provider store={store}>
        <Comment {...defaultProps} />
      </Provider>
    )

    expect(screen.getByText('User name')).toBeInTheDocument()
    expect(screen.getByText('This is a comment')).toBeInTheDocument()
  })

  it('handles upvote', async () => {
    likeComment.mockResolvedValue({ error: false, message: '', data: {} })
    render(
      <Provider store={store}>
        <Comment {...defaultProps} />
      </Provider>
    )

    fireEvent.click(screen.getByText('thumb_up'))

    expect(likeComment).toHaveBeenCalledWith({ threadId: '1', commentId: '1' })
  })

  it('handles downvote', async () => {
    dislikeComment.mockResolvedValue({ error: false, message: '', data: {} })
    render(
      <Provider store={store}>
        <Comment {...defaultProps} />
      </Provider>
    )

    fireEvent.click(screen.getByText('thumb_down'))

    expect(dislikeComment).toHaveBeenCalledWith({ threadId: '1', commentId: '1' })
  })
})
