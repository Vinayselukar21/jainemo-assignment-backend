import { Request, Response } from "express";
import { ProgressService } from "../services/progress.service";

export class ProgressController {
  static upsert = async (req: Request, res: Response) => {
    const userId = (req as any).user.sub as string;
    const { problemId, state } = req.body;
    const data = await ProgressService.upsert({ userId, problemId, state });
    res.json(data);
  };
}
