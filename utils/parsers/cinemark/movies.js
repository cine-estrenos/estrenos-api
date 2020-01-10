import titleize from 'titleize';

// Shows
import parseShows from './shows';

// Lib
import emojifier from '../../lib/emojis';
import { parseLength, parseCast, createUniqueId } from '../../lib/movies';

const cinemarkCastTypes = { actor: 'A', director: 'D' };

const parseMoviesAndShows = (movies) => {
  // Remove special movies
  const premieres = movies.filter(({ attributeList }) => !attributeList.includes(2));

  // Shows map
  const shows = {};

  // Parse movies to match new structure
  const parsedMovies = premieres
    .map((rawMovie) => {
      const {
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
      const tags = [isPremiere].filter(Boolean);

      const trailer = urlTrailerAmazon
        .replace('http://www.dropbox.com', 'https://dl.dropboxusercontent.com')
        .replace('https://www.dropbox.com', 'https://dl.dropboxusercontent.com');

      const cast = parseCast(personList, cinemarkCastTypes.director, cinemarkCastTypes.actor);

      const isFestival = attributeList.includes(3);
      const festival = isFestival ? { value: 'Festival', emoji: emojifier('Festival') } : null;

      const emoji = emojifier(genre);
      const genres = [{ value: genre, emoji }, festival].filter(Boolean);

      const uniqueId = createUniqueId(name);
      const movieShows = parseShows(movieList);
      shows[uniqueId] = [...(shows[uniqueId] || []), ...movieShows];

      const movie = {
        id: uniqueId,
        cast,
        tags,
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

  return { movies: parsedMovies, shows };
};

export default parseMoviesAndShows;
