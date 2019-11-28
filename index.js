const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: process.env.port || 3000,
    host: 'localhost'
  })

  try {
    await server.start()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: (reques, h) => {
      return 'Hello world!'
    }
  })

  console.log(`Server running on ${server.info.uri}`)
}

init()
