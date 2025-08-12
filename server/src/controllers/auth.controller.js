import {
  checkUserExist,
  createUser,
  verifyUserPassword,
} from "../services/user.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/token.service.js";
import { ENV } from "../config/env.js";
import { timeStringToSeconds } from "../utils/time.js";
import { REFRESH_TOKEN_EXPIRATION } from "../constants/constants.js";
import logger from "../utils/winstonLogger.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

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
      return res.easyResponse({
        statusCode: 409,
        error: new Error(errorMsg),
        message: "User already exists",
      });
    }

    // Create new user
    const user = await createUser({ username, email, password });

    // Generate Access Token
    const { token: accessToken } = await generateAccessToken({
      id: user._id.toString(),
    });

    // Generate Refresh Token (rotation logic can be added later)
    const { token: refreshToken /*, jti*/ } = await generateRefreshToken({
      id: user._id.toString(),
    });

    const sanitizedUser = user.removeFields("password createdAt updatedAt");

    // Set secure cookie for refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: timeStringToSeconds(REFRESH_TOKEN_EXPIRATION) * 1000, // in ms
    });

    // Return success response
    return res.easyResponse({
      statusCode: 201,
      message: "User registration successful",
      payload: {
        token: accessToken,
        user: sanitizedUser,
      },
    });
  } catch (error) {
    logger.error("Registration Error occurred:", error);
    return res.easyResponse({
      statusCode: 500,
      message: "Internal server error",
      error,
    });
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

/**
 * @function login
 * @description Handles user login by validating inputs, login the user, and issuing authentication tokens.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Returns an Express Response.
 */
export async function login(req, res) {
  const { username, email, password } = req.body;
  try {
    const user = await checkUserExist({ username, email }, { password: true });

    if (!user) {
      return res.easyResponse({
        statusCode: 404,
        error: new Error("Not Found"),
        message: "Account not found",
      });
    }

    const isPasswordMatch = await verifyUserPassword({
      password,
      hash: user.password,
    });

    if (!isPasswordMatch) {
      return res.easyResponse({
        statusCode: 401,
        error: new Error("Unauthorized"),
        message: "Invalid credentials",
      });
    }

    const { token: accessToken } = await generateAccessToken({
      id: user._id.toString(),
    });

    const { token: refreshToken /*, jti */ } = await generateRefreshToken({
      id: user._id.toString(),
    });

    const sanitizedUser = user.removeFields("password");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: timeStringToSeconds(REFRESH_TOKEN_EXPIRATION) * 1000,
    });

    return res.easyResponse({
      statusCode: 200,
      message: "User login successful",
      payload: {
        token: accessToken,
        user: sanitizedUser,
      },
    });
  } catch (error) {
    logger.error("Login Error occurred: ", error);
    return res.easyResponse({
      statusCode: 500,
      error: new Error("Internal server error"),
      message: "Internal server error",
    });
  }
}

/**
 * @function refresh
 * @description Handles renew the access token
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Returns an Express Response.
 */
export async function refresh(req, res) {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const { id: userId } = jwt.verify(token, ENV.REFRESH_TOKEN_SECRET);
    const user = await User.findById(userId);
    if (!user) return res.status(403).json({ msg: "Token reuse detected" });

    const { token: newAccessToken } = await generateAccessToken({ id: userId });
    const { token: newRefreshToken } = await generateRefreshToken({
      id: userId,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: timeStringToSeconds(REFRESH_TOKEN_EXPIRATION) * 1000,
    });

    res.easyResponse({
      statusCode: 200,
      message: "New Access Token genereated",
      payload: { token: newAccessToken },
    });
  } catch (err) {
    logger.warn("Refresh Error occurred: ", err);
    return res.status(403).json({ msg: "Invalid token" });
  }
}
