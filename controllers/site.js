'use strict'

const home = (request, h) => {
  return h.view('index', {
    title: 'Home',
    user: request.state.user
  })
}

const register = (request, h) => {
  return h.view('register', {
    title: 'Register',
    user: request.state.user
  })
}

const login = (request, h) => {
  return h.view('login', {
    title: 'Login',
    user: request.state.user
  })
}

module.exports = {
  register,
  home,
  login
}
