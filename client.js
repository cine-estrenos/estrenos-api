import Fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyRedis from 'fastify-redis';
import fastifyHelmet from 'fastify-helmet';
import fastifyCompress from 'fastify-compress';
import fastifyRateLimit from 'fastify-rate-limit';

// Instatiate fastify
const client = Fastify({ logger: true });

// Redis host
const redisOptions = process.env.REDIS_URL ||
  (process.env.REDIS_PROVIDER && process.env[process.env.REDIS_PROVIDER]) || { host: '127.0.0.1' };

// Rate limit
const rateLimitOptions = { max: 100, timeWindow: '1 minute' };

// Register plugins
client.register(fastifyCors);
client.register(fastifyHelmet);
client.register(fastifyCompress);
client.register(fastifyRedis, redisOptions);
client.register(fastifyRateLimit, rateLimitOptions);

export default client;
