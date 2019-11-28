'use strict'

const register = (request, h) => {
  return h.view('register', {
    title: 'Register'
  })
}

const home = (request, h) => {
  return h.view('index', {
    title: 'Home'
  })
}

module.exports = {
  register,
  home
}
