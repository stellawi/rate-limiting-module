import { RedisClient } from "./RedisClient";

export class Api {

  public get(redisClient: RedisClient) {
    redisClient.getValue("number_of_request", (error: Error, result: string) => {
      if (error) {
        throw error;
      }
      if (result === "0") {
        redisClient.setKey("number_of_request", "0");
      } else {
        redisClient.incrementByOne("number_of_request");
        console.log("result", result);
      }
    });
  }
}