import client from '../client';
import getMovieById from '../selectors/movies';

const getMoviesResolver = async () => {
  const movies = await client.redis.get('movies');
  return JSON.parse(movies);
};

const getMovieByIdResolver = async (id) => {
  const movies = await client.redis.get('movies');
  const parsedMovies = JSON.parse(movies);

  return getMovieById(parsedMovies, id);
};

export { getMoviesResolver, getMovieByIdResolver };
