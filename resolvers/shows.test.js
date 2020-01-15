import mockClient from '../utils/test/mockClient';
import { getShowsByMovieIdResolver, getShowsByMovieIdAndCinemaIdResolver } from './shows';

jest.mock('../client', () => mockClient);

describe('Shows resolvers', () => {
  it('getShowsByMovieIdResolver', async () => {
    mockClient.mockGet({ 1: [{ name: 'movie' }] });

    expect(await getShowsByMovieIdResolver('1')).toEqual([{ name: 'movie' }]);
  });

  it('getShowsByMovieIdAndCinemaIdResolver', async () => {
    mockClient.mockGet({
      1: [
        {
          name: 'movie',
          cinemaId: '2020',
        },
      ],
    });

    expect(await getShowsByMovieIdAndCinemaIdResolver('1', '2020')).toEqual([{ name: 'movie', cinemaId: '2020' }]);
  });
});
