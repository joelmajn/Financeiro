# Financeiro Monorepo Layout

This repository now separates the Expo frontend from any backend work so you can download or deploy only the web client when needed (for example, on Vercel).

## Structure
- `frontend/`: React Native + Expo application (web compatible) with all source, configs, and scripts.
- `backend/`: Placeholder for future backend services. No server code is present yet.

## Running the frontend
1. `cd frontend`
2. Install dependencies: `npm install`
3. Start the web/dev server:
   - Web (Vercel/local browser): `npm run web`
   - Native preview: `npm run start`

The existing `.replit` workflow and build script are configured to operate from the `frontend/` directory.

## Deploying the frontend to Vercel
Point Vercel to the `frontend/` directory as the project root. Use the default `npm install` install command and `npm run web` as the dev command (or adapt to your preferred Expo web build pipeline). No backend is required.
