const getMovieById = (movies, movieId) => movies.find(({ id }) => id === movieId);

export default getMovieById;
