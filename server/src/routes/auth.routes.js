import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
  login,
  logout,
  refresh,
  register,
} from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/refresh", refresh);

router.get("/logout", logout);

export default router;
