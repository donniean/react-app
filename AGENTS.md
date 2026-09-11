# AGENTS.md

## Scope

- Repository purpose, current directories, and common commands are documented in [README.md](README.md) as the single source of truth; this file contains only repository constraints for coding agents.
- Use [docs/conventions.md](docs/conventions.md) as the single source of truth for source structure, naming, dependency direction, and implementation conventions.
- Do not introduce server-side rendering (SSR), React Server Components, API routes, or full-stack framework conventions unless the user explicitly changes the goal.
- Do not add a backend service implementation to this repository unless the user explicitly asks for one.
- Projects created from this template are not limited to personal use; do not treat this repository's personal-use context as a fixed downstream project constraint.
- When this template is used to create an actual project, the sample pages, placeholder request wrapper, default logo, and sample copy may be replaced, trimmed, or deleted according to the product goal. See [README.md](README.md) for the specific entry points.

## Conventions

- Before changing code, read [docs/conventions.md](docs/conventions.md).
- Before changing TypeScript or JavaScript imports, identify the relevant `tsconfig.json` / `jsconfig.json` for the edited file and resolve its effective `compilerOptions`, including any configured `paths`, by following the `extends` chain when present; in solution-style TypeScript setups, use `references` only to find the leaf project config. Use relative imports within the same feature/module/package, and prefer existing configured path aliases for established cross-boundary imports, but only when all relevant tooling for that code path supports the same alias resolution.
- When changes affect extracted text, translation keys, or locale resources, update the affected resources and types, run `pnpm run lint:i18n`, and inspect the generated diff. `pnpm run i18n:extract` includes type generation; use `pnpm run i18n:types` when only types need regeneration.

## Verification

- For Markdown-only edits, run Oxfmt, Markdownlint, AutoCorrect, and CSpell on changed files. Use `pnpm exec` with file paths when scripts hardcode the repository scope; retain tool configuration and scope fixes likewise.
- Validate behavior changes with relevant lint, type checks, and tests. Build when bundling, dependencies, generated routes, or build configuration are affected. Full lint, test, and build match PR CI; use them for cross-cutting changes or requested CI validation.
- Use a focused browser smoke test when feasible for changes to rendered UI, routing, language switching, or runtime asset and fallback behavior.
- After checks pass, continue to delivery; repeat or expand only for relevant edits, failures, or unresolved concerns.

## Docker

The following commands push images and require explicit user authorization for the target image. Reuse authorization already given for that operation:

```bash
pnpm run docker:build
pnpm run docker:build:multi
```

For Docker runtime, image tag, Node.js runtime, nginx fallback, or publishing changes, inspect the affected contract in [Dockerfile](Dockerfile), [nginx.conf](nginx.conf), [`.github/workflows/docker.yaml`](.github/workflows/docker.yaml), or [README.md](README.md#docker), following dependencies relevant to the change.
