const { getShowsByMovieId, getShowsByMovieIdAndCinemaId } = require('./shows');

describe('Shows selectors', () => {
  it('getShowsByMovieId', () => {
    expect(
      getShowsByMovieId(
        [
          {
            id: '1',
            name: 'Movie 1',
            shows: [{ id: '10', name: 'Pepe pompin' }],
          },
          {
            id: '2',
            name: 'Movie 2',
            shows: [{ id: '11', name: 'Pepe pompon' }],
          },
        ],
        '1'
      )
    ).toEqual([{ id: '10', name: 'Pepe pompin' }]);
  });

  it('getShowsByMovieIdAndCinemaId', () => {
    expect(
      getShowsByMovieIdAndCinemaId(
        [
          {
            id: '1',
            name: 'Movie 1',
            shows: [
              {
                cinemaId: '10',
                name: 'Pepe pompin',
              },
            ],
          },
          {
            id: '2',
            name: 'Movie 2',
            shows: [
              {
                cinemaId: '11',
                name: 'Pepe pompon',
              },
            ],
          },
        ],
        '2',
        '11'
      )
    ).toEqual([{ cinemaId: '11', name: 'Pepe pompon' }]);
  });
});
