import R from 'ramda';
import cron from 'node-cron';
import fp from 'fastify-plugin';

import getMoviesWithTmdbInfo from '../utils/lib/imdb';
import { getShowcaseData, getCinemarkData } from '../utils';

export default fp(function cinemasScrappersCron(fastify, opts, next) {
  const saveCinemasDataToRedis = async () => {
    const { data: showcaseData, error: showcaseError } = await getShowcaseData();
    const { data: cinemarkData, error: cinemarkError } = await getCinemarkData();

    if (showcaseError) fastify.log.error(showcaseError);
    if (cinemarkError) fastify.log.error(cinemarkError);

    const showcaseMoviesWithTmdbInfo = await getMoviesWithTmdbInfo(showcaseData.movies);
    const cinemarkMoviesWithTmdbInfo = await getMoviesWithTmdbInfo(cinemarkData.movies);

    /* Merge all chain movies */
    const mergeChainMovies = R.pipe(R.map(R.indexBy(R.prop('imdbId'))), R.reduce(R.mergeWith(R.merge), {}), R.values);

    const movies = mergeChainMovies([showcaseMoviesWithTmdbInfo, cinemarkMoviesWithTmdbInfo]);
    const moviesWithoutShows = movies.map((movie) => R.omit(['shows'], movie));

    const cinemas = [...showcaseData.cinemas, ...cinemarkData.cinemas];
    const data = Object.entries({ movies, moviesWithoutShows, cinemas });

    data.forEach(([key, value]) => fastify.redis.set(key, JSON.stringify(value)));
  };

  fastify.decorate('getCinemasData', async () => {
    saveCinemasDataToRedis();
    cron.schedule('*/5 * * * *', () => saveCinemasDataToRedis());
  });

  fastify.getCinemasData();

  next();
});
