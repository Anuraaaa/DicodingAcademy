import { describe, it, expect } from 'vitest'
import { createStore } from 'redux'
import rootReducer from './rootReducer'

describe('Integration tests for rootReducer', () => {
  it('should handle actions for authReducer correctly', () => {
    const store = createStore(rootReducer)

    // Dispatch LOGIN_SUCCESS action
    store.dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { id: 1, name: 'John Doe' }
    })

    const state = store.getState()
    expect(state.auth).toEqual({ isAuth: true, user: { id: 1, name: 'John Doe' } })
  })

  it('should handle actions for threadReducer correctly', () => {
    const store = createStore(rootReducer)

    // Dispatch THREAD_CREATE action
    store.dispatch({
      type: 'THREAD_CREATE',
      payload: [{ id: 1, title: 'Thread 1' }]
    })

    const state = store.getState()
    expect(state.thread).toEqual({ thread: [{ id: 1, title: 'Thread 1' }] })
  })

  it('should handle actions for userReducer correctly', () => {
    const store = createStore(rootReducer)

    // Dispatch USER_CREATE action
    store.dispatch({
      type: 'USER_CREATE',
      payload: { id: 1, name: 'John Doe' }
    })

    const state = store.getState()
    expect(state.user).toEqual({ user: { id: 1, name: 'John Doe' } })
  })

  it('should handle actions for userLoggedInReducer correctly', () => {
    const store = createStore(rootReducer)

    // Dispatch USER_LOGGED_IN_CREATE action
    store.dispatch({
      type: 'USER_LOGGED_IN_CREATE',
      payload: { id: 1, name: 'John Doe', loggedIn: true }
    })

    const state = store.getState()
    expect(state.userLoggedIn).toEqual({ userLoggedIn: { id: 1, name: 'John Doe', loggedIn: true } })
  })

  it('should handle actions for leaderboardReducer correctly', () => {
    const store = createStore(rootReducer)

    // Dispatch LEADERBOARD_CREATE action
    store.dispatch({
      type: 'LEADERBOARD_CREATE',
      payload: [{ id: 1, score: 100 }]
    })

    const state = store.getState()
    expect(state.leaderboard).toEqual({ leaderboard: [{ id: 1, score: 100 }] })
  })

  it('should handle actions for loadingReducer correctly', () => {
    const store = createStore(rootReducer)

    // Dispatch LOADING_STATE action
    store.dispatch({
      type: 'LOADING_STATE',
      payload: true
    })

    const state = store.getState()
    expect(state.loading).toEqual({ loading: true })
  })
})
