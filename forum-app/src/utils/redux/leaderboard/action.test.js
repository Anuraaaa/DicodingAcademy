/*
    - Test Scenarios for Leaderboard Actions:
        - Initial Setup and Mocking:
            - Ensure the mock store and mock functions are properly set up before each test and cleared after each test
        - Fetching Leaderboards Successfully:
            - When the actionFetchLeaderboard thunk is dispatched, it should create and dispatch the correct sequence of actions to fetch the leaderboards, update the state, and manage loading states
*/

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { getLeaderboards } from '../../data'
import { actionFetchLeaderboard, actionLeaderboard } from './action'
import { actionLoading } from '../loading/action'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

vi.mock('../../data', () => ({
    getLeaderboards: vi.fn()
}))

describe('Leaderboard Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore({})
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('creates LEADERBOARD_CREATE when fetching leaderboards has been done', async () => {
        const leaderboards = [{ id: 1, name: 'Leaderboard 1' }]
        getLeaderboards.mockResolvedValue({ data: { leaderboards } })

        const expectedActions = [
            showLoading(),
            actionLoading(true),
            actionLeaderboard(leaderboards),
            hideLoading(),
            actionLoading(false)
        ]

        await store.dispatch(actionFetchLeaderboard())

        expect(store.getActions()).toEqual(expectedActions)
    })
})
