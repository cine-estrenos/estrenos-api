import dotenv from 'dotenv';
import Sentry from '@sentry/node';

import client from './client';
import cinemarkCron from './plugins/cinemark';
import graphqlEndpoint from './plugins/apollo';

import getCinemasController from './rest/controllers/cinemas';
import { getMovieByIdController, getMoviesController } from './rest/controllers/movies';
import { getShowsByMovieIdController, getShowsByMovieIdAndCinemaIdController } from './rest/controllers/shows';

// Load env variables
dotenv.config();

// Load Sentry
if (process.env.NODE_ENV === 'development') {
  Sentry.init({ dsn: 'https://dded0f72a55b4341b932e667bb668693@sentry.io/1500556' });
}

// Register cron job
client.register(cinemarkCron);
client.register(graphqlEndpoint);

// Routes
client.get('/cinemas', getCinemasController);
client.get('/movies', getMoviesController);
client.get('/movies/:movieId', getMovieByIdController);
client.get('/shows/:movieId', getShowsByMovieIdController);
client.get('/shows/:movieId/:cinemaId', getShowsByMovieIdAndCinemaIdController);

// Run client
client
  .listen(process.env.PORT || 3000)
  .then(() => client.log.info(`Server running on ${client.server.address()}`))
  .catch(error => client.log.error(error));
