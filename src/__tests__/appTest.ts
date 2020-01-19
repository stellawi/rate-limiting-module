import redis from "redis-mock";
import request from "supertest";
import { App } from "../App";

describe("App", () => {
  let client;

  it("should show hello world", async () => {
    client = redis.createClient({
      port: 9000,
    });
    const response = await request(App)
      .get("/").expect(200)
      .expect("Content-Type", "text/html; charset=utf-8");
    expect(response.text).toEqual("Hello world");
  });

  it("should connect to redis", async () => {
    await request(App).get("/");
    client = redis.createClient({
      port: 9000,
    });
    client.set("number_of_request", "4");
    client.get("number_of_request", async (_, result: string) => {
      expect(result).toEqual("4");
    });
  });
});
