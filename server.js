const fastify = require('fastify')({ logger: true })
const cron = require('node-cron')

const { getCinemarkData } = require('./utils/lib')

// Register Redis into Fastify
fastify.register(require('fastify-redis'), { host: '127.0.0.1' })

// Run it once at the server start
getCinemarkData().then(({ data }) => {
  if (data) data.forEach(([key, value]) => fastify.redis.set(key, JSON.stringify(value)))
})

// Run a cron every five minutes to get data from Cinemark Official API parsed and save it to Redis
const task = cron.schedule('*/5 * * * *', async () => {
  const { data, error } = await getCinemarkData()
  if (data) data.forEach(([key, value]) => fastify.redis.set(key, JSON.stringify(value)))
})

fastify.get('/', async (request, reply) => {
  const timestamp = await fastify.redis.get('timeStamp')
  const timestampParsed = JSON.parse(timestamp)

  return timestampParsed
})

fastify.get('/cinemas', async (request, reply) => {
  const cinemas = await fastify.redis.get('cinemas')
  const cinemasParsed = JSON.parse(cinemas)

  return cinemasParsed
})

fastify.get('/films', async (request, reply) => {
  const films = await fastify.redis.get('films')
  const filmsParsed = JSON.parse(films)

  return filmsParsed
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
