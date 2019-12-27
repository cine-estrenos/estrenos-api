import titleize from 'titleize';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

const createTicketsLink = (cinemaId, sessionId, featureId) => {
  const baseUrl = 'https://tickets.cinemarkhoyts.com.ar/NSTicketing';
  return `${baseUrl}/?CinemaId=${cinemaId}&SessionId=${sessionId}&FeatureId=${featureId}`;
};

const parseShows = (movieList) => {
  const showsParsed = movieList.map(({ format, version, cinemaList }) => {
    const cinemaWithShows = cinemaList.map(({ id: cinemaId, sessionList }) => {
      const shows = sessionList.map(({ id: sessionId, feature: featureId, dtm: timestamp, seats }) => ({
        seats,
        cinemaId: String(cinemaId),
        format: titleize(format),
        version: titleize(version),
        time: dayjs(timestamp).format('HH[:]mm'),
        date: titleize(dayjs(timestamp).format('dddd D [de] MMMM')),
        link: createTicketsLink(cinemaId, sessionId, featureId),
      }));

      return shows;
    });

    return cinemaWithShows;
  });

  return showsParsed.flat(2);
};

export default parseShows;
