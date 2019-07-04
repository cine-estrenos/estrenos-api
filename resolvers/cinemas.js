import client from '../client';

const getCinemasResolver = async () => {
  const cinemas = await client.redis.get('cinemas');

  return JSON.parse(cinemas);
};

export default getCinemasResolver;
