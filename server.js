import dotenv from 'dotenv';

import client from './client';
import cinemarkCron from './plugins/cinemark';
import graphqlEndpoint from './plugins/apollo';

import getCinemasController from './rest/controllers/cinemas';
import { getMovieByIdController, getMoviesController } from './rest/controllers/movies';
import { getShowsByMovieIdController, getShowsByMovieIdAndCinemaIdController } from './rest/controllers/shows';

// Load env variables
dotenv.config();

// Register cron job
client.register(cinemarkCron);
client.register(graphqlEndpoint);

// Routes
client.get('/cinemas', getCinemasController);
client.get('/movies', getMoviesController);
client.get('/movies/:movieId', getMovieByIdController);
client.get('/shows/:movieId', getShowsByMovieIdController);
client.get('/shows/:movieId/:cinemaId', getShowsByMovieIdAndCinemaIdController);

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
