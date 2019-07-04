import Fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyRedis from 'fastify-redis';
import fastifyHelmet from 'fastify-helmet';
import fastifyCompress from 'fastify-compress';

// Instatiate fastify
const client = Fastify({ logger: true });

// Redis host
const redisOptions = process.env.REDIS_URL ||
  (process.env.REDIS_PROVIDER && process.env[process.env.REDIS_PROVIDER]) || { host: '127.0.0.1' };

// Register plugins
client.register(fastifyCors);
client.register(fastifyHelmet);
client.register(fastifyCompress);
client.register(fastifyRedis, redisOptions);

export default client;
