# Gontobbo - Claude Project Context

## Project Overview

**Gontobbo** is a travel booking application with a multi-platform architecture:

- **Mobile App**: React Native + Expo (iOS/Android)
- **Backend**: Node.js + Express + Prisma + PostgreSQL
- **Admin Panel**: React-based admin dashboard
- **Monorepo**: Turborepo with Yarn workspaces

## Tech Stack

| Layer    | Technology                                 |
| -------- | ------------------------------------------ |
| Mobile   | React Native 0.74, Expo SDK 51, TypeScript |
| Backend  | Node.js, Express, Prisma ORM               |
| Database | PostgreSQL with vector extension           |
| State    | Redux Toolkit, XState                      |
| Styling  | Restyle, Moti animations                   |
| Auth     | JWT, Google Sign-In, Apple Sign-In         |
| Maps     | React Native Maps                          |
| AI       | Gemini API integration                     |

## Architecture

```
apps/
├── mobile/          # React Native app (Expo)
├── backend/         # Express API server
└── admin/           # Admin dashboard

packages/
└── shared/          # Shared utilities and types
```

## Key Conventions

### Mobile

- Navigation: Stack + Bottom Tabs + Drawer
- State: Redux for global, XState for complex flows
- Localization: i18next with EN/bn support
- Images: Centralized in theme/images.ts

### Backend

- Layered: controllers → services → repositories
- Auth: JWT access + refresh tokens
- Error handling: AppError class with operational flag
- Validation: Zod schemas

### Database

- Prisma schema at `apps/backend/prisma/schema.prisma`
- Vector extension for AI features
- Seed data in `apps/backend/prisma/seed.ts`

## Development Commands

```bash
# Start everything
yarn dev

# Mobile only
yarn dev:mobile    # Metro bundler
yarn ios           # iOS simulator
yarn android       # Android emulator

# Backend only
yarn dev:backend   # Express server with hot reload
yarn backend:setup # Clean setup (Docker + DB)

# Admin
yarn admin:dev
```

## Environment Setup

1. Copy `.env.example` to `.env` in each app
2. Configure `DATABASE_URL` for PostgreSQL
3. Set up Google/Apple OAuth credentials
4. Configure Gemini API key

## Testing

```bash
yarn test          # Run all tests
yarn lint          # ESLint check
yarn format        # Prettier formatting
```

## CI/CD

- **GitHub Actions**: Lint, test, type check
- **EAS Workflows**: Mobile builds (dev/staging/production)
- **Backend**: Deploy on push to main (configure your platform)

## Critical Rules

1. **Always use `yarn`** - no npm
2. **Mobile images** - add to theme/images.ts, use `@/assets/`
3. **Backend errors** - use `AppError` class, never throw raw errors
4. **API calls** - use RTK Query with proper tags for caching
5. **Database** - run migrations after schema changes
6. **Type safety** - strict TypeScript, no `any`

## Gotchas

- Mobile uses React Native 0.74 (not latest)
- Backend requires PostgreSQL vector extension
- EAS builds need proper credentials setup
- `.env` files should NOT have quotes around values
