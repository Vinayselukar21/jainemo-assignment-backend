# Multi-stage build for production optimization

# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy TypeScript config and source code
COPY tsconfig.json ./
COPY src ./src
COPY scripts ./scripts

# Build TypeScript to JavaScript and fix imports
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port (default 4000, can be overridden via env)
EXPOSE 4000

# Start the application
CMD ["node", "dist/server.js"]
