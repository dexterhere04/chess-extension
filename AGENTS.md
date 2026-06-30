# AGENTS.md — Repo instructions for AI coding agents

Purpose
- Short, actionable guidelines to help AI agents be productive in this repository.

How to run the backend (quick)
- Install: `cd backend && pnpm install` (this repo uses `pnpm` — see `backend/package.json`).
- Development: `cd backend && pnpm run dev` (runs `tsx watch src/index.ts`).
- Build: `cd backend && pnpm run build` (runs `tsc`).
- Start (production): `cd backend && pnpm run start` (runs `node dist/index.js`).

Key notes for agents
- Language & runtime: Node.js + TypeScript using ESM (`type": "module"` in `backend/package.json`).
- Package manager: `pnpm` (project lists `pnpm` in `packageManager`).
- Dev tools: `tsx` for running TypeScript in dev and `tsc` for build.
- Docker / compose: repository contains `docker-compose.yml` and `livekit.yaml` — check them before suggesting environment changes.

Important files
- Backend package and scripts: [backend/package.json](backend/package.json)
- Backend source entry: [backend/src/index.ts](backend/src/index.ts)
- Project compose: [docker-compose.yml](docker-compose.yml)

Agent guidance (minimal by default)
- Prefer linking to existing docs rather than copying them.
- Keep changes small and targeted; run `pnpm run build` and `pnpm run dev` to validate TypeScript changes.
- If adding CI or formatting rules, propose them first in a PR description.

Suggested next customizations
- Add a `.github/copilot-instructions.md` or expand this file if you want repo-specific agent rules per area (frontend/backend/tests).
