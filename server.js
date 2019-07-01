const dotenv = require('dotenv');

const client = require('./client');
const cinemarkCron = require('./plugins/cinemark');
const graphqlEndpoint = require('./plugins/apollo');

const { getCinemas } = require('./rest/controllers/cinemas');
const { getMovieById, getMovies } = require('./rest/controllers/movies');
const { getShowsByMovieId, getShowsByMovieIdAndCinemaId } = require('./rest/controllers/shows');

// Load env variables
dotenv.config();

// Register cron job
client.register(cinemarkCron);
client.register(graphqlEndpoint);

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
    console.log(process.env.PORT);
    client.log.info(`Server running on ${client.server.address()}`);
  } catch (error) {
    client.log.error();
    process.exit(1);
  }
};

main();
