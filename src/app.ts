import express from "express";
import { Api } from "./Api";
import CustomError from "./CustomError";
import { RedisClient } from "./RedisClient";
import { APPLICATION_PORT, REDIS_PORT, REDIST_HOST, TIMEOUT } from "./utils/config";

const App = express();

const redisClient = new RedisClient(Number(REDIS_PORT), REDIST_HOST);
const api = new Api(redisClient);

redisClient.connect();

App.get("/", (_, res) => {
  try {
    if (api.isExceedingRequestLimit) {
      throw new CustomError(`Rate limit exceeded. Try again in #{${TIMEOUT}} seconds`);
    }
    api.get();
    res.send("Hello world");
  } catch (e) {
    if (e instanceof CustomError) {
      res.status(429).send(e.displayErrorMessage());
      setTimeout(setRequestLimitToFalse, Number(TIMEOUT));
    }
  }
});

App.listen(APPLICATION_PORT, () => {
  console.log(`server is listening on ${APPLICATION_PORT}`);
});

const setRequestLimitToFalse = () => api.isExceedingRequestLimit = false;

export {
  App,
};
