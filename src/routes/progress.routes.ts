import { Router } from "express";
import { ProgressController } from "../controllers/progress.controller";
import { upsertProgressSchema } from "../schemas/progress.schema";
import { validate } from "../middlewares/validate.middleware";
import { requireAuth } from "../middlewares/auth.middleware";

const r = Router();
r.post("/", requireAuth, validate(upsertProgressSchema), ProgressController.upsert);
export default r;
