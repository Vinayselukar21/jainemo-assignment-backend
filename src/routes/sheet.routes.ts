import { Router } from "express";
import { SheetController } from "../controllers/sheet.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const r = Router();
r.get("/", requireAuth, SheetController.list);
export default r;
