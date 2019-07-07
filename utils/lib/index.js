import got from 'got';

async function getImdbInfo(title) {
  const currentYear = new Date().getFullYear();

  const apiKey = process.env.MOVIEDB_APIKEY;
  const baseUrl = 'https://api.themoviedb.org/3/search/movie';
  const options = `&page=1&include_adult=false&year=${currentYear}`;
  const endpoint = `${baseUrl}?api_key=${apiKey}&query=${encodeURI(title)}${options}`;

  const { body: data } = await got(endpoint, { json: true });
  if (data.total_results === 0 || data.total_results > 1) return;

  const [movie] = data.results;
  const { title: name, vote_average: votes, poster_path: posterPath } = movie;

  const baseImageUrl = 'https://image.tmdb.org/t/p';
  const withWidth = width => `w${width}`;

  const poster = `${baseImageUrl}/${withWidth(300)}/${posterPath}`;
  const votesParsed = String(votes).length === 1 ? `${votes}.0` : `${votes}`;

  return { title: name, votes: votesParsed, poster } // eslint-disable-line
}

const emojisGenres = {
  Drama: '🎭',
  Acción: '💥',
  Terror: '☠️',
  Thriller: '😱',
  Animación: '🦄',
  Aventuras: '🤠',
  Biografia: '✍️',
  Comedia: '😂',
  Policial: '👮‍',
  Suspenso: '😱',
};

const emojifier = category => emojisGenres[category] || '';

export { getImdbInfo, emojifier };
