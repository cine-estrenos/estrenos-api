import titleize from 'titleize';

import parseShows from './shows';
import getImdbInfo from '../lib/imdb';
import emojifier from '../lib/emojis';
import { parseLength, parseCast, cinemarkCastTypes } from '../lib/movies';

const parseMovies = async (movies) => {
  // Parse movies to match new structure
  const parsedMovies = movies
    .map((rawMovie) => {
      const {
        id,
        name,
        rating,
        description,
        duration,
        urlPoster,
        urlTrailerAmazon,
        personList,
        cinemaList,
        attributeList,
        movieList,
        category: genre,
      } = rawMovie;

      const title = titleize(name);
      const minAge = rating.split(' ')[0];

      const length = parseLength(duration);
      const inCinemas = cinemaList.sort((a, b) => a - b).map(String);

      const poster = urlPoster;
      const isPremiere = attributeList.includes(0) ? 'Estreno' : '';

      const trailer = urlTrailerAmazon
        .replace('http://www.dropbox.com', 'https://dl.dropboxusercontent.com')
        .replace('https://www.dropbox.com', 'https://dl.dropboxusercontent.com');

      const cast = parseCast(personList, cinemarkCastTypes.director, cinemarkCastTypes.actor);
      const shows = parseShows(movieList);

      const isFestival = attributeList.includes(3);
      const festival = isFestival ? { value: 'Festival', emoji: emojifier('Festival') } : null;

      const emoji = emojifier(genre);
      const genres = [{ value: genre, emoji }, festival].filter(Boolean);

      const tags = [isPremiere].filter(Boolean);

      const movie = {
        id,
        cast,
        tags,
        shows,
        title,
        minAge,
        length,
        poster,
        genres,
        trailer,
        inCinemas,
        description,
      };

      return movie;
    })
    .sort((a, b) => b.isPremiere - a.isPremiere);

  // Get new high quality posters and more info
  const moviesWithHighQualityPoster = await Promise.all(
    parsedMovies.map(async (movie) => {
      try {
        const imdbInfo = await getImdbInfo(movie.title);
        return { ...movie, ...imdbInfo };
      } catch (error) {
        return { ...movie, votes: '0', backdrop: '' };
      }
    }),
  );

  return moviesWithHighQualityPoster;
};

export default parseMovies;
