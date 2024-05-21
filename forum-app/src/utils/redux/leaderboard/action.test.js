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
