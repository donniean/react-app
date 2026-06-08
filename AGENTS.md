# AGENTS.md

## Scope

- Repository purpose, current directories, and common commands are documented in [README.md](README.md) as the single source of truth; this file contains only repository constraints for coding agents.
- Use [docs/conventions.md](docs/conventions.md) as the single source of truth for project structure, routing, i18n, styling, and asset conventions.
- Do not introduce server-side rendering (SSR), React Server Components, API routes, or full-stack framework conventions unless the user explicitly changes the goal.
- Do not add a backend service implementation to this repository unless the user explicitly asks for one.
- Projects created from this template are not limited to personal use; do not treat this repository's personal-use context as a fixed downstream project constraint.
- When this template is used to create an actual project, the sample pages, placeholder request wrapper, default logo, and sample copy may be replaced, trimmed, or deleted according to the product goal. See [README.md](README.md) for the specific entry points.

## Conventions

- Before changing code, read [docs/conventions.md](docs/conventions.md).
- Before changing TypeScript or JavaScript imports, identify the relevant `tsconfig.json` / `jsconfig.json` for the edited file and resolve its effective `compilerOptions`, including any configured `paths`, by following the `extends` chain when present; in solution-style TypeScript setups, use `references` only to find the leaf project config. Use relative imports within the same feature/module/package, and prefer existing configured path aliases for established cross-boundary imports, but only when all relevant tooling for that code path supports the same alias resolution.
- After changing user-facing text, translation keys, or locale resources, run i18n extraction, type-generation, and lint checks, then inspect the generated output under [`src/@types/`](src/@types/).

## Verification

Run checks relevant to the change scope:

```bash
pnpm run lint
pnpm run test
pnpm run build
```

Use smaller checks by file type when possible:

```bash
pnpm run lint:md
pnpm run lint:js
pnpm run lint:types
pnpm run lint:css
pnpm run lint:html
pnpm run lint:i18n
pnpm run lint:format
pnpm run lint:spell
pnpm run lint:text
pnpm run lint:package-json
```

If check results can be fixed automatically, prefer the smallest relevant `fix` command:

- `pnpm run lint:md:fix`
- `pnpm run lint:js:fix`
- `pnpm run lint:css:fix`
- `pnpm run lint:format:fix`
- `pnpm run lint:text:fix`
- `pnpm run lint:package-json:fix`

For changes involving user-facing UI, routing, i18n, Vite config, Docker, or nginx, run a local browser smoke test when feasible.

CI currently runs lint, test, and build on pull requests to `main`.

## Docker

Without explicit user confirmation, do not run commands that push images:

```bash
pnpm run docker:build
pnpm run docker:build:multi
```

For changes involving Docker runtime behavior, image tags, Node.js runtime, nginx fallback, or publishing behavior, inspect the relevant files and workflow before editing: [Dockerfile](Dockerfile), [nginx.conf](nginx.conf), [`.github/workflows/docker.yaml`](.github/workflows/docker.yaml), and [README.md](README.md#docker).
