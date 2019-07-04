import fp from 'fastify-plugin';
import cron from 'node-cron';

import getCinemarkData from '../utils';

export default fp(function cinemarkCron(fastify, opts, next) {
  const saveCinemarkDataToRedis = async () => {
    const { data, error } = await getCinemarkData();
    if (error) fastify.log.error(error);
    if (data) data.forEach(([key, value]) => fastify.redis.set(key, JSON.stringify(value)));
  };

  fastify.decorate('getCinemarkData', async () => {
    saveCinemarkDataToRedis();
    cron.schedule('*/5 * * * *', () => saveCinemarkDataToRedis());
  });

  fastify.getCinemarkData();

  next();
});
