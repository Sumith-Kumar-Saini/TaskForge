import { randomBytes } from "crypto";
import { StatusCodes } from "http-status-codes";
import { ENV } from "../config/env.js";

export default class ApiResponse {
  static easyResponse() {
    /**
     * @function middleware
     * @description Attach generateResponse function to the response object
     * @param {import("express").Request} _ - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @param {import("express").NextFunction} next - Express next function
     * @returns {void} Returns an Express Response.
     */
    return (req, res, next) => {
      res.easyResponse = ({
        statusCode,
        message,
        payload = null,
        error = null,
        traceId = null,
      }) => {
        try {
          const response = this.generateResponse({
            statusCode,
            message,
            payload,
            error,
            traceId,
            originalUrl: req.originalUrl,
          });
          res.status(statusCode).json(response); // Send the response
        } catch (err) {
          next(err); // Pass the error to the error handling middleware
        }
      };

      // Proceed to the next middleware
      next();
    };
  }

  /**
   * @method generateResponse
   * @description The method generates a proper response for client
   * @param {import("../types/ApiResponse.js").easyResponseParameters} param - Generate Response parameters
   * @returns {import("../types/ApiResponse.js").generateResponse} - JSON response
   */
  static generateResponse({
    statusCode,
    message,
    payload = null,
    error = null,
    traceId = null,
    originalUrl
  }) {
    if (typeof statusCode !== "number")
      throw new Error('The "statusCode" field must be a number.');
    if (typeof message !== "string" || message.trim() === "")
      throw new Error('The "message" field must be a non-empty string.');

    const success =
      statusCode >= StatusCodes.OK && statusCode < StatusCodes.MULTIPLE_CHOICES;

    const statusDetails = this.getStatusDetails(statusCode);

    const response = {
      success,
      status: statusDetails,
      statusCode,
      error: null,
      message,
      payload,
      path: originalUrl,
      timestamps: new Date().toISOString(),
      traceId: traceId || this.generateTraceId(),
    };

    if (error) {
      response.error = {
        message: error.message || "An unknown error occurred",
        details: error.details || null,
        stack: ENV.NODE_ENV === "production" ? null : error.stack || null,
      };
    }

    return response;
  }

  static getStatusDetails(statusCode) {
    const statusText = StatusCodes[statusCode];
    if (statusText) return statusText;
    return "INVALID_STATUS_CODE";
  }

  static generateTraceId() {
    return `trace-${randomBytes(16)
      .toString("hex")
      .slice(0, 16)}-${Date.now()}`;
  }
}
