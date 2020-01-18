import R from 'ramda';
import cron from 'node-cron';
import fp from 'fastify-plugin';

import getMoviesWithTmdbInfo from '../utils/lib/imdb';
import { getShowcaseData, getCinemarkData } from '../utils';

const mergeChainsMovies = (chainsMovies) => {
  const parsedMovies = {};

  chainsMovies.forEach((chainMovies) => {
    chainMovies.forEach((movie) => {
      const { id, inCinemas, trailer } = movie;
      const prevMovie = parsedMovies[id] ? parsedMovies[id] : { inCinemas: [] };

      parsedMovies[id] = {
        ...prevMovie,
        ...movie,
        trailer: prevMovie.trailer || trailer,
        inCinemas: [...new Set([...prevMovie.inCinemas, ...inCinemas])],
      };
    });
  });

  return Object.values(parsedMovies).sort((a, b) => b.votes - a.votes);
};

export default fp(function cinemasScrappersCron(fastify, opts, next) {
  const saveCinemasDataToRedis = async () => {
    const { data: showcaseData, error: showcaseError } = await getShowcaseData();
    const { data: cinemarkData, error: cinemarkError } = await getCinemarkData();

    if (showcaseError) fastify.log.error(showcaseError);
    if (cinemarkError) fastify.log.error(cinemarkError);

    // Merge all chain movies
    const chainsMovies = [cinemarkData.movies, showcaseData.movies];
    const mergedMovies = mergeChainsMovies(chainsMovies);

    // Get TMDB info like poster, backdrop, and votes
    const movies = await getMoviesWithTmdbInfo(mergedMovies);

    // Merge shows
    const shows = R.mergeDeepWith(R.concat, showcaseData.shows, cinemarkData.shows);

    // Merge cinemas
    const cinemas = [...showcaseData.cinemas, ...cinemarkData.cinemas];

    // Create entries array
    const data = Object.entries({ movies, shows, cinemas });

    // Save to Redis
    data.forEach(([key, value]) => fastify.redis.set(key, JSON.stringify(value)));
  };

  fastify.decorate('getCinemasData', async () => {
    saveCinemasDataToRedis();
    cron.schedule('*/5 * * * *', () => saveCinemasDataToRedis());
  });

  fastify.getCinemasData();

  next();
});
