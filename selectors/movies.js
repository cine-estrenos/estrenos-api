const getMovieById = (movies, movieId) => movies.find(({ ids }) => ids.includes(movieId));

export default getMovieById;
