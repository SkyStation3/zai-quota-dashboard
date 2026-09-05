# Stage 1: Build static assets
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install build dependencies
RUN npm ci

# Copy application sources
COPY server.js tailwind.config.js ./
COPY public ./public

# Compile JSX and Tailwind CSS
RUN npm run build

# Stage 2: Production runtime (zero npm dependencies)
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

# Copy runtime files from builder
COPY --from=builder /app/server.js ./
COPY --from=builder /app/public ./public

# Ensure the node user owns the working directory for history.json persistence
RUN chown -R node:node /app

# Run as non-privileged user
USER node

EXPOSE 3000

# Built-in health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
