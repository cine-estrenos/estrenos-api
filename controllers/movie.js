const { getMovieById } = require('../utils/selectors')

module.exports = function(fastify, opts, next) {
  fastify.get('/movies/:id', async (request, reply) => {
    const movies = await fastify.redis.get('moviesWithoutShows')
    const moviesParsed = JSON.parse(movies)

    const { id: movieId } = request.params
    const movie = getMovieById(moviesParsed, movieId)

    return movie ? reply.send(movie) : reply.code(404).send('No movie found')
  })

  next()
}
