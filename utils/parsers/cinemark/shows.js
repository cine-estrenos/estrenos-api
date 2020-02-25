import titleize from 'titleize';
import dayjs from 'dayjs';

const createTicketsLink = (cinemaId, sessionId, featureId) => {
  const baseUrl = 'https://tickets.cinemarkhoyts.com.ar/NSTicketing';
  return `${baseUrl}/?CinemaId=${cinemaId}&SessionId=${sessionId}&FeatureId=${featureId}`;
};

const parseShows = (movieList) => {
  const showsParsed = movieList.map(({ format, version, cinemaList }) => {
    const cinemaWithShows = cinemaList.map(({ id: cinemaId, sessionList }) => {
      const shows = sessionList.map(({ id: sessionId, feature: featureId, dtm: timestamp }) => ({
        id: sessionId,
        cinemaId: String(cinemaId),
        version: titleize(version),
        format: format.toUpperCase(),
        time: dayjs(timestamp).format('HH[:]mm'),
        date: dayjs(timestamp).format('YYYY-MM-DD'),
        link: createTicketsLink(cinemaId, sessionId, featureId),
      }));

      return shows;
    });

    return cinemaWithShows;
  });

  return showsParsed.flat(2);
};

export default parseShows;
