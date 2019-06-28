const fp = require("fastify-plugin");
const cron = require("node-cron");

const {getCinemarkData} = require("../utils");

exports.cinemarkCron = fp(function(fastify, opts, next) {
  const saveCinemarkDataToRedis = async () => {
    const {data, error} = await getCinemarkData();
    if (error) fastify.log.error(error);
    if (data)
      data.forEach(([key, value]) =>
        fastify.redis.set(key, JSON.stringify(value))
      );
  };

  fastify.decorate("getCinemarkData", async () => {
    saveCinemarkDataToRedis();
    cron.schedule("*/5 * * * *", () => saveCinemarkDataToRedis());
  });

  fastify.getCinemarkData();

  next();
});
