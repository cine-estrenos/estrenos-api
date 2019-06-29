const titleize = require("titleize");
const dayjs = require("dayjs");

require("dayjs/locale/es");

dayjs.locale("es");

const createTicketsLink = (cinemaId, sessionId, featureId) => {
  const baseUrl = "https://tickets.cinemarkhoyts.com.ar/NSTicketing";
  return `${baseUrl}/?CinemaId=${cinemaId}&SessionId=${sessionId}&FeatureId=${featureId}`;
};

const parseShows = movieList => {
  const showsParsed = movieList.map(
    ({id: formatId, format, version, cinemaList}) => {
      const cinemaWithShows = cinemaList.reduce(
        (acc, {id: cinemaId, sessionList}) => {
          const shows = sessionList.map(
            ({id: sessionId, feature: featureId, dtm: timestamp, seats}) => ({
              seats,
              timestamp,
              date: titleize(dayjs(timestamp).format("dddd D [de] MMMM")),
              time: dayjs(timestamp).format("HH[:]mm"),
              link: createTicketsLink(cinemaId, sessionId, featureId),
            })
          );

          acc[cinemaId] = shows;

          return acc;
        },
        {}
      );

      return {
        formatId,
        format: titleize(format),
        version: titleize(version),
        cinemaWithShows,
      };
    }
  );

  return showsParsed;
};

module.exports = {parseShows};
