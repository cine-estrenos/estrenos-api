import client from '../client';
import getMovieById from '../selectors/movies';

const getMoviesResolver = async () => {
  const moviesWithoutShows = await client.redis.get('moviesWithoutShows');

  return JSON.parse(moviesWithoutShows);
};

const getMovieByIdResolver = async id => {
  const movies = await client.redis.get('moviesWithoutShows');
  const moviesParsed = JSON.parse(movies);

  return getMovieById(moviesParsed, id);
};

export { getMoviesResolver, getMovieByIdResolver };
