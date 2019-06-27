const { getShowsByMovieId, getShowsByMovieIdAndCinemaId } = require('../selectors')

exports.getShowsByMovie = fastify => async (request, reply) => {
  const movies = await fastify.redis.get('movies')
  const moviesParsed = JSON.parse(movies)

  const { movieId } = request.params
  const shows = getShowsByMovieId(moviesParsed, movieId)

  return shows ? reply.send(shows) : reply.code(404).send('No shows found')
}

exports.getShowsByCinema = fastify => async (request, reply) => {
  const movies = await fastify.redis.get('movies')
  const moviesParsed = JSON.parse(movies)

  const { movieId, cinemaId } = request.params
  const shows = getShowsByMovieIdAndCinemaId(moviesParsed, movieId, cinemaId)

  return shows ? reply.send(shows) : reply.code(404).send('No shows found')
}
