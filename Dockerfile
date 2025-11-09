# Stage 1 — Build the app
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy TypeScript source code and build it
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 2 — Run the app
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from builder stage
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Copy .env if you want it inside container (optional)
# COPY .env .env

# Expose the port your app runs on
EXPOSE 4000

# Default environment variables (can be overridden by --env-file)
ENV NODE_ENV=development \
    PORT=4000 \
    MONGO_URI="mongodb+srv://vselukar210l@dsasheetcluster.gj3flch.mongodb.net/?appName=DSASheetCluster" \
    JWT_ACCESS_SECRET="change_me_access" \
    JWT_REFRESH_SECRET="change_me_refresh" \
    ACCESS_TOKEN_TTL="15m" \
    REFRESH_TOKEN_TTL="7d" \
    CORS_ORIGIN="http://localhost:8080"

# Start the app
CMD ["node", "dist/server.js"]
