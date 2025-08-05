import cors from "cors";
import express from "express";
import logger from "./utils/winstonLogger.js";
import { getLoggerMiddleware } from "./middlewares/logger.js";

const app = express();
const ENV = process.env.NODE_ENV || "development";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(getLoggerMiddleware(ENV));

// Example route with app-level logging
app.get("/", (req, res) => {
  logger.info("Root route was accessed");
  res.send("API is working!");
});

export default app;
