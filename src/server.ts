import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { router } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { rateLimiter } from "./middlewares/rateLimit.middleware";
import { connectMongo } from "./database/mongoose";
import { logger } from "./logger/logger";

// --- Initialize express app ---
const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(rateLimiter);

app.use("/api", router);
app.use(errorMiddleware);

// --- Connect DB & start server ---
connectMongo()
  .then(() => {
    app.listen(env.PORT, () => logger.info(`✅ API running on port: ${env.PORT}`));
  })
  .catch((err) => {
    logger.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
