# Gambit Voice

[![Development Status](https://img.shields.io/badge/status-in%20development-yellow)](https://github.com/anomalyco/GambitVoice)

![Extension Icon](extension/public/icons/icon128.png)

Real-time voice chat extension for Chess.com. Gambit Voice overlays a WebRTC-powered voice communication layer onto Chess.com games, allowing players to talk during matches via a browser extension backed by a Fastify server and LiveKit infrastructure.

## Project Structure

```
gambitvoice/
├── backend/                  # Fastify API server (TypeScript, ESM)
│   ├── src/index.ts          # Server entry point
│   ├── package.json          # pnpm-managed dependencies
│   ├── tsconfig.json
│   ├── Dockerfile            # Multi-stage production build
│   └── Dockerfile.dev        # Hot-reload development image
├── extension/                # Chrome Extension V3 (React 19 + Vite)
│   ├── src/
│   │   ├── manifest.ts       # Extension manifest definition
│   │   ├── background.ts     # Service worker
│   │   ├── content.ts        # Chess.com content script
│   │   └── popup/            # React popup UI
│   │       ├── App.tsx
│   │       ├── main.tsx
│   │       └── styles.css
│   ├── public/icons/         # Extension icons (16, 32, 48, 128)
│   ├── popup.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── docker-compose.yml        # LiveKit + Redis + PostgreSQL + backend
├── livekit.yaml              # LiveKit server configuration
└── AGENTS.md                 # AI agent guidelines
```

## Prerequisites

- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/) >= 10
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for infrastructure)
- [Chrome](https://www.google.com/chrome/) (for extension development)

## Getting Started

### 1. Infrastructure (Docker)

Start LiveKit, Redis, and PostgreSQL:

```bash
docker compose up -d
```

This launches the services defined in `docker-compose.yml`: a Redis instance for LiveKit signaling, a LiveKit WebRTC server on port 7880, and a PostgreSQL 17 database.

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

Vite builds the extension and watches for changes. Load the `extension/dist` directory as an unpacked extension in Chrome via `chrome://extensions`.

## Development

| Command               | Description                                    |
|-----------------------|------------------------------------------------|
| `pnpm run dev`        | Start development server with hot reload       |
| `pnpm run build`      | Type-check and compile production bundle       |
| `pnpm run start`      | Run compiled production build                  |

## Architecture

- **Chrome Extension** -- Injects a content script into `chess.com` pages and provides a popup UI for connection controls. Built with React 19, TypeScript, and Vite using the `@crxjs/vite-plugin`.
- **Backend (Fastify)** -- Serves as the application API, handling room management, authentication, and coordination between the extension and LiveKit.
- **LiveKit** -- Open-source WebRTC server responsible for media relay, room signaling, and audio routing between connected peers.
- **PostgreSQL** -- Persistent storage for user sessions, game associations, and application state.
- **Redis** -- LiveKit dependency used for signaling state and message routing.

## Docker

Production build:

```bash
docker compose build backend
docker compose up -d backend
```

A multi-stage `Dockerfile` produces a slim runtime image with only production dependencies. A separate `Dockerfile.dev` enables hot-reload during development.

## License

MIT
