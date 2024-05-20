import { describe, it, expect } from 'vitest'
import { loadingReducer } from './reducer'

describe('loadingReducer', () => {
  it('should return the initial state when no action is provided', () => {
    const initialState = []
    const action = {}
    const newState = loadingReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  it('should handle LOADING_STATE', () => {
    const initialState = []
    const action = {
      type: 'LOADING_STATE',
      payload: true
    }
    const expectedState = {
      loading: true
    }
    const newState = loadingReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })

  it('should handle unknown action types by returning the current state', () => {
    const initialState = {
      loading: false
    }
    const action = {
      type: 'UNKNOWN_ACTION'
    }
    const newState = loadingReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })
})
