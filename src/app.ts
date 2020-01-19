import express from "express";
import { Api } from "./Api";
import { RedisClient } from "./RedisClient";

const App = express();
const port = 3000;

process.env.NODE_ENV = "development";

const api = new Api();
const redisClient = new RedisClient(6379, "127.0.0.1");
redisClient.connect();

App.get("/", async (_, res) => {
  api.get(redisClient);
  res.send("Hello world");
});

App.listen(port, (err) => {
  console.log(`server is listening on ${port}`);
  if (err) {
    throw err;
  }
});

export {
  App,
};
