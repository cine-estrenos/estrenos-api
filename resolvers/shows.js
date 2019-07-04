import client from '../client';
import { getShowsByMovieId, getShowsByMovieIdAndCinemaId } from '../selectors/shows';

const getShowsByMovieIdResolver = async movieId => {
  const movies = await client.redis.get('movies');
  const moviesParsed = JSON.parse(movies);

  return getShowsByMovieId(moviesParsed, movieId);
};

const getShowsByMovieIdAndCinemaIdResolver = async (movieId, cinemaId) => {
  const movies = await client.redis.get('movies');
  const moviesParsed = JSON.parse(movies);

  return getShowsByMovieIdAndCinemaId(moviesParsed, movieId, cinemaId);
};

export { getShowsByMovieIdResolver, getShowsByMovieIdAndCinemaIdResolver };
