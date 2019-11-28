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
  } catch (error) {
    console.error(error)
    return h.response('wrong credentials').code(500)
  }

  return h.response(result)
}

module.exports = {
  createUser,
  validateUser
}
