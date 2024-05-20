import { describe, it, expect } from 'vitest'
import { userReducer, userLoggedInReducer } from './reducer'

describe('userReducer', () => {
  it('should return the initial state when no action is provided', () => {
    const initialState = []
    const action = {}
    const newState = userReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  it('should handle USER_CREATE', () => {
    const initialState = []
    const action = {
      type: 'USER_CREATE',
      payload: { id: 1, name: 'John Doe' }
    }
    const expectedState = {
      user: { id: 1, name: 'John Doe' }
    }
    const newState = userReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })
})

describe('userLoggedInReducer', () => {
  it('should return the initial state when no action is provided', () => {
    const initialState = []
    const action = {}
    const newState = userLoggedInReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  it('should handle USER_LOGGED_IN_CREATE', () => {
    const initialState = []
    const action = {
      type: 'USER_LOGGED_IN_CREATE',
      payload: { id: 1, name: 'John Doe', loggedIn: true }
    }
    const expectedState = {
      userLoggedIn: { id: 1, name: 'John Doe', loggedIn: true }
    }
    const newState = userLoggedInReducer(initialState, action)
    expect(newState).toEqual(expectedState)
  })
})
