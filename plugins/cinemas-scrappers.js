import R from 'ramda';
import cron from 'node-cron';
import fp from 'fastify-plugin';

import getMoviesWithTmdbInfo from '../utils/lib/imdb';
import { getShowcaseData, getCinemarkData } from '../utils';

const mergeChainsMovies = (chainsMovies) => {
  const parsedMovies = {};

  chainsMovies.forEach((chainMovies) => {
    chainMovies.forEach((movie) => {
      const { id, inCinemas } = movie;
      const prevMovie = parsedMovies[id] ? parsedMovies[id] : { inCinemas: [] };

      parsedMovies[id] = {
        ...prevMovie,
        ...movie,
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

    // Get TMDB info like poster, backdrop, and votes
    const showcaseMoviesWithTmdbInfo = await getMoviesWithTmdbInfo(showcaseData.movies);
    const cinemarkMoviesWithTmdbInfo = await getMoviesWithTmdbInfo(cinemarkData.movies);

    // Merge all chain movies
    const movies = mergeChainsMovies([cinemarkMoviesWithTmdbInfo, showcaseMoviesWithTmdbInfo]);

    // Merge shows
    const shows = R.mergeDeepWith(R.concat, showcaseData.shows, cinemarkData.shows);

    // Merge cinemas
    const cinemas = [...showcaseData.cinemas, ...cinemarkData.cinemas];

    // Create entries array
    const data = Object.entries({ movies, shows, cinemas });

    // Remove old data
    ['movies', 'shows', 'cinemas'].forEach((key) => fastify.redis.del(key));

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
