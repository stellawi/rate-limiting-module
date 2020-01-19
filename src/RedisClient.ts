import redis from "redis";

export class RedisClient {
  private client: redis.RedisClient;

  constructor(port: number, host: string) {
    this.client = redis.createClient(port, host);
  }

  public connect = () => {
    this.client.on("connect", () => {
      console.log("Connected with redis");
    });
  }

  public incrementByOne = (key: string) => {
    this.client.incr(`${key}`);
  }

  public setKey = (key: string, value: string) => {
    this.client.set(key, value);
  }

  public deleteKey = (key: string) => {
    this.client.del(key);
  }

  public getValueFromMultipleKeys = (key1: string, key2: string, func: any) => {
    this.client.mget([key1, key2], func);
  }
}
