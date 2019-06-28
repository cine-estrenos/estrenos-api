const mockClient = require("../utils/test/mockClient");

jest.mock("../client", () => mockClient);

const {getShowsByMovieId} = require("./shows");

describe("Shows resolver", () => {
  it("getShowsByMovieId", async () => {
    mockClient.mockGet([
      {id: "1", name: "movie", shows: [{name: "pepe pompin"}]},
    ]);

    expect(await getShowsByMovieId("1")).toEqual([{name: "pepe pompin"}]);
  });

  it("getShowsByMovieIdAndCinemaId", async () => {
    // Should implement
  });
});
