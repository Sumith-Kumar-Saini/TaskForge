import { checkUserExist, createUser } from "../services/user.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/token.service.js";
import { ENV } from "../config/env.js";
import { timeStringToSeconds } from "../utils/time.js";
import { REFRESH_TOKEN_EXPIRATION } from "../constants/constants.js";
import logger from "../utils/winstonLogger.js";

/**
 * @typedef {Object} RegisterRequestBody
 * @property {string} username - Unique username of the new user.
 * @property {string} email - Valid email address of the new user.
 * @property {string} password - Password for the new user (plain text, will be hashed in service).
 */

/**
 * @typedef {Object} ExistingUser
 * @property {string} [username] - Existing user's username.
 * @property {string} [email] - Existing user's email.
 */

/**
 * @function register
 * @description Handles user registration by validating inputs, checking for duplicates,
 *              creating the user, and issuing authentication tokens.
 * @param {import("express").Request<unknown, unknown, RegisterRequestBody>} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Returns an Express Response.
 */
export async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await checkUserExist(
      { username, email },
      { password: undefined }
    );
    if (existingUser) {
      const errorMsg = getExistingUserError(existingUser, { username, email });
      return res.status(409).json({ error: errorMsg });
    }

    // Create new user
    const user = await createUser({ username, email, password });

    // Generate Access Token
    const { token: accessToken } = await generateAccessToken({
      id: user._id.toString(),
      email: user.email,
    });

    // Generate Refresh Token (rotation logic can be added later)
    const { token: refreshToken /*, jti*/ } = await generateRefreshToken({
      id: user._id.toString(),
    });

    // Set secure cookie for refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: timeStringToSeconds(REFRESH_TOKEN_EXPIRATION) * 1000, // in ms
    });

    // Return success response
    return res.status(201).json({
      message: "User registration successful",
      token: accessToken,
      user: user.toJSON(),
    });
  } catch (error) {
    logger.error("Registration Error occurred:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * @function getExistingUserError
 * @description Determines the appropriate error message when a username or email already exists.
 * @param {ExistingUser} existingUser - The user record found in the database.
 * @param {{ username: string, email: string }} input - The username and email provided by the client.
 * @returns {string} A human-readable error message describing the conflict.
 */
function getExistingUserError(existingUser, { username, email }) {
  if (existingUser.username === username && existingUser.email === email) {
    return "Username and email already exist";
  }
  if (existingUser.username === username) {
    return "Username is already taken";
  }
  if (existingUser.email === email) {
    return "Email is already registered";
  }
  return "User already exists";
}
