import * as dotenv from "dotenv";

dotenv.config();

let path;
switch (process.env.NODE_ENV) {
  case "development":
    path = ".env.development";
    break;
  case "production":
    path = ".env.production";
    break;
}

dotenv.config({ path });

export const APPLICATION_PORT = process.env.APPLICATION_PORT;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIST_HOST = process.env.REDIST_HOST;
export const REQUEST_LIMIT = process.env.REQUEST_LIMIT;
export const MOCK_REDIS_PORT = process.env.MOCK_REDIS_PORT;
export const TIMEOUT = process.env.TIMEOUT;
export const TIME_LIMIT_IN_MILLISECONDS = process.env.TIME_LIMIT_IN_MILLISECONDS;
