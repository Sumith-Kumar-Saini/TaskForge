import { Router } from "express";
import logger from "../utils/winstonLogger.js";
import { validate } from "../middlewares/validate.js";
import { login, register } from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/refresh", (req, res) => {
  logger.info("Refresh route hit");
  res.json({ message: "good response", path: req.route.path });
});

export default router;
