const mockClient = require('../utils/test/mockClient');
const { getCinemas } = require('./cinemas');

jest.mock('../client', () => mockClient);

describe('Cinemas resolvers', () => {
  it('getCinemas', async () => {
    mockClient.mockGet([{ id: '1', name: 'cinema 1' }]);

    expect(await getCinemas()).toEqual([{ id: '1', name: 'cinema 1' }]);
  });
});
