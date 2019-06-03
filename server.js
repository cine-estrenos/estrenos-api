const fastify = require('fastify')({ logger: true })
const cron = require('node-cron')

const { getCinemarkData } = require('./utils/lib')

fastify.register(require('fastify-redis'), { host: '127.0.0.1' })

// Run it once at the server start
getCinemarkData().then(([data]) => {
  const { redis } = fastify
  redis.set('cinemarkData', data)
})

// Run a cron every five minutes to get data from Cinemark Official API parsed and save it to Redis
const task = cron.schedule('*/5 * * * *', async () => {
  const [data, error] = await getCinemarkData()
  const { redis } = fastify
  redis.set('cinemarkData', data)
})

// Make avaiable cinemarkData on all endpoints
fastify.addHook('onRequest', async (request, reply, next) => {
  const { redis } = fastify

  const cinemarkData = await redis.get('cinemarkData')
  const cinemarkDataParsed = JSON.parse(cinemarkData)
  request.cinemarkData = cinemarkDataParsed

  next()
})

// Get prepopulated data and expose it to all endpoints
fastify.get('/', async (request, reply) => {
  return request.cinemarkData
})

const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
