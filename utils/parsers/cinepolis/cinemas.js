const parseCinepolisCinemas = (cinemas) => {
  const parsedCinemas = cinemas.map((cinema) => {
    const [chain, name] = cinema.name.split(' ');

    return {
      id: cinema.id,
      name,
      chain,
    };
  });

  return parsedCinemas;
};

export default parseCinepolisCinemas;
