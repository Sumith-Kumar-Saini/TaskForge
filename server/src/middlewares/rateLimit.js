import rateLimit from "express-rate-limit";

// Rate Limiting middleware for login & refresh token endpoints
const limiter = (options) =>
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",
    ...options,
  });

export default limiter;
