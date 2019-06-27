const path = require('path')
const dotenv = require('dotenv')
const Fastify = require('fastify')
const autoload = require('fastify-autoload')
const fastifyRedis = require('fastify-redis')

// Load enviroment variables
dotenv.config()

// Create a fastify instance
const fastify = Fastify({ logger: true })

// Register redis, plugins and controllers
fastify.register(fastifyRedis, { host: '127.0.0.1' })
fastify.register(autoload, { dir: path.join(__dirname, 'plugins') })
fastify.register(autoload, { dir: path.join(__dirname, 'controllers') })

// Main function
const main = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000)
    const { port } = fastify.server.address()
    fastify.log.info(`Server running on ${port}`)
  } catch (error) {
    fastify.log.error(err)
    process.exit(1)
  }
}

main()
