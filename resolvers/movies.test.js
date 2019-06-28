const mockClient = require("../utils/test/mockClient");

jest.mock("../client", () => mockClient);

const {getMovies, getMovieById} = require("./movies");

describe("Movies resolver", () => {
  it("getMovies", async () => {
    mockClient.mockGet([{id: "1", name: "movie 1"}]);

    expect(await getMovies("1")).toEqual([{id: "1", name: "movie 1"}]);
  });

  it("getMovieById", async () => {
    mockClient.mockGet([{id: "1", name: "movie 1"}]);

    expect(await getMovieById("1")).toEqual({id: "1", name: "movie 1"});
  });
});
