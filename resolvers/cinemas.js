const client = require("../client");

exports.getCinemas = async () => {
  const cinemas = await client.redis.get("cinemas");

  return JSON.parse(cinemas);
};
