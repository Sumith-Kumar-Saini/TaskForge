import Redis from "ioredis";
import { ENV } from "./env.js";
import logger from "../utils/winstonLogger.js";

const { HOST, PORT } = ENV.REDIS;

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;
const MAX_RETRY_DELAY_MS = 30000; // Cap the backoff delay to 30 seconds

const redis = new Redis({
  host: HOST,
  port: PORT,
  db: 0, // Use the appropriate database
  retryStrategy: (times) => {
    const delay = Math.min(RETRY_DELAY_MS * Math.pow(2, times), MAX_RETRY_DELAY_MS);
    logger.info(`Reconnecting to Redis... Attempt #${times + 1}, Delay: ${delay / 1000}s`);
    return delay; // Returns the delay time in ms for the next retry
  },
});

redis.on("connect", () => {
  logger.info("Connected to Redis");
});

redis.on("error", (err) => {
  logger.error("Redis error:", err);
});

redis.on("end", () => {
  logger.info("Redis connection closed");
});

export default redis;
