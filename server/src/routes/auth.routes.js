import { Router } from "express";
import logger from "../utils/winstonLogger.js";
import { validate } from "../middlewares/validate.js";
import { register } from "../controllers/auth.controller.js";
import { registerSchema } from "../schemas/authSchemas.js";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", (req, res) => {
  logger.info("Login route hit: ", { body: req.body });
  res.json({ message: "good response" });
});

router.get("/refresh", (req, res) => {
  logger.info("Refresh route hit");
  res.json({ message: "good response" });
});

export default router;
