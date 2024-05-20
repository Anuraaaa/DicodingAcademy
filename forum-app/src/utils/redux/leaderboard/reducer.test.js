import { describe, it, expect } from 'vitest'
import { leaderboardReducer } from './reducer'

describe('leaderboardReducer', () => {
  it('should return the initial state when no action is provided', () => {
    const initialState = []
    const action = {}
    const newState = leaderboardReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  it('should handle LEADERBOARD_CREATE', () => {
    const initialState = []
    const action = {
      type: 'LEADERBOARD_CREATE',
      payload: [{ id: 1, score: 100 }, { id: 2, score: 200 }]
    }
    const expectedState = {
      leaderboard: [{ id: 1, score: 100 }, { id: 2, score: 200 }]
    }
    const newState = leaderboardReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })

  it('should handle unknown action types by returning the current state', () => {
    const initialState = {
      leaderboard: [{ id: 1, score: 100 }]
    }
    const action = {
      type: 'UNKNOWN_ACTION'
    }
    const newState = leaderboardReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })
})
