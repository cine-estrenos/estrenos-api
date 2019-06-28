const mockClient = require("../utils/test/mockClient");

const {getCinemas} = require("./cinemas");

jest.mock("../client", () => mockClient([{id: "1", name: "movie"}]));

describe("Cinemas resolver", () => {
  it("getCinemas", async () => {
    expect(await getCinemas()).toEqual([{id: "1", name: "movie"}]);
  });
});
