import { Router } from "express";
import logger from "../utils/winstonLogger.js";
import { validate } from "../middlewares/validate.js";
import { register } from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";

// Controller
import {
  checkUserExist,
  verifyUserPassword,
} from "../services/user.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/token.service.js";
import { ENV } from "../config/env.js";
import { timeStringToSeconds } from "../utils/time.js";
import { REFRESH_TOKEN_EXPIRATION } from "../constants/constants.js";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await checkUserExist({ username, email }, { password: true });

    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        error: "Not Found",
        message: "Account not found",
        timestamp: new Date().toISOString(),
        path: "/api/auth/login",
      });
    }

    const isPasswordMatch = await verifyUserPassword({
      password,
      hash: user.password,
    });

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        error: "Unauthorized",
        message: "Invalid credentials",
        timestamp: new Date().toISOString(),
        path: "/api/auth/login",
      });
    }

    const { token: accessToken } = await generateAccessToken({
      id: user._id.toString(),
      email,
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

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User login successful",
      timestamp: new Date().toISOString(),
      path: "/api/auth/login",
      payload: {
        accessToken,
        user: sanitizedUser,
      },
    });
  } catch (error) {
    logger.error("Login Error occurred: ", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      error: "Internal server error",
      message: "Internal server error",
      timestamp: new Date().toISOString(),
      path: "/api/auth/login",
    });
  }
});

router.get("/refresh", (req, res) => {
  logger.info("Refresh route hit");
  res.json({ message: "good response", path: req.route.path });
});

export default router;
