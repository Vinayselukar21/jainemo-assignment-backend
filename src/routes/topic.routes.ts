import { Router } from "express";
import { TopicController } from "../controllers/topic.controller";
import { validate } from "../middlewares/validate.middleware";
import { createTopicSchema } from "../schemas/topic.schema";
import { requireAdmin, requireAuth } from "../middlewares/auth.middleware";

const r = Router();
r.get("/sheet/:sheetId", requireAuth, TopicController.listBySheet);
export default r;
