import cron from 'node-cron';
import omit from 'lodash.omit';
import fp from 'fastify-plugin';
import mergeAdvanced from 'object-merge-advanced';

import getMoviesWithTmdbInfo from '../utils/lib/imdb';
import { getImaxData, getCinemarkData } from '../utils';

export default fp(function cinemasScrappersCron(fastify, opts, next) {
  const saveCinemasDataToRedis = async () => {
    const { data: imaxData, error: imaxError } = await getImaxData();
    const { data: cinemarkData, error: cinemarkError } = await getCinemarkData();

    if (imaxError) fastify.log.error(imaxError);
    if (cinemarkError) fastify.log.error(cinemarkError);

    const imaxMoviesWithTmdbInfo = await getMoviesWithTmdbInfo(imaxData.movies);
    const cinemarkMoviesWithTmdbInfo = await getMoviesWithTmdbInfo(cinemarkData.movies);

    // TODO:  Review this mergeAdvanced since some movies are repeated
    const movies = mergeAdvanced(cinemarkMoviesWithTmdbInfo, imaxMoviesWithTmdbInfo, {
      ignoreKeys: ['shows'],
    });
    const moviesWithoutShows = movies.map((movie) => omit(movie, 'shows'));

    const cinemas = [...imaxData.cinemas, ...cinemarkData.cinemas];
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
