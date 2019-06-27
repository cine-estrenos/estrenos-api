module.exports = function(fastify, opts, next) {
  fastify.get('/cinemas', async (request, reply) => {
    const cinemas = await fastify.redis.get('cinemas')
    const cinemasParsed = JSON.parse(cinemas)

    reply.send(cinemasParsed)
  })

  next()
}
