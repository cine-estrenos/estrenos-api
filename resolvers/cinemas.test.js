const mockClient = require("../utils/test/mockClient");

jest.mock("../client", () => mockClient);

const {getCinemas} = require("./cinemas");

describe("Cinemas resolver", () => {
  it("getCinemas", async () => {
    mockClient.mockGet([{id: "1", name: "cinema 1"}]);

    expect(await getCinemas()).toEqual([{id: "1", name: "cinema 1"}]);
  });
});
