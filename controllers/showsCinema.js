const { getShowsByMovieIdAndCinemaId } = require('../utils/selectors')

module.exports = function(fastify, opts, next) {
  fastify.get('/shows/:movieId/:cinemaId', async (request, reply) => {
    const movies = await fastify.redis.get('movies')
    const moviesParsed = JSON.parse(movies)

    const { movieId, cinemaId } = request.params
    const shows = getShowsByMovieIdAndCinemaId(moviesParsed, movieId, cinemaId)

    return shows ? reply.send(shows) : reply.code(404).send('No shows found')
  })

  next()
}
