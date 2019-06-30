const mockClient = require('../utils/test/mockClient');
const { getShowsByMovieId, getShowsByMovieIdAndCinemaId } = require('./shows');

jest.mock('../client', () => mockClient);

describe('Shows resolvers', () => {
  it('getShowsByMovieId', async () => {
    mockClient.mockGet([{ id: '1', name: 'movie', shows: [{ name: 'pepe pompin' }] }]);

    expect(await getShowsByMovieId('1')).toEqual([{ name: 'pepe pompin' }]);
  });

  it('getShowsByMovieIdAndCinemaId', async () => {
    mockClient.mockGet([
      {
        id: '1',
        name: 'movie',
        shows: [{ name: 'pepe pompin', cinemaWithShows: { '2020': true } }],
      },
    ]);

    expect(await getShowsByMovieIdAndCinemaId('1', '2020')).toEqual([
      { name: 'pepe pompin', cinemaWithShows: { '2020': true } },
    ]);
  });
});
