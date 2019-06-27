module.exports = function(fastify, opts, next) {
  fastify.get('/movies', async (request, reply) => {
    const moviesWithoutShows = await fastify.redis.get('moviesWithoutShows')
    const movies = JSON.parse(moviesWithoutShows)

    reply.send(movies)
  })

  next()
}
