import mongoose from "mongoose";
import { ENV } from "./env.js";
import logger from "../utils/winstonLogger.js";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;
const MONGODB_URI = ENV.MONGODB_URI;

if (!MONGODB_URI) {
  logger.error("MONGODB_URI is not provided in environment variables.");
  process.exit(1); // Fail-fast to avoid unpredictable state
}

async function connectDB(retries = MAX_RETRIES) {
  try {
    await mongoose.connect(MONGODB_URI);

    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error(
      `MongoDB connection failed [${
        MAX_RETRIES - retries + 1
      } attempt(s) left]: ${error.message}`
    );

    if (retries <= 1) {
      logger.error("Exhausted all retries. Exiting process.");
      process.exit(1); // Critical failure
    }

    logger.info(`Retrying MongoDB connection in ${RETRY_DELAY_MS / 1000}s...`);
    setTimeout(() => connectWithRetry(retries - 1), RETRY_DELAY_MS);
  }
}

export default connectDB;
