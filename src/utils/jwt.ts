import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export const signAccess = (payload: object) =>
  jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.ACCESS_TOKEN_TTL } as SignOptions);

export const signRefresh = (payload: object) =>
  jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.REFRESH_TOKEN_TTL } as SignOptions);

export const verifyAccess = (token: string) =>
  jwt.verify(token, env.JWT_ACCESS_SECRET);

export const verifyRefresh = (token: string) =>
  jwt.verify(token, env.JWT_REFRESH_SECRET);
