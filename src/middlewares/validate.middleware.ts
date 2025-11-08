import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({ ...req.body, ...req.params, ...req.query });
    if (!result.success) return res.status(400).json({ errors: result.error.flatten() });
    next();
  };
