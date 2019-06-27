exports.getCinemas = fastify => async () => {
  const cinemas = await fastify.redis.get('cinemas')
  const cinemasParsed = JSON.parse(cinemas)

  return cinemasParsed
}
