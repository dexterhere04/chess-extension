# Gambit Voice

<p align="center">
  <img src="extension/public/icons/logo1.png" alt="Gambit Voice logo" width="256" height="256">
</p>

<p align="center">
  <a href="https://github.com/anomalyco/GambitVoice"><img src="https://img.shields.io/badge/status-in%20development-yellow" alt="Development Status"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/language-TypeScript-3178C6" alt="TypeScript"></a>
  <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-10-F69220" alt="pnpm 10"></a>
  <a href="https://fastify.dev/"><img src="https://img.shields.io/badge/backend-Fastify-000000" alt="Fastify"></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/extension-React%2019-61DAFB" alt="React 19"></a>
  <a href="https://livekit.io/"><img src="https://img.shields.io/badge/webrtc-LiveKit-00E599" alt="LiveKit"></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/database-PostgreSQL-4169E1" alt="PostgreSQL"></a>
  <a href="https://redis.io/"><img src="https://img.shields.io/badge/cache-Redis-FF4438" alt="Redis"></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/containers-Docker-2496ED" alt="Docker"></a>
  <a href="https://github.com/anomalyco/GambitVoice/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"></a>
</p>

Real-time voice chat extension for Chess.com. Gambit Voice overlays a WebRTC-powered voice communication layer onto Chess.com games, allowing players to talk during matches via a browser extension backed by a Fastify server and LiveKit infrastructure.

<br>

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Architecture](#architecture)
- [Docker](#docker)
- [License](#license)

<br>

## Project Structure

```
gambitvoice/
├── backend/                   # Fastify API server (TypeScript, ESM)
│   ├── src/
│   │   └── index.ts           # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile             # Multi-stage production build
│   └── Dockerfile.dev         # Hot-reload development image
├── extension/                 # Chrome Extension V3 (React 19 + Vite)
│   ├── src/
│   │   ├── manifest.ts        # Extension manifest definition
│   │   ├── background.ts      # Service worker
│   │   ├── content.ts         # Chess.com content script
│   │   └── popup/             # React popup UI
│   │       ├── App.tsx
│   │       ├── main.tsx
│   │       └── styles.css
│   ├── public/
│   │   └── icons/             # Extension icons and logo
│   ├── popup.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── docker-compose.yml         # LiveKit + Redis + PostgreSQL + backend
├── livekit.yaml               # LiveKit server configuration
└── AGENTS.md                  # AI agent development guidelines
```

<br>

## Prerequisites

- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/) >= 10
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for infrastructure services)
- [Google Chrome](https://www.google.com/chrome/) (for extension development)

<br>

## Getting Started

### 1. Infrastructure (Docker)

Start LiveKit, Redis, and PostgreSQL:

```bash
docker compose up -d
```

This launches the services defined in `docker-compose.yml`: a Redis instance for LiveKit signaling, a LiveKit WebRTC server (port 7880), and a PostgreSQL 17 database.

### 2. Backend

```bash
cd backend
pnpm install
pnpm run dev
```

The Fastify server starts on `http://localhost:8080`.

### 3. Extension

```bash
cd extension
pnpm install
pnpm run dev
```

Vite builds the extension and watches for changes. Load the `extension/dist` directory as an unpacked extension via `chrome://extensions`.

<br>

## Development

| Command               | Description                                    |
|-----------------------|------------------------------------------------|
| `pnpm run dev`        | Start development server with hot reload       |
| `pnpm run build`      | Type-check and compile production bundle       |
| `pnpm run start`      | Run compiled production build                  |

<br>

## Architecture

- **Chrome Extension** -- Injects a content script into Chess.com pages and provides a popup UI for connection controls. Built with React 19 and TypeScript, bundled with Vite and `@crxjs/vite-plugin`.
- **Backend (Fastify)** -- Application API handling room management, authentication, and coordination between the extension and LiveKit.
- **LiveKit** -- Open-source WebRTC server for media relay, room signaling, and audio routing between peers.
- **PostgreSQL** -- Persistent storage for user sessions, game associations, and application state.
- **Redis** -- LiveKit dependency for signaling state and message routing.

<br>

## Docker

Production build:

```bash
docker compose build backend
docker compose up -d backend
```

The multi-stage `Dockerfile` produces a slim runtime image containing only production dependencies. `Dockerfile.dev` enables hot-reload during active development.

<br>

## License
[License: GPL v3](LICENCE)

