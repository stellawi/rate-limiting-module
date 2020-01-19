import express from "express";
import { Api } from "./Api";
import { RedisClient } from "./RedisClient";
import { APPLICATION_PORT, REDIS_PORT, REDIST_HOST } from "./utils/config";

const App = express();

const api = new Api();
const redisClient = new RedisClient(Number(REDIS_PORT), REDIST_HOST);
redisClient.connect();

App.get("/", async (_, res) => {
  api.get(redisClient);
  res.send("Hello world");
});

App.listen(APPLICATION_PORT, (err) => {
  console.log(`server is listening on ${APPLICATION_PORT}`);
  if (err) {
    throw err;
  }
});

export {
  App,
};
