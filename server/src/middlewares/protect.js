import { ENV } from "../config/env.js";
import logger from "../utils/winstonLogger.js";
import jwt from "jsonwebtoken";

/**
 * @function protect
 * @description A middleware which protects routes with Authorization
 * @param {import("express").Request<unknown, unknown, RegisterRequestBody>} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Returns an Express Response.
 */
export const protect = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.easyResponse({
      statusCode: 401,
      error: new Error("Unauthorized"),
      message: "Authentication token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const message = errorMessage(error);

    // Log the error for further monitoring
    logger.error("Auth protect error:", message, {
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    res.easyResponse({
      statusCode: 401,
      message,
      error: new Error("Unauthorized"),
    });
  }
};

function errorMessage(error) {
  let message = "Failed to authenticate token";
  if (error.name === "TokenExpiredError") {
    message = "Session has expired. Please log in again";
  } else if (error.name === "JsonWebTokenError") {
    message = "Invalid token";
  }
  return message;
}
