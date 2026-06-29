# syntax=docker/dockerfile:1

############################
# Base
############################
FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm@10

############################
# Dependencies
############################
FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

############################
# Build
############################
FROM deps AS build

WORKDIR /app

COPY . .

RUN pnpm build

RUN pnpm prune --prod

############################
# Runtime
############################
FROM node:22-slim

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm@10

WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

RUN useradd -r -u 1001 nodejs

USER nodejs

EXPOSE 8080

CMD ["node", "dist/index.js"]