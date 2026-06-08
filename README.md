# react-app

[![License: MIT](https://img.shields.io/github/license/donniean/react-app)](https://github.com/donniean/react-app/blob/main/LICENSE) [![CI](https://github.com/donniean/react-app/actions/workflows/ci.yaml/badge.svg)](https://github.com/donniean/react-app/actions/workflows/ci.yaml)

A public template repository for personal use. It provides reusable React starters, templates, examples, demos, and scaffolds. Projects created from this template are not limited to personal use and may be adapted for individual, team, or company use.

## Suitable For

- single-page application (SPA)
- client-side rendering (CSR)
- admin dashboards, panels, or consoles
- separately deployed frontend applications backed by external APIs or independent backend services
- custom design systems

## Requirements

- The Node.js version is defined by [`.nvmrc`](.nvmrc) and `engines.node` in [`package.json`](package.json).
- The pnpm version is defined by `packageManager` and `engines.pnpm` in [`package.json`](package.json).
- Use `pnpm`. `preinstall` enforces this with `only-allow`.

## Install

```bash
pnpm install
```

## Development

```bash
pnpm run dev
```

The Vite dev server uses port `3000` by default.

## Usage

After creating a project from this template, adjust these files for the actual product:

- [`package.json`](package.json): Package name, metadata, and scripts.
- [`.env`](.env), [`.env.example`](.env.example), and `.env*`: Vite-exposed environment variables required by the project.
- [`index.html`](index.html): Document title, metadata, and root document content.
- [`src/@types/vite-env.d.ts`](src/@types/vite-env.d.ts): Vite environment variable types and [TypeScript IntelliSense](https://vite.dev/guide/env-and-mode#intellisense-for-typescript).

Replace, trim, or delete the sample pages, default logo, placeholder request wrapper, and sample copy under `src/` according to the product goal. See [docs/conventions.md](docs/conventions.md) for structure and implementation conventions.

### Environment Variables

Create a local override file from [`.env.example`](.env.example):

```bash
cp .env.example .env.local
```

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:3001
```

When `VITE_API_BASE_URL` is set, the Vite dev server and Vite preview server proxy `/api` to that address.

## Build

```bash
pnpm run build
```

## Preview

```bash
pnpm run preview
```

## Lint & Format

```bash
pnpm run lint
pnpm run lint:fix
```

## Testing

```bash
pnpm run test
pnpm run test:coverage
pnpm run test:watch
pnpm run test:ui
```

## Conventions

Project structure, routing, i18n, styling, and asset conventions are documented in [docs/conventions.md](docs/conventions.md).

## Docker

Run a built image locally:

```bash
pnpm run docker:run
```

`docker:build` and `docker:build:multi` push images to Docker Hub. Before running them, confirm the target image, credentials, and publishing intent.

[`docker.yaml`](.github/workflows/docker.yaml) builds and pushes the Docker image on pushes to `main`, tag pushes, or manual workflow dispatch.

## References

- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [React + TypeScript + Vite template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)

## License

[MIT](LICENSE)
