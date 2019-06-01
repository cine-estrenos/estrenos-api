const fastify = require('fastify')({ logger: true })
const cron = require('node-cron')

const { getCinemarkData } = require('./util/lib')

// Run it once at the server start
getCinemarkData().then(([data]) => {
  fastify.decorate('cinemark', { data })
})

// Run a cron every one-minute to get data from Cinemark Official API
const task = cron.schedule('*/1 * * * *', async () => {
  const [data, error] = await getCinemarkData()
  // FIXME:    "FST_ERR_DEC_ALREADY_PRESENT: The decorator 'cinemark' has already been added!",
  fastify.decorate('cinemark', { data })
})

// Get prepopulated data and expose it to all endpoints
fastify.get('/', async (request, reply) => {
  return fastify.cinemark.data
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
