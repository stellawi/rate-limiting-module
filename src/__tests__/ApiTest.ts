import { Api } from "../Api";
import { RedisClient } from "../RedisClient";
jest.mock("../RedisClient");

describe("Api", () => {
  let client: RedisClient;
  let api: Api;

  beforeEach(() => {
    client = new RedisClient(9000, "127.0.0.1");
    api = new Api(client as any);
  });

  it("will invoke redisclient", () => {
    const mockGetValueFromMultipleKeys = jest.fn();
    const mockRateLimitMechanismFunc = jest.fn();
    RedisClient.prototype.getValueFromMultipleKeys = mockGetValueFromMultipleKeys;
    api.rateLimitMechanism = mockRateLimitMechanismFunc;

    mockGetValueFromMultipleKeys.mockReturnValue({});
    mockRateLimitMechanismFunc.mockReturnValue({});

    api = new Api(client);
    api.get();

    expect(client.getValueFromMultipleKeys).toHaveBeenCalledTimes(1);
    expect(api.rateLimitMechanism()).toEqual(undefined);
    expect(api.isExceedingRequestLimit).toEqual(false);
  });
});
