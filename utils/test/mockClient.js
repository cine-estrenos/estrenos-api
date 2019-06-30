const api = {
  redis: {
    get: jest.fn(),
    set: jest.fn(),
  },
  mockGet: response => api.redis.get.mockResolvedValueOnce(JSON.stringify(response)),
  mockSet: response => api.redis.get.mockReturnValueOnce(JSON.stringify(response)),
};

module.exports = api;
