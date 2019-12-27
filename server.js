import dotenv from 'dotenv';
import Sentry from '@sentry/node';

// Client
import client from './client';

// Plugins
import cinemarkCron from './plugins/cinemark';
import graphqlEndpoint from './plugins/apollo';

// Controllers
import getCinemasController from './rest/controllers/cinemas';
import { getMovieByIdController, getMoviesController } from './rest/controllers/movies';
import { getShowsByMovieIdController, getShowsByMovieIdAndCinemaIdController } from './rest/controllers/shows';

// Load env variables
dotenv.config();

// Load Sentry
if (process.env.NODE_ENV === 'production') Sentry.init({ dsn: process.env.SENTRY_DSN });

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
client.listen(process.env.PORT || 3000, '0.0.0.0').catch((error) => client.log.error(error));
