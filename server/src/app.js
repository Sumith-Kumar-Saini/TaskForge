import cors from "cors";
import express from "express";
import helmet from "helmet";
import { ENV } from "./config/env.js";
import logger from "./utils/winstonLogger.js";
import { getLoggerMiddleware } from "./middlewares/logger.js";

// routers
import AuthRouter from "./routes/auth.routes.js";

const app = express();
const { NODE_ENV } = ENV.NODE_ENV;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(getLoggerMiddleware(NODE_ENV));

// Example route with app-level logging
app.get("/", (req, res) => {
  logger.info("Root route was accessed");
  res.send("API is working!");
});

app.use("/api/auth", AuthRouter);

export default app;
