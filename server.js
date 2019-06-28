const dotenv = require("dotenv");

const client = require("./client");

const {cinemarkCron} = require("./plugins/cinemark");

const {getCinemas} = require("./controllers/cinemas");
const {getMovieById, getMovies} = require("./controllers/movies");
const {
  getShowsByMovieId,
  getShowsByMovieIdAndCinemaId,
} = require("./controllers/shows");

// Load enviroment variables
dotenv.config();

// Register redis and cron job
client.register(cinemarkCron);

// Routes
client.get("/cinemas", getCinemas);
client.get("/movies", getMovies);
client.get("/movies/:movieId", getMovieById);
client.get("/shows/:movieId", getShowsByMovieId);
client.get("/shows/:movieId/:cinemaId", getShowsByMovieIdAndCinemaId);

// Main function
const main = async () => {
  try {
    await client.listen(process.env.PORT || 3000);
    const {port} = client.server.address();
    client.log.info(`Server running on ${port}`);
  } catch (error) {
    client.log.error();
    process.exit(1);
  }
};

main();
