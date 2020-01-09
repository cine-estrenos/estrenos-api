import mockClient from '../utils/test/mockClient';
import { getShowsByMovieIdResolver, getShowsByMovieIdAndCinemaIdResolver } from './shows';

jest.mock('../client', () => mockClient);

describe('Shows resolvers', () => {
  it('getShowsByMovieIdResolver', async () => {
    mockClient.mockGet([{ ids: ['1'], name: 'movie', shows: [{ name: 'pepe pompin' }] }]);

    expect(await getShowsByMovieIdResolver('1')).toEqual([{ name: 'pepe pompin' }]);
  });

  it('getShowsByMovieIdAndCinemaIdResolver', async () => {
    mockClient.mockGet([
      {
        ids: ['1'],
        name: 'movie',
        shows: [{ name: 'pepe pompin', cinemaId: '2020' }],
      },
    ]);

    expect(await getShowsByMovieIdAndCinemaIdResolver('1', '2020')).toEqual([
      { name: 'pepe pompin', cinemaId: '2020' },
    ]);
  });
});
