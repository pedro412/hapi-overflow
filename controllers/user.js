'use strict'

const users = require('../models/index').users

const createUser = async (request, h) => {
  let result

  try {
    result = await users.createUser(request.payload)
  } catch (error) {
    console.error(error)
    return h.response('Error creating new user').code(500)
  }

  return h.response(`User created: ${result}`)
}

const validateUser = async (request, h) => {
  let result

  try {
    result = await users.validateUser(request.payload)
    if (!result) {
      return h.response('Wrong credentials').code(401)
    }
  } catch (error) {
    console.error(error)
    return h.response('wrong credentials').code(500)
  }

  return h.redirect('/').state('user', {
    name: result.name,
    email: result.email
  })
}

const logout = (request, h) => {
  return h.redirect('/login').unstate('user')
}

module.exports = {
  createUser,
  validateUser,
  logout
}
