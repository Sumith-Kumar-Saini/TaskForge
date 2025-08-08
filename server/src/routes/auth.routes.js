import { Router } from "express";
import logger from "../utils/winstonLogger.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema } from "../schemas/authSchemas.js";
import { checkUserExist } from "../services/user.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/token.service.js";

const router = Router();

router.post("/register", validate(registerSchema), async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // check if user exist in Database
    const exist = checkUserExist({ username, email });
    if (exist) {
      res.statusCode(409);
      return res.json({ error: "User already exists with this email" });
    }

    // create user with name, email, password
    const user = createUser({ username, email, password });

    // Generate Access Token
    const { token: ACCESS_TOKEN } = await generateAccessToken({ id: user._id });

    // Generate Refresh Token with JWT ID
    // TODO: For now we are not using JWT ID to rotate Refresh Token
    const { token: REFRESH_TOKEN, jti: _ } = await generateRefreshToken({
      id: user._id,
    });

    

    return res.json({ username, email, password });
  } catch (err) {}
});

router.post("/login", (req, res) => {
  logger.info("Login route hit: ", { body: req.body });
  res.json({ message: "good response" });
});

router.get("/refresh", (req, res) => {
  logger.info("Refresh route hit");
  res.json({ message: "good response" });
});

export default router;
