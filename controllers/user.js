'use strict'

const createUser = (request, h) => {
  console.log(request.payload)
  return 'usuario creado'
}

module.exports = {
  createUser
}
