# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy root package.json and package-lock.json
COPY package.json package-lock.json ./

# Copy packages
COPY packages/db packages/db
COPY packages/api packages/api

# Install dependencies using npm workspaces
RUN npm install --workspaces

# Build the api package
RUN npm run build -w @repo/api

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/packages/api/dist ./dist
COPY --from=builder /app/packages/api/package.json ./package.json

# Copy production node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/api/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 4000

# Start the app
CMD ["node", "dist/index.js"]
