const mockClient = require('../utils/test/mockClient');
const { getMovies, getMovieById } = require('./movies');

jest.mock('../client', () => mockClient);

describe('Movies resolvers', () => {
  it('getMovies', async () => {
    mockClient.mockGet([{ id: '1', name: 'movie 1' }]);

    expect(await getMovies('1')).toEqual([{ id: '1', name: 'movie 1' }]);
  });

  it('getMovieById', async () => {
    mockClient.mockGet([{ id: '1', name: 'movie 1' }]);

    expect(await getMovieById('1')).toEqual({ id: '1', name: 'movie 1' });
  });
});
