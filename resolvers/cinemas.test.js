import mockClient from '../utils/test/mockClient';
import getCinemasResolver from './cinemas';

jest.mock('../client', () => mockClient);

describe('Cinemas resolvers', () => {
  it('getCinemas', async () => {
    mockClient.mockGet([{ id: '1', name: 'cinema 1' }]);
    expect(await getCinemasResolver()).toEqual([{ id: '1', name: 'cinema 1' }]);
  });
});
