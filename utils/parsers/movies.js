const titleize = require("titleize");

const {parseShows} = require("./shows");
const {getImdbInfo, emojifier} = require("../lib");

const parseMovies = async movies => {
  // Remove special or festival movies
  const premieres = movies.filter(
    ({attributeList}) =>
      !attributeList.includes(2) && !attributeList.includes(3)
  );

  // Parse movies to match new structure
  const parsedMovies = premieres
    .map(premiere => {
      const {
        id,
        name,
        rating,
        description,
        duration,
        urlPoster,
        urlTrailerAmazon,
        urlTrailerYoutube,
        personList,
        cinemaList,
        attributeList,
        movieList,
        category: mCategory,
      } = premiere;

      const title = titleize(name);
      const minAge = rating.split(" ")[0];

      const length = `${duration} minutos`;
      const inCinemas = cinemaList.sort((a, b) => a - b).map(String);

      const isPremiere = attributeList.includes(0);
      const categoryParsed = {value: mCategory, emoji: emojifier(mCategory)};

      const amazonTrailerUrl = urlTrailerAmazon;
      const [, youtubeTrailerUrl] = urlTrailerYoutube.split(".be/");

      const cast = parseCast(personList);
      const shows = parseShows(movieList);

      const poster = urlPoster;
      const category = categoryParsed;

      const movie = {
        id,
        cast,
        shows,
        title,
        minAge,
        length,
        poster,
        category,
        inCinemas,
        isPremiere,
        description,
        amazonTrailerUrl,
        youtubeTrailerUrl,
      };

      return movie;
    })
    .sort((a, b) => b.isPremiere - a.isPremiere);

  // Get new high quality posters and more info
  const moviesWithHighQualityPoster = await Promise.all(
    parsedMovies.map(async movie => {
      try {
        const imdbInfo = await getImdbInfo(movie.name);
        return {...movie, ...imdbInfo};
      } catch (error) {
        return movie;
      }
    })
  );

  return moviesWithHighQualityPoster;
};

const parseCast = cast => {
  const directorsAndActors = cast.reduce(
    (cast, {type, name}) => {
      if (type === "D") {
        cast.directors.push(name);
        return cast;
      }

      if (type === "A") {
        cast.actors.push(name);
        return cast;
      }
    },
    {directors: [], actors: []}
  );

  return directorsAndActors;
};

module.exports = parseMovies;
