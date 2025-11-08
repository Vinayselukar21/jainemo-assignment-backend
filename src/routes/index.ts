import { Router } from "express";
import auth from "./auth.routes";
import progress from "./progress.routes";
import sheet from "./sheet.routes";
import topic from "./topic.routes";

export const router = Router();
router.use("/auth", auth);
router.use("/topics", topic);
router.use("/progress", progress);
router.use("/sheets", sheet);