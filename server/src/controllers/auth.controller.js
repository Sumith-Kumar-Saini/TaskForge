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
 * @function register
 * @description Handles user registration, validates inputs, checks for existing users,
 *              creates a new user, and issues authentication tokens.
 * @param {import("express").Request<unknown, unknown, RegisterRequestBody>} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Returns an Express Response.
 */
export async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
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

    // Generate Access & Refresh Tokens
    const { token: accessToken } = await generateAccessToken({
      id: user._id.toString(),
      email: user.email,
      username: user.username,
    });
    const { token: refreshToken /*, jti  */ } = await generateRefreshToken({
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
 * @description Handles user login, validates inputs, checks credentials, and issues authentication tokens.
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

    // Generate Access & Refresh Tokens
    const { token: accessToken } = await generateAccessToken({
      id: user._id.toString(),
      email: user.email,
      username: user.username,
    });
    const { token: refreshToken } = await generateRefreshToken({
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
 * @description Renews the access token using the refresh token, ensuring security and token rotation.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Returns a response with a new access token.
 */
export async function refresh(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.easyResponse({
      statusCode: 401,
      message: "No token provided",
      error: new Error("Unauthorized"),
    });
  }

  try {
    const { id: userId } = jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET);

    // Find the user associated with the token
    const user = await User.findById(userId);
    if (!user) {
      return res.easyResponse({
        statusCode: 403,
        message: "User not found",
        error: new Error("Forbidden"),
      });
    }

    // Generate new tokens
    const { token: newAccessToken } = await generateAccessToken({
      id: userId,
      email: user.email,
      username: user.username,
    });
    const { token: newRefreshToken } = await generateRefreshToken({
      id: userId,
    });

    // Update the refresh token cookie with a new token
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: timeStringToSeconds(REFRESH_TOKEN_EXPIRATION) * 1000,
    });

    return res.easyResponse({
      statusCode: 200,
      message: "Access token successfully refreshed",
      payload: { token: newAccessToken },
    });
  } catch (err) {
    logger.warn("Refresh Error occurred: ", err);
    return res.easyResponse({
      statusCode: 403,
      message: "Invalid or expired refresh token",
      error: err,
    });
  }
}

/**
 * @function logout
 * @description Logs out the user by clearing the refresh token cookie and invalidating session.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Returns a response confirming logout.
 */
export async function logout(_, res) {
  // Clear the refresh token cookie
  res.clearCookie("refreshToken");

  return res.easyResponse({
    statusCode: 200,
    message: "User successfully logged out",
  });
}
