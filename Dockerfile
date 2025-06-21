# syntax=docker/dockerfile:1

FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build
RUN npm run build

# Use standalone output
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]  # Or change to ["node", "index.js"] if custom entry
