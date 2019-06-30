const { getMovieById } = require('./movies');

describe('Movies selectors', () => {
  it('getMovieById', () => {
    expect(getMovieById([{ id: '1', name: 'Movie 1' }, { id: '2', name: 'Movie 2' }], '1')).toEqual({
      id: '1',
      name: 'Movie 1',
    });
  });
});
