/*
    - Test Scenarios for Thread Actions:
        - Initial Setup:
            - Initialize the mock store before each test and clear all mocks after each test
        - Fetching All Threads:
            - When the action to fetch all threads is dispatched, the store should handle loading states and update the state with the fetched threads and filter threads action
        - Fetching a Single Thread:
            - When the action to fetch a single thread is dispatched, the store should handle loading states and update the state with the fetched single thread
        - Upvoting a Thread:
            - When the action to upvote a thread is dispatched, the store should update the state with the upvoted thread
        - Downvoting a Thread:
            - When the action to downvote a thread is dispatched, the store should update the state with the downvoted thread
        - Neutral Voting a Thread
            - When the action to neutral vote a thread is dispatched, the store should update the state with the neutral voted thread
        - Upvoting a Single Thread:
            - When the action to upvote a single thread is dispatched, the store should update the state with the upvoted single thread
        - Downvoting a Single Thread:
            - When the action to downvote a single thread is dispatched, the store should update the state with the downvoted single thread
        - Neutral Voting a Single Thread:
            - When the action to neutral vote a single thread is dispatched, the store should update the state with the neutral voted single thread
        - Creating a Comment:
            - When the action to create a comment is dispatched, the store should update the state with the created comment
        - Upvoting a Comment:
            - When the action to upvote a comment is dispatched, the store should update the state with the upvoted comment
        - Downvoting a Comment:
            - When the action to downvote a comment is dispatched, the store should update the state with the downvoted comment
        - Neutral Voting a Comment:
            - When the action to neutral vote a comment is dispatched, the store should update the state with the neutral voted comment
*/

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { getAllThread, getThreadById } from '../../data'
import {
  actionFetchThread,
  actionFetchSingleThread,
  actionThread,
  actionFilterThread,
  actionSingleThread,
  actionUpVoteThread,
  actionDownVoteThread,
  actionNeutralVoteThread,
  actionUpVoteSingleThread,
  actionDownVoteSingleThread,
  actionNeutralVoteSingleThread,
  actionComment,
  actionUpVoteComment,
  actionDownVoteComment,
  actionNeutralVoteComment
} from './action'
import { actionLoading } from '../loading/action'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

vi.mock('../../data', () => ({
    getAllThread: vi.fn(),
    getThreadById: vi.fn()
}))

describe('Thread Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore({})
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('creates THREAD_CREATE and THREAD_FILTER when fetching threads has been done', async () => {
        const threads = [{ id: 1, title: 'Thread 1' }]
        getAllThread.mockResolvedValue({ data: { threads } })

        const expectedActions = [
            showLoading(),
            actionLoading(true),
            actionThread(threads),
            actionFilterThread(threads),
            hideLoading(),
            actionLoading(false)
        ]

        await store.dispatch(actionFetchThread())

        expect(store.getActions()).toEqual(expectedActions)
    })

    it('creates SINGLE_THREAD_CREATE when fetching a single thread has been done', async () => {
        const detailThread = { id: 1, title: 'Thread 1' }
        getThreadById.mockResolvedValue({ data: { detailThread } })

        const expectedActions = [
            showLoading(),
            actionLoading(true),
            actionSingleThread(detailThread),
            hideLoading(),
            actionLoading(false)
        ]

        await store.dispatch(actionFetchSingleThread(1))

        expect(store.getActions()).toEqual(expectedActions)
    })

    it('creates UP_VOTE_THREAD when upvoting a thread', () => {
        const threadId = 1
        const expectedAction = {
            type: 'UP_VOTE_THREAD',
            payload: threadId
        }

        expect(actionUpVoteThread(threadId)).toEqual(expectedAction)
    })

    it('creates DOWN_VOTE_THREAD when downvoting a thread', () => {
        const threadId = 1
        const expectedAction = {
            type: 'DOWN_VOTE_THREAD',
            payload: threadId
        }

        expect(actionDownVoteThread(threadId)).toEqual(expectedAction)
    })

    it('creates NEUTRAL_VOTE_THREAD when neutral voting a thread', () => {
        const threadId = 1
        const expectedAction = {
            type: 'NEUTRAL_VOTE_THREAD',
            payload: threadId
        }

        expect(actionNeutralVoteThread(threadId)).toEqual(expectedAction)
    })

    it('creates UP_VOTE_SINGLE_THREAD when upvoting a single thread', () => {
        const threadId = 1
        const expectedAction = {
            type: 'UP_VOTE_SINGLE_THREAD',
            payload: threadId
        }

        expect(actionUpVoteSingleThread(threadId)).toEqual(expectedAction)
    })

    it('creates DOWN_VOTE_SINGLE_THREAD when downvoting a single thread', () => {
        const threadId = 1
        const expectedAction = {
            type: 'DOWN_VOTE_SINGLE_THREAD',
            payload: threadId
        }

        expect(actionDownVoteSingleThread(threadId)).toEqual(expectedAction)
    })

    it('creates NEUTRAL_VOTE_SINGLE_THREAD when neutral voting a single thread', () => {
        const threadId = 1
        const expectedAction = {
            type: 'NEUTRAL_VOTE_SINGLE_THREAD',
            payload: threadId
        }

        expect(actionNeutralVoteSingleThread(threadId)).toEqual(expectedAction)
    })

    it('creates COMMENT_CREATE when creating a comment', () => {
        const comment = { id: 1, text: 'This is a comment' }
        const expectedAction = {
            type: 'COMMENT_CREATE',
            payload: comment
        }

        expect(actionComment(comment)).toEqual(expectedAction)
    })

    it('creates UP_VOTE_COMMENT when upvoting a comment', () => {
        const commentId = 1
        const expectedAction = {
            type: 'UP_VOTE_COMMENT',
            payload: commentId
        }

        expect(actionUpVoteComment(commentId)).toEqual(expectedAction)
    })

    it('creates DOWN_VOTE_COMMENT when downvoting a comment', () => {
        const commentId = 1
        const expectedAction = {
            type: 'DOWN_VOTE_COMMENT',
            payload: commentId
        }

        expect(actionDownVoteComment(commentId)).toEqual(expectedAction)
    })

    it('creates NEUTRAL_VOTE_COMMENT when neutral voting a comment', () => {
        const commentId = 1
        const expectedAction = {
            type: 'NEUTRAL_VOTE_COMMENT',
            payload: commentId
        }

        expect(actionNeutralVoteComment(commentId)).toEqual(expectedAction)
    })
})
