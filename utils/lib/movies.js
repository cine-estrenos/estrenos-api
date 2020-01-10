import hasha from 'hasha';
import clean from 'get-clean-string';

export const parseCast = (cast, actorType, directorType) => {
  const parsedCast = cast.reduce(
    (acc, { type, name }) => {
      if (type === actorType) acc.actors.push(name);
      if (type === directorType) acc.directors.push(name);
      return acc;
    },
    { directors: [], actors: [] },
  );

  return parsedCast;
};

export const parseLength = (length) => {
  const hours = length / 60;
  const rawHours = Math.floor(hours);

  const minutes = (hours - rawHours) * 60;
  const rawMinutes = Math.round(minutes);

  return `${rawHours}h ${rawMinutes}m`;
};

export const createUniqueId = (title) => {
  const parsedTitle = clean()(title.slice(0, 6).toLowerCase());
  const hash = hasha(parsedTitle).slice(0, 8);

  return hash;
};
