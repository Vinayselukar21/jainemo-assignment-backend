import { Request, Response } from "express";
import { TopicService } from "../services/topic.service";

export class TopicController {
  static listBySheet = async (req: Request, res: Response) => {
    const items = await TopicService.listBySheet(req.params.sheetId);
    res.json(items);
  };
}
