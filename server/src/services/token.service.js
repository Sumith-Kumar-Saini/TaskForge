import JWT from "jsonwebtoken";
import crypto from "crypto";
import { ENV } from "../config/env.js";
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from "../constants/constants.js";
import logger from "../utils/winstonLogger.js";

/**
 * @typedef { Object } TokenPayload
 * @property { string } id - The user's ID.
 * @property { string } email - The user's email address.
 */

/**
 * @typedef { Object } TokenResponse
 * @property { string } token - The generated access token.
 */

/**
 * Generates an access token for a user.
 * * @param { TokenPayload } payload - The user information to be included in the token.
 * @returns { Promise<TokenResponse> } A promise that resolves with the access token or rejects with an error.
 */
export async function generateAccessToken({ id, email, username }) {
  return new Promise((resolve, reject) => {
    try {
      const token = JWT.sign({ id, email, username }, ENV.ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      });
      resolve({ token });
    } catch (err) {
      logger.error("JWT Error occurred: ", err.message);
      reject({ error: err.message });
    }
  });
}

/**
 * @typedef {Object} RefreshTokenPayload
 * @property {string} id - The user's ID.
 */

/**
 * @typedef {Object} RefreshTokenResponse
 * @property {string} jti - The unique JWT ID for token rotation.
 * @property {string} token - The generated refresh token.
 */

/**
 * Generates a refresh token for a user.
 * * @param {RefreshTokenPayload} payload - The user information to be included in the token.
 * @returns {Promise<RefreshTokenResponse>} A promise that resolves with the refresh token and its JTI, or rejects with an error.
 */
export function generateRefreshToken({ id }) {
  return new Promise((resolve, reject) => {
    try {
      // unique ID is for to make refresh token truly unique, which can be use in token rotation
      const uniqueID = crypto.randomUUID();
      const token = JWT.sign({ id, jti: uniqueID }, ENV.REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      });

      // JWT ID is for refresh token rotation to prevents security vulnerability
      resolve({ jti: uniqueID, token });
    } catch (err) {
      logger.error("JWT Error occurred: ", err.message);
      reject({ error: err.message });
    }
  });
}
