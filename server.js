const Fastify = require('fastify')
const fastifyRedis = require('fastify-redis')
const cron = require('node-cron')
const dotenv = require('dotenv')

const { getCinemarkData } = require('./utils')
const { getMovieById, getShowsByMovieId, getShowsByMovieIdAndCinemaId } = require('./utils/selectors')

// Load enviroment variables
dotenv.config()

// Register Redis into Fastify
const fastify = Fastify({ logger: true })
fastify.register(fastifyRedis, { host: '127.0.0.1' })

// Get cinemark data and save it to Redis
const saveCinemarkDataToRedis = async () => {
  const { data, error } = await getCinemarkData()
  if (error) console.error(error)
  if (data) data.forEach(([key, value]) => fastify.redis.set(key, JSON.stringify(value)))
}

// Run it once at the server start
saveCinemarkDataToRedis()

// Run a cron every five minutes
const task = cron.schedule('*/5 * * * *', () => saveCinemarkDataToRedis())

// Fastify endpoints
fastify.get('/', async (request, reply) => {
  const timestamp = await fastify.redis.get('timeStamp')
  const timestampParsed = JSON.parse(timestamp)

  reply.send(timestampParsed)
})

// Cinemas endpoint
fastify.get('/cinemas', async (request, reply) => {
  const cinemas = await fastify.redis.get('cinemas')
  const cinemasParsed = JSON.parse(cinemas)

  reply.send(cinemasParsed)
})

// Movies endpoint
fastify.get('/movies', async (request, reply) => {
  const moviesWithoutShows = await fastify.redis.get('moviesWithoutShows')
  const movies = JSON.parse(moviesWithoutShows)

  reply.send(movies)
})

// Movie endpoint
fastify.get('/movies/:id', async (request, reply) => {
  const movies = await fastify.redis.get('moviesWithoutShows')
  const moviesParsed = JSON.parse(movies)

  const { id: movieId } = request.params
  const movie = getMovieById(moviesParsed, movieId)

  return movie ? reply.send(movie) : reply.code(404).send('No movie found')
})

// Shows per movie endpoint
fastify.get('/shows/:movieId', async (request, reply) => {
  const movies = await fastify.redis.get('movies')
  const moviesParsed = JSON.parse(movies)

  const { movieId } = request.params
  const shows = getShowsByMovieId(moviesParsed, movieId)

  return shows ? reply.send(shows) : reply.code(404).send('No shows found')
})

// Shows per movie and cinema endpoint
fastify.get('/shows/:movieId/:cinemaId', async (request, reply) => {
  const movies = await fastify.redis.get('movies')
  const moviesParsed = JSON.parse(movies)

  const { movieId, cinemaId } = request.params
  const shows = getShowsByMovieIdAndCinemaId(moviesParsed, movieId, cinemaId)

  return shows ? reply.send(shows) : reply.code(404).send('No shows found')
})

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
