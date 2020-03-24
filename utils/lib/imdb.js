import R from 'ramda';
import fetch from 'node-fetch';
import camelcaseKeys from 'camelcase-keys';

// Lib
import emojifier from './emojis';

// Constants
const apiKey = process.env.MOVIEDB_APIKEY;
const baseUrl = 'https://api.themoviedb.org/3';

// Helpers
const getGenres = async () => {
  const options = `language=es-AR`;
  const endpoint = `${baseUrl}/genre/movie/list?api_key=${apiKey}&${options}`;

  const response = await fetch(endpoint);
  const { genres } = await response.json();

  return genres.reduce(
    (acc, genre) => ({ ...acc, [genre.id]: { value: genre.name, emoji: emojifier(genre.name) } }),
    {},
  );
};

const getImdbInfo = async (title, tmdbId, genres) => {
  if (!tmdbId) {
    const currentYear = new Date().getFullYear();
    const options = `&page=1&include_adult=false&year=${currentYear}`;
    const endpoint = `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURI(title)}${options}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const parsedData = camelcaseKeys(data, { deep: true });
    if (parsedData.totalResults === 0) return { votes: '0', backdrop: '' };

    const [movie] = data.results;
    const { id, voteAverage: votes, posterPath, backdropPath, imdbId } = camelcaseKeys(movie, { deep: true });

    const baseImageUrl = 'https://image.tmdb.org/t/p';
    const withWidth = (width) => `w${width}`;

    const backdrop = `${baseImageUrl}/original/${backdropPath}`;
    const poster = `${baseImageUrl}/${withWidth(300)}/${posterPath}`;
    const votesParsed = String(votes).length === 1 ? `${votes}.0` : `${votes}`;

    const detailsEndpoint = `${baseUrl}/movie/${id}?api_key=${apiKey}&language=es-AR`;

    const responseDetails = await fetch(detailsEndpoint);
    const movieDetails = await responseDetails.json();

    const { runtime, overview: description, title: newTitle, genres: movieGenres } = camelcaseKeys(movieDetails, {
      deep: true,
    });
    const length = `${runtime}m`;
    const parsedGenres = movieGenres.map(({ id: genreId }) => genres[genreId]);

    return { poster, backdrop, length, description, imdbId, votes: votesParsed, title: newTitle, genres: parsedGenres }; // eslint-disable-line
  }

  const detailsEndpoint = `${baseUrl}/movie/${tmdbId}?api_key=${apiKey}&language=es-AR`;

  const responseDetails = await fetch(detailsEndpoint);
  const movieDetails = await responseDetails.json();

  const {
    runtime,
    overview: description,
    title: newTitle,
    genres: movieGenres,
    voteAverage: votes,
    backdropPath,
    posterPath,
    imdbId,
  } = camelcaseKeys(movieDetails, { deep: true });

  const baseImageUrl = 'https://image.tmdb.org/t/p';
  const withWidth = (width) => `w${width}`;

  const backdrop = `${baseImageUrl}/original/${backdropPath}`;
  const poster = `${baseImageUrl}/${withWidth(300)}/${posterPath}`;
  const votesParsed = String(votes).length === 1 ? `${votes}.0` : `${votes}`;

  const length = `${runtime}m`;
  const parsedGenres = movieGenres.map(({ id: genreId }) => genres[genreId]);

  return { poster, backdrop, length, description, imdbId, votes: votesParsed, title: newTitle, genres: parsedGenres }; // eslint-disable-line
};

// Get new high quality posters and more info
const getMoviesWithTmdbInfo = async (data) => {
  const genres = await getGenres();

  const movies = await Promise.all(
    data.map(async (movie) => {
      try {
        const imdbInfo = await getImdbInfo(movie.title, movie.tmdbId, genres);
        const parsedMovie = R.omit(['tmdbId'], movie);

        return { ...parsedMovie, ...imdbInfo };
      } catch (error) {
        const parsedMovie = R.omit(['tmdbId'], movie);

        return { ...parsedMovie, votes: '0', backdrop: '' };
      }
    }),
  );

  return movies;
};

export default getMoviesWithTmdbInfo;
