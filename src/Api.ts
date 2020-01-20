import { RedisClient } from "./RedisClient";
import { REQUEST_LIMIT, TIME_LIMIT_IN_MILLISECONDS } from "./utils/config";
export class Api {
  private redisClient: RedisClient;
  private requestLimitExceeded: boolean;

  constructor(redisClient: RedisClient) {
    this.redisClient = redisClient;
    this.requestLimitExceeded = false;
  }

  get isExceedingRequestLimit(): boolean {
    return this.requestLimitExceeded;
  }

  set isExceedingRequestLimit(value: boolean) {
    this.requestLimitExceeded = value;
  }

  public get() {
    this.getNoOfRequest();
  }

  public rateLimitMechanism() {
    this.redisClient
      .getValueFromMultipleKeys("number_of_request", "creation_time", (_: any, result: string[]) => {
        const currentRequestNo: string = result[0];
        const creationTime: string = result[1];

        if (creationTime) {
          if (this.isExceedingTimeLimit(creationTime) || this.isEqualToMaxRequestLimit(currentRequestNo)) {
            this.requestLimitExceeded = true;
            return this.exceedRequestLimit();
          }
        }
        this.requestLimitExceeded = false;
        return this.updateKey("number_of_request", currentRequestNo);
      });
  }

  private exceedRequestLimit() {
    this.redisClient.deleteKey("creation_time");
    this.redisClient.deleteKey("number_of_request");
  }

  private isEqualToMaxRequestLimit(currentRequestNo: string) {
    return Number(currentRequestNo) === Number(REQUEST_LIMIT);
  }

  private isExceedingTimeLimit(creationTime: string) {
    const currentTime: string = new Date().getTime().toString();
    const timeDifference = Number(currentTime) - Number(creationTime);
    return timeDifference > Number(TIME_LIMIT_IN_MILLISECONDS);
  }

  private getNoOfRequest() {
    this.rateLimitMechanism();
  }

  private updateKey(key: string, value: string) {
    if (value) {
      this.redisClient.incrementByOne("number_of_request");
    } else {
      this.redisClient.setKey(key, "1");
      this.redisClient.setKey("creation_time", new Date().getTime().toString());
    }
  }
}
