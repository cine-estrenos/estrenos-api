import fetch from 'node-fetch';

const getImdbInfo = async (title) => {
  const currentYear = new Date().getFullYear();

  const apiKey = process.env.MOVIEDB_APIKEY;
  const baseUrl = 'https://api.themoviedb.org/3/search/movie';
  const options = `&page=1&include_adult=false&year=${currentYear}`;
  const endpoint = `${baseUrl}?api_key=${apiKey}&query=${encodeURI(title)}${options}`;

  const response = await fetch(endpoint);
  const data = await response.json();
  if (data.total_results === 0) return { votes: '0', backdrop: '' };

  const [movie] = data.results;
  const { vote_average: votes, poster_path: posterPath, backdrop_path: backdropPath } = movie;

  const baseImageUrl = 'https://image.tmdb.org/t/p';
  const withWidth = (width) => `w${width}`;

  const backdrop = `${baseImageUrl}/original/${backdropPath}`;
  const poster = `${baseImageUrl}/${withWidth(300)}/${posterPath}`;
  const votesParsed = String(votes).length === 1 ? `${votes}.0` : `${votes}`;

  return { votes: votesParsed, poster, backdrop }; // eslint-disable-line
};

// Get new high quality posters and more info
const getMoviesWithTmdbInfo = async (data) => {
  const movies = await Promise.all(
    data.map(async (movie) => {
      try {
        const imdbInfo = await getImdbInfo(movie.title);
        return { ...movie, ...imdbInfo };
      } catch (error) {
        return { ...movie, votes: '0', backdrop: '' };
      }
    }),
  );

  return movies;
};

export default getMoviesWithTmdbInfo;
