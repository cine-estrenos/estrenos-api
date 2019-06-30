const dotenv = require('dotenv');

const client = require('./client');
const { cinemarkCron } = require('./plugins/cinemark');
const { getCinemas } = require('./controllers/cinemas');
const { getMovieById, getMovies } = require('./controllers/movies');
const { getShowsByMovieId, getShowsByMovieIdAndCinemaId } = require('./controllers/shows');

// Load env variables
dotenv.config();

// Register cron job
client.register(cinemarkCron);

// Routes
client.get('/cinemas', getCinemas);
client.get('/movies', getMovies);
client.get('/movies/:movieId', getMovieById);
client.get('/shows/:movieId', getShowsByMovieId);
client.get('/shows/:movieId/:cinemaId', getShowsByMovieIdAndCinemaId);

// Main function
const main = async () => {
  try {
    await client.listen(process.env.PORT || 3000);
    client.log.info(`Server running on ${client.server.address()}`);
  } catch (error) {
    client.log.error();
    process.exit(1);
  }
};

main();
