import { getShowsByMovieId, getShowsByMovieIdAndCinemaId } from './shows';

describe('Shows selectors', () => {
  it('getShowsByMovieId', () => {
    expect(
      getShowsByMovieId(
        {
          1: {
            name: 'Movie 1',
            shows: [{ id: '10', name: 'Pepe pompin' }],
          },
          2: {
            name: 'Movie 2',
            shows: [{ id: '11', name: 'Pepe pompon' }],
          },
        },
        '1',
      ),
    ).toEqual({
      name: 'Movie 1',
      shows: [{ id: '10', name: 'Pepe pompin' }],
    });
  });

  it('getShowsByMovieIdAndCinemaId', () => {
    expect(
      getShowsByMovieIdAndCinemaId(
        {
          1: [
            {
              name: 'Movie 1',
              cinemaId: '10',
            },
          ],
          2: [
            {
              name: 'Movie 2',
              cinemaId: '11',
            },
          ],
        },
        '2',
        '11',
      ),
    ).toEqual([{ cinemaId: '11', name: 'Movie 2' }]);
  });
});
