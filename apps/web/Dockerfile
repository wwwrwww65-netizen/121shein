# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package.json and package-lock.json
COPY package.json package-lock.json ./

# Copy packages
COPY packages/ui packages/ui
COPY packages/db packages/db
COPY packages/api packages/api
COPY apps/web apps/web

# Install dependencies using npm workspaces
RUN npm install --workspaces

# Build the web app
RUN npm run build -w web

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Set up a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules

# Copy Next.js standalone output
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["node", "apps/web/server.js"]
