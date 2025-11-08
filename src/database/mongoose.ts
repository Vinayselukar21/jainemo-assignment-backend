import mongoose from "mongoose";
import { env } from "../config/env";
import { logger } from "../logger/logger";

export const connectMongo = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGO_URI);
  logger.info("Mongo connected");
};
