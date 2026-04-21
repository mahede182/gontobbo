# Stage 1: Base with security updates
FROM node:20-slim AS base
RUN apt-get update \
    && apt-get install -y --no-install-recommends dumb-init openssl \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable
WORKDIR /app

# Stage 2: Dependencies (cached layer)
FROM base AS dependencies
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn* ./.yarn/
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/
RUN yarn install

# Stage 3: Build
FROM dependencies AS builder
COPY . .
RUN yarn turbo build --filter=@gontobbo/backend

# Stage 4: Production runner (minimal, secure)
FROM base AS runner
ENV NODE_ENV=production \
    PORT=10000

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 gontobbo

WORKDIR /app

# Copy only production artifacts
COPY --from=builder --chown=gontobbo:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=gontobbo:nodejs /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder --chown=gontobbo:nodejs /app/apps/backend/package.json ./apps/backend/
COPY --from=builder --chown=gontobbo:nodejs /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=builder --chown=gontobbo:nodejs /app/package.json ./

# Generate Prisma Client (runtime requirement)
RUN npx prisma generate --schema=apps/backend/prisma/schema.prisma

USER gontobbo

EXPOSE 10000

# dumb-init handles PID 1 and signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/backend/dist/index.js"]