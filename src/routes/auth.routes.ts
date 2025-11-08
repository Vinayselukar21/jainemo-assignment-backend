import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { requireAuth } from "../middlewares/auth.middleware";

const r = Router();
r.post("/register", validate(registerSchema), AuthController.register);
r.post("/login", validate(loginSchema), AuthController.login);
r.post("/refresh", AuthController.refresh);
r.get("/me", requireAuth, AuthController.me);
r.post("/logout", requireAuth, AuthController.logout);
export default r;
