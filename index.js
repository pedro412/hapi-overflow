'use strict'

const Hapi = require('@hapi/hapi')
const handlebars = require('handlebars')
const path = require('path')
const routes = require('./routes')
const vision = require('@hapi/vision')
const inert = require('@hapi/inert')

const init = async () => {
  const server = Hapi.server({
    port: process.env.port || 3000,
    host: 'localhost',
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  })

  try {
    await server.register(inert)
    await server.register(vision)

    server.state('user', {
      ttl: 1000 * 60 * 60 * 24 * 7,
      isSecure: process.env.NODE_ENV === 'Production',
      encoding: 'base64json'
    })

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })

    server.route(routes)

    await server.start()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

  console.log(`Server running on ${server.info.uri}`)
}

init()
