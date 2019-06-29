const Fastify = require("fastify");
const fastifyRedis = require("fastify-redis");

// Creates fastify client
const client = Fastify({logger: true});

// Register redis
client.register(fastifyRedis, {host: "127.0.0.1"});

module.exports = client;
