'use strict'

const users = require('../models/index').users
const Boom = require('@hapi/boom')

const createUser = async (request, h) => {
  console.log('aca')

  try {
    await users.createUser(request.payload)

    return h.view('register', {
      title: 'register',
      success: 'User created successfully'
    })
  } catch (error) {
    console.error(error)
    return h.view('register', {
      title: 'register',
      error: 'Error creating user'
    })
  }
}

const validateUser = async (request, h) => {
  let result

  try {
    result = await users.validateUser(request.payload)
    if (result === 'wrong credentials') {
      return h.view('login', {
        title: 'login',
        error: 'Wrong Credentials'
      })
    }

    return h.redirect('/').state('user', {
      name: result.name,
      email: result.email
    })
  } catch (error) {
    console.error(error)
    return h.response('wrong credentials').code(500)
  }
}

const failValidation = (request, h, error) => {
  return Boom.badRequest('User validation failed', request.payload)
}

const logout = (request, h) => {
  return h.redirect('/login').unstate('user')
}

module.exports = {
  createUser,
  validateUser,
  logout,
  failValidation
}
