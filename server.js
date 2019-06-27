const dotenv = require('dotenv')
const Fastify = require('fastify')
const fastifyRedis = require('fastify-redis')

const { cinemarkCron } = require('./plugins/cinemark')
const { getCinemas } = require('./controllers/cinemas')
const { getMovie, getMovies } = require('./controllers/movies')
const { getShowsByMovie, getShowsByCinema } = require('./controllers/shows')

// Load enviroment variables
dotenv.config()

// Create a fastify instance
const fastify = Fastify({ logger: true })

// Register redis and cron job
fastify.register(fastifyRedis, { host: '127.0.0.1' })
fastify.register(cinemarkCron)

// Routes
fastify.get('/cinemas', getCinemas(fastify))
fastify.get('/movies', getMovies(fastify))
fastify.get('/movies/:id', getMovie(fastify))
fastify.get('/shows/:movieId', getShowsByMovie(fastify))
fastify.get('/shows/:movieId/:cinemaId', getShowsByCinema(fastify))

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
