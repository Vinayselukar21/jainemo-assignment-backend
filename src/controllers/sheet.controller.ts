import { Request, Response } from "express";
import { SheetService } from "../services/sheet.service";

export class SheetController {
  static list = async (_req: Request, res: Response) => {
    const items = await SheetService.list();
    res.json(items);
  };
}
