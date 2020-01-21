/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import cron from 'node-cron';
import fp from 'fastify-plugin';

import getMoviesWithTmdbInfo from '../utils/lib/imdb';
import { getShowcaseData, getCinemarkData, getCinepolisData } from '../utils';

const mergeChainsMovies = (chainsMovies) => {
  const parsedMovies = {};

  chainsMovies.forEach((chainMovies) => {
    chainMovies.forEach((movie) => {
      const { id, inCinemas, trailer, tags, cast, length, minAge } = movie;
      const prevMovie = parsedMovies[id]
        ? parsedMovies[id]
        : { inCinemas: [], tags: ['2D'], cast: { actors: [], directors: [] } };

      const hasPrevActors = prevMovie.cast && prevMovie.cast.actors && prevMovie.cast.actors.length;
      const hasPrevDirectors = prevMovie.cast && prevMovie.cast.directors && prevMovie.cast.directors.length;

      const parseCast = (casting) => casting.map((name) => name.replace(/\s{2,}/g, ' '));

      parsedMovies[id] = {
        ...prevMovie,
        ...movie,
        cast: {
          actors: parseCast(hasPrevActors ? prevMovie.cast.actors : cast.actors),
          directors: parseCast(hasPrevDirectors ? prevMovie.cast.directors : cast.directors),
        },
        minAge: prevMovie.minAge || minAge,
        length: prevMovie.length || length,
        trailer: prevMovie.trailer || trailer,
        tags: [...new Set([...prevMovie.tags, ...tags])],
        inCinemas: [...new Set([...prevMovie.inCinemas, ...inCinemas])].sort((a, b) => a - b),
      };
    });
  });

  return Object.values(parsedMovies).sort((a, b) => b.votes - a.votes);
};

const mergeShows = (chainsShows) => {
  const allShows = {};

  chainsShows.forEach((chainShow) => {
    for (const movieId in chainShow) {
      const movies = [...(allShows[movieId] || []), ...(chainShow[movieId] || [])];
      allShows[movieId] = movies;
    }
  });

  return allShows;
};

export default fp(function cinemasScrappersCron(fastify, opts, next) {
  const saveCinemasDataToRedis = async () => {
    const { data: showcaseData, error: showcaseError } = await getShowcaseData();
    const { data: cinemarkData, error: cinemarkError } = await getCinemarkData();
    const { data: cinepolisData, error: cinepolisError } = await getCinepolisData();

    if (showcaseError) fastify.log.error(showcaseError);
    if (cinemarkError) fastify.log.error(cinemarkError);
    if (cinepolisError) fastify.log.error(cinepolisError);

    // Merge all chain movies
    const chainsMovies = [showcaseData.movies, cinemarkData.movies, cinepolisData.movies];
    const mergedMovies = mergeChainsMovies(chainsMovies);

    // Get TMDB info like poster, backdrop, and votes
    const movies = await getMoviesWithTmdbInfo(mergedMovies);

    // Merge shows
    const chainsShows = [showcaseData.shows, cinemarkData.shows, cinepolisData.shows];
    const shows = mergeShows(chainsShows);

    // Merge cinemas
    const cinemas = [...showcaseData.cinemas, ...cinemarkData.cinemas, ...cinepolisData.cinemas];

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
