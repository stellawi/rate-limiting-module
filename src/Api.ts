import CustomError from "./CustomError";
import { RedisClient } from "./RedisClient";
import { REQUEST_LIMIT, TIME_LIMIT_IN_MILLISECONDS } from "./utils/config";

export class Api {
  private redisClient: RedisClient;

  constructor(redisClient: RedisClient) {
    this.redisClient = redisClient;
  }

  public get() {
    this.getNoOfRequest();
  }

  private getNoOfRequest() {
    this.redisClient
      .getValueFromMultipleKeys("number_of_request", "creation_time", (_: any, result: string[]) => {
        const currentRequestNo: string = result[0];
        const creationTime: string = result[1];

        if (creationTime) {
          const currentTime: string = new Date().getTime().toString();
          const timeDifference = Number(currentTime) - Number(creationTime);

          const timeDifferenceExceedTimeLimit = timeDifference > Number(TIME_LIMIT_IN_MILLISECONDS);
          const noOfRequestEqualRequestLimit = Number(currentRequestNo) === Number(REQUEST_LIMIT);

          if (timeDifferenceExceedTimeLimit || noOfRequestEqualRequestLimit) {
            this.exceedTimeLimit();
          }
        }
        this.updateKey("number_of_request", currentRequestNo);
      });
  }

  private updateKey(key: string, value: string) {
    if (value) {
      this.redisClient.incrementByOne("number_of_request");
    } else {
      this.redisClient.setKey(key, "1");
      this.redisClient.setKey("creation_time", new Date().getTime().toString());
    }
  }

  private exceedTimeLimit() {
    this.redisClient.deleteKey("creation_time");
    this.redisClient.deleteKey("number_of_request");
  }

}
