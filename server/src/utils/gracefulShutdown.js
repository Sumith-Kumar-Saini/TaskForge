import mongoose from "mongoose";
import redis from "../config/redis.js";
import logger from "./winstonLogger.js";

export default async function shutdownDB() {
  try {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed.");
  } catch (err) {
    logger.error("Error closing MongoDB connection:", err);
  }

  try {
    await redis.quit();
    logger.info("Redis connection closed.");
  } catch (error) {
    logger.error("Error during Redis shutdown:", error);
  }
}
