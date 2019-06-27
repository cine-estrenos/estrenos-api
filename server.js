const Fastify = require('fastify')
const AutoLoad = require('fastify-autoload')
const fastifyRedis = require('fastify-redis')
const cron = require('node-cron')
const dotenv = require('dotenv')
const path = require('path')

const { getCinemarkData } = require('./utils')

// Load enviroment variables
dotenv.config()

// Create a fastify instance. Register Redis and controllers.
const fastify = Fastify({ logger: true })
fastify.register(fastifyRedis, { host: '127.0.0.1' })
fastify.register(AutoLoad, { dir: path.join(__dirname, 'controllers') })

// Get cinemark data and save it to Redis.
const saveCinemarkDataToRedis = async () => {
  const { data, error } = await getCinemarkData()
  if (error) console.error(error)
  if (data) data.forEach(([key, value]) => fastify.redis.set(key, JSON.stringify(value)))
}

// Get cinemark data at the server start. Run it a cron every five minutes.
saveCinemarkDataToRedis()
cron.schedule('*/5 * * * *', () => saveCinemarkDataToRedis())

// Main function
const main = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

main()
