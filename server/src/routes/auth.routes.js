import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { login, register } from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
// import logger from "../utils/winstonLogger.js";

// Controller
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/token.service.js";
import { ENV } from "../config/env.js";
import logger from "../utils/winstonLogger.js";
import jwt from "jsonwebtoken";
import { timeStringToSeconds } from "../utils/time.js";
import { REFRESH_TOKEN_EXPIRATION } from "../constants/constants.js";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/refresh", async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const { id: userId } = jwt.verify(token, ENV.REFRESH_TOKEN_SECRET);
    const user = await User.findById(userId);
    if (!user) return res.status(403).json({ msg: "Token reuse detected" });

    const { token: newAccessToken } = await generateAccessToken({ id: userId });
    const { token: newRefreshToken } = await generateRefreshToken({ id: userId });

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
});

export default router;
