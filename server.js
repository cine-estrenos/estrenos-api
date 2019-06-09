const Fastify = require('fastify')
const fastifyRedis = require('fastify-redis')
const cron = require('node-cron')

const getCinemarkData = require('./utils')

// Register Redis into Fastify
const fastify = Fastify({ logger: true })
fastify.register(fastifyRedis, { host: '127.0.0.1' })

// Get cinemark data and save it to Redis
const saveCinemarkDataToRedis = async () => {
  const { data } = await getCinemarkData()
  if (data) data.forEach(([key, value]) => fastify.redis.set(key, JSON.stringify(value)))
}

// Run it once at the server start
saveCinemarkDataToRedis()

// Run a cron every five minutes
const task = cron.schedule('*/5 * * * *',  () => saveCinemarkDataToRedis())


// Fastify endpoints
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

// Main function
const main = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

main()
