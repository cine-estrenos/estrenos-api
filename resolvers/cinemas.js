import client from '../client';

export default async function getCinemasResolver() {
  const cinemas = await client.redis.get('cinemas');

  return JSON.parse(cinemas);
}
