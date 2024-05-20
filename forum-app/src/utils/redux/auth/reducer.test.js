import { describe, it, expect } from 'vitest'
import { authReducer } from './reducer'

describe('authReducer', () => {
  it('should return the initial state when no action is provided', () => {
    const initialState = []
    const action = {}
    const newState = authReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  it('should handle LOGIN_SUCCESS', () => {
    const initialState = []
    const action = {
      type: 'LOGIN_SUCCESS',
      payload: { id: 1, name: 'John Doe' }
    }
    const expectedState = {
      isAuth: true,
      user: { id: 1, name: 'John Doe' }
    }
    const newState = authReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })

  it('should handle LOGOUT_SUCCESS', () => {
    const initialState = {
      isAuth: true,
      user: { id: 1, name: 'John Doe' }
    }
    const action = {
      type: 'LOGOUT_SUCCESS',
      payload: null
    }
    const expectedState = {
      isAuth: false,
      user: null
    }
    const newState = authReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })

  it('should handle unknown action types by returning the current state', () => {
    const initialState = {
      isAuth: true,
      user: { id: 1, name: 'John Doe' }
    }
    const action = {
      type: 'UNKNOWN_ACTION'
    }
    const newState = authReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })
})
