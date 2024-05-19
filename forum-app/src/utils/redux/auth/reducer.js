function authReducer (auth = [], action = {}) {
  if (action.type === 'LOGIN_SUCCESS') {
    return {
      ...auth,
      isAuth: true,
      user: action.payload
    }
  }
  if (action.type === 'LOGOUT_SUCCESS') {
    return {
      ...auth,
      isAuth: false,
      user: action.payload
    }
  }
  return auth
}

export { authReducer }
