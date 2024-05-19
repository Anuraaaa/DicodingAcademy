function actionLogin (data) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: data
  }
}

function actionLogout () {
  return {
    type: 'LOGOUT_SUCCESS'
  }
}

export { actionLogin, actionLogout }
