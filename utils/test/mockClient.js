module.exports = values => ({
  redis: {
    get: jest.fn().mockResolvedValue(JSON.stringify(values)),
    set: jest.fn().mockReturnValue(JSON.stringify(values)),
  },
});
