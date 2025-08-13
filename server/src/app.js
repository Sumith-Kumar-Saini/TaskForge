import cors from "cors";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env.js";
import limiter from "./middlewares/rateLimit.js";
import ApiResponse from "./middlewares/easyResponse.js";
import { getLoggerMiddleware } from "./middlewares/logger.js";
import logger from "./utils/winstonLogger.js";

// routers
import AuthRouter from "./routes/auth.routes.js";
import { protect } from "./middlewares/protect.js";

const app = express();
const { NODE_ENV } = ENV.NODE_ENV;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(limiter());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ApiResponse.easyResponse());
app.use(getLoggerMiddleware(NODE_ENV));

// Example route with app-level logging
app.get("/", (_, res) => {
  logger.info("Root route was accessed");
  res.easyResponse({ statusCode: 200, message: "API is working!" });
});

app.use("/api/auth", AuthRouter);
app.get("/api/test", protect, (req, res) => {
  const { id, username, email } = req?.user;
  res.easyResponse({
    statusCode: 200,
    message: "Protect middleware working!",
    payload: { id, username, email },
  });
});

export default app;
