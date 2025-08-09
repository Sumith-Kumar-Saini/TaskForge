import { checkUserExist, createUser } from "../services/user.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/token.service.js";
import { ENV } from "../config/env.js";
import { timeStringToSeconds } from "../utils/time.js";
import { REFRESH_TOKEN_EXPIRATION } from "../constants/constants.js";
import logger from "../utils/winstonLogger.js";

export async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    // check if user exist in Database
    const exist = await checkUserExist({ username, email });
    if (exist) {
      const error = checksExisting(exist, { username, email });
      return res.status(409).json({ error });
    }

    // create user with name, email, password
    const user = await createUser({ username, email, password });

    // Generate Access Token
    const { token: ACCESS_TOKEN } = await generateAccessToken({
      id: user._id,
      email: user.email,
    });

    // Generate Refresh Token with JWT ID
    // TODO: For now we are not using JWT ID to rotate Refresh Token
    const { token: REFRESH_TOKEN, jti: _ } = await generateRefreshToken({
      id: user._id,
    });

    // Sets the cookie to client with httpOnly true with maxAge of 30 days
    res.cookie("refreshToken", REFRESH_TOKEN, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      maxAge: timeStringToSeconds(REFRESH_TOKEN_EXPIRATION),
    });

    // Response with status code 201 - new entry created, aka new user created
    return res.status(201).json({
      message: "User Registration Successful",
      token: ACCESS_TOKEN,
      user: user.toJSON(),
    });
  } catch (err) {
    // handles errors if server issues, like not added environment variables
    logger.error("Registration Error occurred: ", err);
    return res.status(500).json({ error: "Something want wrong" });
  }
}

function checksExisting(existingUser, { username, email }) {
  if (existingUser.username === username && existingUser.email === email) {
    return "Username and email already exist";
  } else if (existingUser.username === username) {
    return "Username is already taken";
  } else if (existingUser.email === email) {
    return "Email is already registered";
  }
}
