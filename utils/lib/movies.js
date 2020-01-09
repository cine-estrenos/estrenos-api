export const cinemarkCastTypes = {
  actor: 'A',
  director: 'D',
};

export const imaxCastTypes = {
  actor: 'Actor',
  director: 'Director',
};

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
