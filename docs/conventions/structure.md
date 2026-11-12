# Structure and Dependencies

Read the [scope, normative keywords, and shared principles](README.md) before applying these conventions.

## Project Structure

### Root

The project root MAY contain these directories:

- `config/`: split project-level tool configuration. Do not create unless needed.
- `docs/`: project documentation.
- `e2e/`: end-to-end tests. Create only when Playwright or a similar tool is enabled.
- `public/`: static assets that are not processed by the bundler.
- `scripts/`: project maintenance, code generation, checks, and release scripts. Do not create unless needed.
- `src/`: application source code.

### Source

`src/` MAY contain these directories and entry files:

- `@types/`: global type declarations and tool-generated declarations.
- `api/`: API requests, queries, mutations, and operations shared across features.
- `app/`: application composition layer.
- `assets/`: application-level bundled assets.
- `components/`: shared UI components reused across features.
- `config/`: runtime configuration, environment parsing, and application-level configuration objects.
- `features/`: primary home for business features.
- `helpers/`: project-specific pure helper functions.
- `hooks/`: shared React hooks reused across features.
- `lib/`: third-party library adapters, configured clients, and infrastructure wrappers.
- `locales/`: i18n resource files.
- `mocks/`: mock handlers, mock data, and mock utilities.
- `models/`: shared frontend data models and boundary transformations.
- `routes/`: route-level components.
- `services/`: explicit application orchestration services. Do not create unless needed.
- `stores/`: shared client state stores. Create only when the corresponding state management approach is introduced.
- `styles/`: global style entry points and global CSS.
- `testing/`: test utilities, custom render helpers, and test setup helpers.
- `utils/`: generic utility functions that can be reused across projects.
- `index.tsx`: React bootstrap entry point.
- `routeTree.gen.ts`: TanStack Router generated application route tree.

## Features

`features/*/` contains code private to a specific business feature. Directories inside a feature reuse the responsibilities of the same directory names under [`src/`](#source), but their scope is limited to that feature.

A feature MAY contain `api/`, `assets/`, `components/`, `helpers/`, `hooks/`, `models/`, `services/`, `stores/`, `styles/`, and `utils/`.

- `features/*/api/` and `features/*/models/` MUST serve only the current feature.
- Code reused across features SHOULD be promoted to a shared module, or composed at the app / routes layer.

## App and Routes

- `src/index.tsx` SHOULD only handle global side-effect imports and React root creation.
- `src/app/` SHOULD own app composition, global providers, and global boundaries.
- `src/routes/` SHOULD own route-level composition, route params, and route-level loading / error states.
- Files and directories that define routes MUST follow the [TanStack Router file naming conventions](https://tanstack.com/router/latest/docs/routing/file-naming-conventions), because their names determine route paths and hierarchy.
- The Vite plugin generates `src/routeTree.gen.ts` during development and builds. This file MUST be committed and MUST NOT be edited manually.
- app / routes MAY compose features and shared code.
- app / routes MUST NOT be the home for business resource models, feature-specific components, API request functions, or general-purpose UI components.

## Imports

- Direct imports SHOULD be the baseline import style: import from the actual defining file or from an explicit module entry, not from a directory-level barrel file.
- Feature-level `index.ts` public APIs and global barrel files SHOULD NOT be the baseline.
- Small module entries MAY be used, but they must represent real module boundaries.
- Imports MUST follow the [shared dependency principles](README.md#principles).
- Type-only imports MUST use top-level `import type` when the imported module provides only types to the current file.
- Mixed value/type imports from the same module SHOULD use inline `type` specifiers, for example `import { type Value, value } from './value';`.
- Type-only exports and re-exports MUST use top-level `export type`.
- Mixed value/type exports and re-exports SHOULD use inline `type` specifiers, for example `export { type Value, value } from './value';`.
- Named import specifiers SHOULD be sorted automatically by Oxlint; import declaration ordering is handled by Oxfmt.
- Application source SHOULD use named exports. Default exports are allowed for tooling configuration, generated files, and external framework or library conventions.
- Implementation modules SHOULD export at declaration sites. Explicit export lists SHOULD be reserved for module entry points or intentional public API selection.
