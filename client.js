const Fastify = require('fastify');
const fastifyRedis = require('fastify-redis');
const fastifyHelmet = require('fastify-helmet');
const fastifyCompress = require('fastify-compress');

// Instatiate fastify
const client = Fastify({ logger: true });

// Register plugins
client.register(fastifyHelmet);
client.register(fastifyCompress);
client.register(
  fastifyRedis,
  process.env.REDIS_URL ||
    (process.env.REDIS_PROVIDER && process.env[process.env.REDIS_PROVIDER]) || { host: '127.0.0.1' }
);

module.exports = client;
