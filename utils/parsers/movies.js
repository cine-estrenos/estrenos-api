import titleize from 'titleize';

import parseShows from './shows';
import getImdbInfo from '../lib/imdb';
import emojifier from '../lib/emojis';

const parseCast = (cast) => {
  const parsedCast = cast.reduce(
    (acc, { type, name }) => {
      if (type === 'D') acc.directors.push(name);
      if (type === 'A') acc.actors.push(name);
      return acc;
    },
    { directors: [], actors: [] },
  );

  return parsedCast;
};

const parseMovies = async (movies) => {
  // Remove special or festival movies
  const premieres = movies.filter(({ attributeList }) => !attributeList.includes(2) && !attributeList.includes(3));

  // Parse movies to match new structure
  const parsedMovies = premieres
    .map((premiere) => {
      const {
        id,
        name,
        rating,
        description,
        duration,
        urlPoster,
        urlTrailerAmazon,
        urlTrailerYoutube,
        personList,
        cinemaList,
        attributeList,
        movieList,
        category: categoryValue,
      } = premiere;

      const title = titleize(name);
      const minAge = rating.split(' ')[0];

      const length = `${duration} minutos`;
      const inCinemas = cinemaList.sort((a, b) => a - b).map(String);

      const poster = urlPoster;
      const isPremiere = attributeList.includes(0);

      const amazonTrailerUrl = urlTrailerAmazon.replace('http://www.dropbox.com', 'https://dl.dropboxusercontent.com');
      const youtubeTrailerUrl = urlTrailerYoutube || '';

      const cast = parseCast(personList);
      const shows = parseShows(movieList);

      const emoji = emojifier(categoryValue);
      const category = { value: categoryValue, emoji };

      const movie = {
        id,
        cast,
        shows,
        title,
        minAge,
        length,
        poster,
        category,
        inCinemas,
        isPremiere,
        description,
        amazonTrailerUrl,
        youtubeTrailerUrl,
      };

      return movie;
    })
    .sort((a, b) => b.isPremiere - a.isPremiere);

  // Get new high quality posters and more info
  const moviesWithHighQualityPoster = await Promise.all(
    parsedMovies.map(async (movie) => {
      try {
        const imdbInfo = await getImdbInfo(movie.title);
        console.log('TCL: parseMovies -> imdbInfo', imdbInfo);
        return { ...movie, ...imdbInfo };
      } catch (error) {
        console.log('TCL: parseMovies -> error', error);
        return movie;
      }
    }),
  );

  return moviesWithHighQualityPoster;
};

export default parseMovies;
