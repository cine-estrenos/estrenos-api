const {getShowsByMovieId, getShowsByMovieIdAndCinemaId} = require("./shows");

describe("Shows selectors", () => {
  it("getShowsByMovieId", () => {
    expect(
      getShowsByMovieId(
        [
          {id: "1", name: "Movie 1", shows: [{id: "10", name: "Pepe pompin"}]},
          {id: "2", name: "Movie 2", shows: [{id: "11", name: "Pepe pompon"}]},
        ],
        "1"
      )
    ).toEqual([{id: "10", name: "Pepe pompin"}]);
  });

  it("getShowsByMovieId", () => {
    expect(
      getShowsByMovieIdAndCinemaId(
        [
          {
            id: "1",
            name: "Movie 1",
            shows: [
              {id: "10", name: "Pepe pompin", cinemaWithShows: {"2020": true}},
            ],
          },
          {
            id: "2",
            name: "Movie 2",
            shows: [
              {id: "11", name: "Pepe pompon", cinemaWithShows: {"2021": true}},
            ],
          },
        ],
        "1",
        "2020"
      )
    ).toEqual([
      {id: "10", name: "Pepe pompin", cinemaWithShows: {"2020": true}},
    ]);
  });
});
