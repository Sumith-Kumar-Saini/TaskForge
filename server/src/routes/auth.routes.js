import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { login, refresh, register } from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
// import logger from "../utils/winstonLogger.js";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/refresh", refresh);

router.get("/logout", async (req, res) => {
  res.clearCookie("refreshToken");
  res.easyResponse({
    statusCode: 200,
    message: "User Logout successfully",
  });
});

export default router;
