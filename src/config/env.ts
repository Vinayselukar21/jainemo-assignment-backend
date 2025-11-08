import "dotenv/config";

const required = (v?: string, k?: string) => {
  if (!v) throw new Error(`Missing env ${k}`);
  return v;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 4000),
  MONGO_URI: required(process.env.MONGO_URI, "MONGO_URI"),
  JWT_ACCESS_SECRET: required(process.env.JWT_ACCESS_SECRET, "JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: required(process.env.JWT_REFRESH_SECRET, "JWT_REFRESH_SECRET"),
  ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL ?? "15m",
  REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL ?? "7d",
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "*",
};
