const Fastify = require('fastify');
const fastifyRedis = require('fastify-redis');

const client = Fastify({ logger: true });
client.register(fastifyRedis, { host: '127.0.0.1' });

module.exports = client;
