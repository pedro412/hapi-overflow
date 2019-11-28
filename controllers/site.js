'use strict'

const home = (request, h) => {
  return h.view('index', {
    title: 'Home'
  })
}

const register = (request, h) => {
  return h.view('register', {
    title: 'Register'
  })
}

const login = (request, h) => {
  return h.view('login', {
    title: 'Login'
  })
}

module.exports = {
  register,
  home,
  login
}
