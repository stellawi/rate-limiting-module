import request from "supertest";
import { app } from "../app";

describe("app", () => {
  it("should show hello world", async () => {
    const response = await request(app)
      .get("/").expect(200)
      .expect("Content-Type", "text/html; charset=utf-8");

    expect(response.text).toEqual("Hello world");
  });
});
