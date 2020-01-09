import getMovieById from './movies';

describe('Movies selectors', () => {
  it('getMovieById', () => {
    expect(
      getMovieById(
        [
          { ids: ['1'], name: 'Movie 1' },
          { ids: ['2'], name: 'Movie 2' },
        ],
        '1',
      ),
    ).toEqual({
      ids: ['1'],
      name: 'Movie 1',
    });
  });
});
