/*
  - Test Scenarios for FormAuth Component:
    - Render Login Form Correctly:
      - Verify that the login form renders with email and password fields, and without the username and password confirmation fields
    - Render Register Form Correctly:
      - Verify that the register form renders with email, password, username, and password confirmation fields
    - Validate Login Form Fields:
      - Attempt to submit the login form with empty fields and verify that the appropriate error message is shown
    - Validate Register Form Fields:
      - Attempt to submit the register form with empty fields and verify that the appropriate error message is shown
    - Submit Login Form Successfully:
      - Fill in the login form with valid data, submit it, and verify that the appropriate functions are called and the success message is shown
    - Submit Register Form Successfully:
      - Fill in the register form with valid data, submit it, and verify that the appropriate functions are called and the success message is shown
*/

// eslint-disable-next-line no-unused-vars
import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, fireEvent, screen, act } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'
import configureStore from 'redux-mock-store'
import FormAuth from './FormAuth.jsx'
import { loginUser, registerUser, putAccessToken } from '../utils/data.js'
import { showToast } from '../utils/toast.js'
import { actionLogin } from '../utils/redux/auth/action.js'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

vi.mock('../utils/data.js', () => ({
  registerUser: vi.fn().mockResolvedValue({ error: '', message: '', data: {} }),
  loginUser: vi.fn().mockResolvedValue({ error: '', message: '', data: {} }),
  putAccessToken: vi.fn()
}))

vi.mock('../utils/toast.js', () => ({
  showToast: vi.fn()
}))

vi.mock('../utils/redux/auth/action.js', () => ({
  actionLogin: vi.fn().mockReturnValue({ type: 'LOGIN_SUCCESS', payload: { } })
}))

const renderComponent = (store, state) => {
  return render(
    <Provider store={store}>
      <Router>
        <FormAuth state={state} />
      </Router>
    </Provider>
  )
}

describe('FormAuth Component', () => {
  let store

  beforeEach(() => {
    store = mockStore({})
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form correctly', () => {
    renderComponent(store, 'login')
    expect(screen.getByText('Form Login')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.queryByLabelText('Username')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Password Confirmation')).not.toBeInTheDocument()
  })

  it('renders register form correctly', () => {
    renderComponent(store, 'register')
    expect(screen.getByText('Form Register')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password Confirmation')).toBeInTheDocument()
  })

  it('validates login form fields', async () => {
    renderComponent(store, 'login')
    fireEvent.click(screen.getByText('Login'))

    expect(showToast).toHaveBeenCalledWith('Gagal login! email tidak ada', 'white', 'red')
  })

  it('validates register form fields', async () => {
    renderComponent(store, 'register')
    fireEvent.click(screen.getByText('Register'))

    expect(showToast).toHaveBeenCalledWith('Gagal register! username tidak ada', 'white', 'red')
  })

  it('submits login form successfully', async () => {
    loginUser.mockResolvedValue({ error: false, message: '', data: { token: 'token123' } })
    renderComponent(store, 'login')

    await act(async () => {
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } })
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } })
        fireEvent.click(screen.getByText('Login'))
    })

    expect(loginUser).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' })
    expect(putAccessToken).toHaveBeenCalledWith('token123')
    expect(showToast).toHaveBeenCalledWith('Berhasil login', 'white', 'green')
    expect(actionLogin).toHaveBeenCalledWith({ token: 'token123' })
  })

  it('submits register form successfully', async () => {
    registerUser.mockResolvedValue({ error: false, message: '', data: {} })
    renderComponent(store, 'register')

    await act(async () => {
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } })
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } })
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } })
        fireEvent.change(screen.getByLabelText('Password Confirmation'), { target: { value: 'password123' } })
        fireEvent.click(screen.getByText('Register'))
    })

    expect(registerUser).toHaveBeenCalledWith({ name: 'testuser', email: 'test@example.com', password: 'password123' })
    expect(showToast).toHaveBeenCalledWith('Berhasil register, silahkan login', 'white', 'green')
  })
})
