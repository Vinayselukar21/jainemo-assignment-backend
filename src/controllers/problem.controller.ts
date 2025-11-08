import { Request, Response } from "express";
import { ProblemService } from "../services/problem.service";

export class ProblemController {
  static listByTopic = async (req: Request, res: Response) => {
    const items = await ProblemService.listByTopic(req.params.topicId);
    res.json(items);
  };
}
