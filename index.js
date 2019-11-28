'use strict'

const Hapi = require('@hapi/hapi')
const handlebars = require('handlebars')
const vision = require('@hapi/vision')
const inert = require('@hapi/inert')
const path = require('path')

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

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return h.view('index', {
          title: 'Home'
        })
      }
    })

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          index: ['index.html']
        }
      }
    })

    await server.start()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

  console.log(`Server running on ${server.info.uri}`)
}

init()
