import dayjs from 'dayjs';
import dotenv from 'dotenv';
import Sentry from '@sentry/node';
import 'dayjs/locale/es';

// Client
import client from './client';

// Plugins
import graphqlEndpoint from './plugins/apollo';
import cinemasScrappersCron from './plugins/cinemas-scrappers';

// Controllers
import getCinemasController from './rest/controllers/cinemas';
import { getMovieByIdController, getMoviesController } from './rest/controllers/movies';
import { getShowsByMovieIdController, getShowsByMovieIdAndCinemaIdController } from './rest/controllers/shows';

// Setup dayjs locale
dayjs.locale('es');

// Load env variables
if (process.env.NODE_ENV === 'development') dotenv.config();

// Load Sentry
if (process.env.NODE_ENV === 'production') Sentry.init({ dsn: process.env.SENTRY_DSN });

// Register GraphQL
client.register(graphqlEndpoint);

// Register Scrappers cron job
client.register(cinemasScrappersCron);

// Routes
client.get('/cinemas', getCinemasController);
client.get('/movies', getMoviesController);
client.get('/movies/:movieId', getMovieByIdController);
client.get('/shows/:movieId', getShowsByMovieIdController);
client.get('/shows/:movieId/:cinemaId', getShowsByMovieIdAndCinemaIdController);

// Run client
client.listen(process.env.PORT || 3000, '0.0.0.0').catch((error) => client.log.error(error));
