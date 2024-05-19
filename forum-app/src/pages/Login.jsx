import FormAuth from '../components/FormAuth'
import Header from '../components/Header'
import Navigation from '../components/Navigation'

function Login () {
  return (
    <>
      <Header />
      <FormAuth state='login' />
      <Navigation />
    </>
  )
}

export default Login
