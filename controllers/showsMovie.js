const { getShowsByMovieId } = require('../utils/selectors')

module.exports = function(fastify, opts, next) {
  fastify.get('/shows/:movieId', async (request, reply) => {
    const movies = await fastify.redis.get('movies')
    const moviesParsed = JSON.parse(movies)

    const { movieId } = request.params
    const shows = getShowsByMovieId(moviesParsed, movieId)

    return shows ? reply.send(shows) : reply.code(404).send('No shows found')
  })

  next()
}
