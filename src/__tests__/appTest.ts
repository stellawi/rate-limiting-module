import redis, { RedisClient } from "redis-mock";
import request from "supertest";
import { Api } from "../Api";
import { App } from "../App";

describe("App", () => {
  let client: RedisClient;
  let api: Api;

  beforeEach(() => {
    client = redis.createClient({
      port: 9000,
    });
    api = new Api(client as any);
  });

  it("should print hello world on the main page", async () => {
    const response = await request(App)
      .get("/").expect(200)
      .expect("Content-Type", "text/html; charset=utf-8");
    expect(response.text).toEqual("Hello world");
  });
});
