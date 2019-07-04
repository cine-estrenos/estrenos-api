import mockClient from '../utils/test/mockClient';
import { getMoviesResolver, getMovieByIdResolver } from './movies';

jest.mock('../client', () => mockClient);

describe('Movies resolvers', () => {
  it('getMoviesResolver', async () => {
    mockClient.mockGet([{ id: '1', name: 'movie 1' }]);

    expect(await getMoviesResolver('1')).toEqual([{ id: '1', name: 'movie 1' }]);
  });

  it('getMovieByIdResolver', async () => {
    mockClient.mockGet([{ id: '1', name: 'movie 1' }]);

    expect(await getMovieByIdResolver('1')).toEqual({ id: '1', name: 'movie 1' });
  });
});
