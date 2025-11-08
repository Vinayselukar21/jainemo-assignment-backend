import app from "./app";
import { connectMongo } from "./database/mongoose";
import { env } from "./config/env";
import { logger } from "./logger/logger";

connectMongo().then(() => {
  app.listen(env.PORT, () => logger.info(`API on :${env.PORT}`));
});
