import client from '../client';
import { getShowsByMovieId, getShowsByMovieIdAndCinemaId } from '../selectors/shows';

const getShowsByMovieIdResolver = async (movieId) => {
  const shows = await client.redis.get('shows');
  const showsParsed = JSON.parse(shows);

  return getShowsByMovieId(showsParsed, movieId);
};

const getShowsByMovieIdAndCinemaIdResolver = async (movieId, cinemaId) => {
  const shows = await client.redis.get('shows');
  const showsParsed = JSON.parse(shows);

  return getShowsByMovieIdAndCinemaId(showsParsed, movieId, cinemaId);
};

export { getShowsByMovieIdResolver, getShowsByMovieIdAndCinemaIdResolver };
