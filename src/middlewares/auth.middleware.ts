import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthUser { sub: string; role: "student"|"admin"; email: string; }

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization?.split(" ")[1];
  const token = bearer || req.cookies?.accessToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthUser;
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requireAdmin = (_req: Request, res: Response, next: NextFunction) => {
  const user = (_req as any).user as AuthUser | undefined;
  if (!user || user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  next();
};
