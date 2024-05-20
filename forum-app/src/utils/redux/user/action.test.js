import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { getAllUser, getUserLoggedIn } from '../../data'
import {
  actionGetUser,
  actionUser,
  actionGetUserLoggedIn,
  actionUserLoggedIn
} from './action'
import { actionLoading } from '../loading/action'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

vi.mock('../../data', () => ({
    getAllUser: vi.fn(),
    getUserLoggedIn: vi.fn()
}))

describe('User Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore({})
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('creates USER_CREATE when fetching users has been done', async () => {
        const users = [{ id: 1, name: 'User 1' }]
        getAllUser.mockResolvedValue({ data: { users } })

        const expectedActions = [
            showLoading(),
            actionLoading(true),
            actionUser(users),
            hideLoading(),
            actionLoading(false)
        ]

        await store.dispatch(actionGetUser())

        expect(store.getActions()).toEqual(expectedActions)
    })

    it('creates USER_LOGGED_IN_CREATE when fetching logged in user has been done', async () => {
        const user = { id: 1, name: 'User 1' }
        getUserLoggedIn.mockResolvedValue({ data: { user } })

        const expectedActions = [
            showLoading(),
            actionLoading(true),
            actionUserLoggedIn(user),
            hideLoading(),
            actionLoading(false)
        ]

        await store.dispatch(actionGetUserLoggedIn())

        expect(store.getActions()).toEqual(expectedActions)
    })
})