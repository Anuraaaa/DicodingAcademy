/*
  - Test Scenarios for threadFilterReducer:
    - Initial State:
      - When no action is provided, the threadFilterReducer should return the initial state
    - Handling THREAD_FILTER Action:
      - When the THREAD_FILTER action is dispatched, the threadFilterReducer should update the state with the filtered threads
    - Handling UP_VOTE_THREAD Action:
      When the UP_VOTE_THREAD action is dispatched, the threadFilterReducer should update the state to reflect the upvoted thread

  - Test Scenarios for threadReducer:
    - Initial State:
      - When no action is provided, the threadReducer should return the initial state
    - Handling THREAD_CREATE Action:
      - When the THREAD_CREATE action is dispatched, the threadReducer should update the state with the new thread

  - Test Scenarios for singleThreadReducer:
    - Initial State:
      - When no action is provided, the singleThreadReducer should return the initial state
    - Handling SINGLE_THREAD_CREATE Action:
      - When the SINGLE_THREAD_CREATE action is dispatched, the singleThreadReducer should update the state with the new single thread
    - Handling COMMENT_CREATE Action:
      - When the COMMENT_CREATE action is dispatched, the singleThreadReducer should update the state with the new comment for the thread
*/

import { describe, it, expect } from 'vitest'
import { threadReducer, threadFilterReducer, singleThreadReducer } from './reducer'

describe('threadFilterReducer', () => {
  it('should return the initial state when no action is provided', () => {
    const initialState = []
    const action = {}
    const newState = threadFilterReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  it('should handle THREAD_FILTER', () => {
    const initialState = []
    const action = {
      type: 'THREAD_FILTER',
      payload: [{ id: 1, title: 'Thread 1' }]
    }
    const expectedState = {
      filteredThread: [{ id: 1, title: 'Thread 1' }]
    }
    const newState = threadFilterReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })

  it('should handle UP_VOTE_THREAD', () => {
    const initialState = {
      filteredThread: [{ id: 1, title: 'Thread 1', upVotesBy: [] }]
    }
    const action = {
      type: 'UP_VOTE_THREAD',
      payload: { vote: { threadId: 1, userId: 2 } }
    }
    const expectedState = {
      filteredThread: [{ id: 1, title: 'Thread 1', upVotesBy: [2] }]
    }
    const newState = threadFilterReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })

  // Similar tests for DOWN_VOTE_THREAD and NEUTRAL_VOTE_THREAD
})

describe('threadReducer', () => {
  it('should return the initial state when no action is provided', () => {
    const initialState = []
    const action = {}
    const newState = threadReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  it('should handle THREAD_CREATE', () => {
    const initialState = []
    const action = {
      type: 'THREAD_CREATE',
      payload: { id: 1, title: 'Thread 1' }
    }
    const expectedState = {
      thread: { id: 1, title: 'Thread 1' }
    }
    const newState = threadReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })

  // Similar tests for UP_VOTE_THREAD, DOWN_VOTE_THREAD, and NEUTRAL_VOTE_THREAD
})

describe('singleThreadReducer', () => {
  it('should return the initial state when no action is provided', () => {
    const initialState = []
    const action = {}
    const newState = singleThreadReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  it('should handle SINGLE_THREAD_CREATE', () => {
    const initialState = []
    const action = {
      type: 'SINGLE_THREAD_CREATE',
      payload: { id: 1, title: 'Thread 1', comments: [] }
    }
    const expectedState = {
      detailThread: { id: 1, title: 'Thread 1', comments: [] }
    }
    const newState = singleThreadReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })

  it('should handle COMMENT_CREATE', () => {
    const initialState = {
      detailThread: { id: 1, title: 'Thread 1', comments: [] }
    }
    const action = {
      type: 'COMMENT_CREATE',
      payload: { comment: { id: 2, content: 'Comment 1' } }
    }
    const expectedState = {
      detailThread: { id: 1, title: 'Thread 1', comments: [{ id: 2, content: 'Comment 1' }] }
    }
    const newState = singleThreadReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })
})
