const { getMovieById } = require('../selectors')

exports.getMovies = fastify => async (request, reply) => {
  const moviesWithoutShows = await fastify.redis.get('moviesWithoutShows')
  const movies = JSON.parse(moviesWithoutShows)

  reply.send(movies)
}

exports.getMovie = fastify => async (request, reply) => {
  const movies = await fastify.redis.get('moviesWithoutShows')
  const moviesParsed = JSON.parse(movies)

  const { id: movieId } = request.params
  const movie = getMovieById(moviesParsed, movieId)

  return movie ? reply.send(movie) : reply.code(404).send('No movie found')
}
