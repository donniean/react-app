# Conventions

This document defines frontend engineering conventions that affect long-term maintainability: code boundaries, dependency direction, directory structure, naming patterns, and implementation conventions.

When this document conflicts with existing code, tool configuration, generated files, design sources, or other existing facts, the existing facts MUST take precedence. Treat such conflicts as documentation drift or a migration that still needs explicit confirmation. Existing implementations MUST NOT be changed only to match this document unless that is the explicit task.

The directories listed in this document are allowed structures, not required structures. Directories MUST be created only when there is a real need. Directories not listed here MAY be created when they have clear responsibilities and are consistent with the relevant framework, tooling, or common community practice.

When this document does not define a convention, code SHOULD follow the established pattern in nearby code. If no stable local pattern exists, code SHOULD follow the official documentation and common practice of the relevant framework, tool, or library.

## Normative Keywords

The keywords `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, and `MAY` in this document are to be interpreted as described in [BCP 14](https://www.rfc-editor.org/info/bcp14) when, and only when, they appear in uppercase.

- `MUST`: an absolute requirement.
- `MUST NOT`: an absolute prohibition.
- `SHOULD`: a recommended practice; deviations require a clear reason.
- `SHOULD NOT`: a discouraged practice; deviations require a clear reason.
- `MAY`: an optional practice.

## Principles

- Shared code and feature-specific code MUST be separated.
- Code flow MUST be unidirectional: import dependencies MUST point from application composition toward more shared code, for example app / routes -> features -> shared code.
- Features MUST NOT import directly from other features. Cross-feature composition SHOULD happen in app / routes, or through an appropriate shared module.
- Shared code MUST NOT depend on app, routes, or features.
- Code with a clear owner SHOULD stay close to that owner. Code SHOULD be extracted as shared code only when it is reused across boundaries and has stable semantics.
- Feature-specific code SHOULD live inside the owning feature.
- Colocation MUST NOT break the dependency direction or feature isolation.
- Directories MUST represent real responsibilities, real code, and real maintenance boundaries.
- Projects MUST NOT mechanically create every possible directory for each feature.

## Project Structure

### Root

The project root MAY contain these directories:

```text
.
├── config/
├── docs/
├── e2e/
├── public/
├── scripts/
└── src/
```

- `config/`: split project-level tool configuration. Do not create unless needed.
- `docs/`: project documentation.
- `e2e/`: end-to-end tests. Create only when Playwright or a similar tool is enabled.
- `public/`: static assets that are not processed by the bundler.
- `scripts/`: project maintenance, code generation, checks, and release scripts. Do not create unless needed.
- `src/`: application source code.

### Source

`src/` MAY contain these directories and entry files:

```text
src/
├── @types/
├── api/
├── app/
├── assets/
├── components/
├── config/
├── features/
├── helpers/
├── hooks/
├── lib/
├── locales/
├── mocks/
├── models/
├── routes/
├── services/
├── stores/
├── styles/
├── testing/
├── utils/
└── index.tsx
```

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

## Naming

### Folders and Files

- Directory names MUST use `kebab-case` and, unless explicitly exempted, MUST NOT use uppercase letters.
- The main name of a file SHOULD use `kebab-case`, for example `user-form.tsx`.
- File names MAY use `.` to separate the main name from the file responsibility, for example `users.types.ts`, `users.queries.ts`, `user-list.helpers.ts`, `user-form.test.tsx`, and `user-form.module.css`.
- React component and hook directory names and file names follow the same rule, and MUST NOT use `PascalCase`.
- Tool-mandated paths, locale tags, root-level convention files, and generated files MAY follow their own established names.

### Singular and Plural Names

- Grouping directories and model / API file subjects for countable business resources SHOULD use plural names, for example `users` and `products`.
- Uncountable nouns, capabilities, and domain concepts SHOULD use their natural form, for example `auth`, `metadata`, and `traffic`.

### Semantic Names

- Code symbols directly related to form values SHOULD keep the `FormValues` / `formValues` / `FORM_VALUES` semantic segment, with casing adjusted to the symbol type and the existing naming style. Examples include `UserFormValues`, `userFormValues`, and `userFormValuesSchema`.
- List items MAY use `<ResourceSingular>ListItem` only when the list item shape is actually different from the detail shape, for example `UserListItem` and `userListItem`.

## Features

`features/*/` contains code private to a specific business feature. Directories inside a feature reuse the responsibilities of the same directory names under `src/`, but their scope is limited to that feature.

A feature MAY contain these directories:

```text
features/*/
├── api/
├── assets/
├── components/
├── helpers/
├── hooks/
├── models/
├── services/
├── stores/
├── styles/
└── utils/
```

- `features/*/api/` and `features/*/models/` MUST serve only the current feature.
- Code reused across features SHOULD be promoted to a shared module, or composed at the app / routes layer.

## App and Routes

- `src/index.tsx` SHOULD only handle global side-effect imports and React root creation.
- `src/app/` SHOULD own app composition, global providers, and global boundaries.
- `src/routes/` SHOULD own route-level composition, route params, and route-level loading / error states.
- app / routes MAY compose features and shared code.
- app / routes MUST NOT be the home for business resource models, feature-specific components, API request functions, or general-purpose UI components.

## Assets

- SVGs used as React components SHOULD use `?react` imports.
- SVGs, images, and other assets used as URLs SHOULD use regular imports.

## Components

`src/components/` contains UI components reused across features and does not depend on feature internals.

```text
components/
├── errors/
├── layouts/
└── ui/
```

- `business/` MAY be created when there are shared business components with stable semantics that are reused across multiple features.
- `errors/`: shared error boundary fallbacks and error display components.
- `layouts/`: layout components reused across routes or features.
- `ui/`: design system primitives and shared UI components with low business semantics.

## Models

`models/` contains pure model code for business resources, API data, form data, runtime validation, and data transformations.

Common file suffixes:

- `<subject>.types.ts`: TypeScript types, interfaces, DTOs, and form values.
- `<subject>.schemas.ts`: runtime validation schemas.
- `<subject>.constants.ts`: constants, options, and mapping tables.
- `<subject>.mappers.ts`: pure transformation functions between API DTOs, frontend models, and form values.

Other file suffixes MAY be used when needed:

- `<subject>.guards.ts`: type guards or narrowing functions.
- `<subject>.fixtures.ts`: test or development fixtures.
- `<subject>.test.ts`: colocated unit tests.

### Constants

- Stable primitive constants SHOULD use `UPPER_SNAKE_CASE`.
- Constants that need to preserve literal types SHOULD use `as const`.
- When an object shape must be checked while preserving specific inference, `satisfies` SHOULD be used.
- Under the current TypeScript configuration, application source MUST NOT use TypeScript `enum`. Enum-like runtime values SHOULD use `as const` objects / arrays plus union types.

### Schemas

- Schema values SHOULD use `camelCase` and end with `Schema`, for example `userSchema`.

### Mappers

- Mappers MUST be pure functions.
- Mappers SHOULD live in `models/*.mappers.ts`.

### Dependencies

- `models/` MUST NOT depend on `api/`.
- `models/` MUST NOT contain network requests, TanStack Query hooks, React components, route composition, or UI side effects.

## API

`api/` contains API request functions, TanStack Query integration, and operations composed from multiple API requests.

- API code private to a feature SHOULD live in `features/*/api/`.
- API code SHOULD be promoted to `src/api/` only when it is shared by multiple features.

Common file names:

- `<resource>.requests.ts`: backend endpoint request functions. MUST NOT contain React, TanStack Query hooks, or UI side effects.
- `<resource>.operations.ts`: frontend async operations composed from multiple request functions. MUST NOT contain React or UI side effects.
- `<resource>.queries.ts`: TanStack Query options, `queryOptions` / `infiniteQueryOptions`, and query hooks for read operations.
- `<resource>.mutations.ts`: TanStack Query mutation hooks, cache invalidation, and cache updates for write operations.

### API Naming

- `GET` collection requests SHOULD use `list<ResourcePlural>`; query hooks SHOULD use `use<ResourcePlural>Query`; infinite query hooks SHOULD use `use<ResourcePlural>InfiniteQuery`.
- `GET` detail requests SHOULD use `get<ResourceSingular>`; query hooks SHOULD use `use<ResourceSingular>Query`.
- `POST` create requests SHOULD use `create<ResourceSingular>`; mutation hooks SHOULD use `useCreate<ResourceSingular>Mutation`.
- `PATCH` partial update requests SHOULD use `update<ResourceSingular>`; mutation hooks SHOULD use `useUpdate<ResourceSingular>Mutation`.
- `PUT` replace requests SHOULD use `replace<ResourceSingular>`; mutation hooks SHOULD use `useReplace<ResourceSingular>Mutation`.
- `DELETE` requests SHOULD use `delete<ResourceSingular>`; mutation hooks SHOULD use `useDelete<ResourceSingular>Mutation`.
- Custom hooks wrapping `useQueries` SHOULD use `use<ResourcePlural>Queries`.
- Client-side multi-resource operations SHOULD use `<action><ResourcePlural>`, for example `deleteUsers`.
- Server-side endpoints that apply the same action to multiple resources SHOULD use `bulk<Action><ResourcePlural>`, for example `bulkDeleteUsers`.
- Server-side endpoints that execute multiple operation items in one request SHOULD use `batch<Action><ResourcePlural>`, for example `batchWriteUsers`.

### URL Search Naming

URL search-related names keep these meanings:

- `queryParams` MAY mean object-shaped query parameters.
- `queryString` MAY mean a serialized query string without `?`.
- `search` MAY align with the Web-standard `URL.search` meaning: the full query string including `?`.
- `searchParams` MAY mean a `URLSearchParams` instance.

### TanStack Query

- Reusable query options SHOULD be defined with `queryOptions` / `infiniteQueryOptions`.
- Query keys SHOULD include every variable that affects the `queryFn` result.
- Query hooks SHOULD reuse query options to avoid redefining the same `queryKey` and `queryFn`.
- Code that needs a query key SHOULD reuse the `queryKey` from the query options instead of redefining the same key.

### DTO and Mapping

- `Dto` represents an API raw boundary shape. It does not mean every operation must create a dedicated type.
- API resource raw shapes SHOULD use `<ResourceSingular>Dto`, for example `UserDto`.
- Response body raw shapes SHOULD use `<Operation>ResponseDto`, for example `ListUsersResponseDto`.
- Path params SHOULD use `<Operation>PathParams`.
- Query params, request headers, and request bodies MAY reuse frontend models, form values, or function params directly. Use a `*Dto` suffix only when a separate API raw boundary shape must be represented.
- When API raw shapes differ from frontend data structures in fields, naming, nullability, formats, nesting, or semantics, a dedicated `*Dto` type SHOULD be defined and converted through a mapper.
- DTO-to-model mapping SHOULD happen inside request functions that return frontend models. Mapper logic SHOULD live in `models/*.mappers.ts`.
- UI code SHOULD prefer request functions that return frontend models. It should call request functions that return raw DTOs only when raw DTOs are actually needed.

## Styling

- Tailwind CSS SHOULD be the baseline styling approach.
- CSS / CSS Modules SHOULD be used only when Tailwind CSS is not suitable.
- Global style entry points SHOULD live in `src/styles/`.
- Component-scoped CSS Modules SHOULD stay close to the component and use `<component>.module.css`.

## Testing

- Unit / component tests SHOULD use `*.test.ts` / `*.test.tsx`, and MAY be colocated with the module under test. Unit tests under `models/` SHOULD use `*.test.ts`.
- When Playwright is enabled, e2e tests SHOULD use `*.spec.ts`.
- Test utilities reused across tests SHOULD live in `src/testing/`.
- Test helpers used by a single module SHOULD be colocated with that module.
- Production code MUST NOT depend on `src/testing/`.

## Imports

- Direct imports SHOULD be the baseline import style: import from the actual defining file or from an explicit module entry, not from a directory-level barrel file.
- Feature-level `index.ts` public APIs and global barrel files SHOULD NOT be the baseline.
- Small module entries MAY be used, but they must represent real module boundaries.
- Imports MUST follow the dependency direction defined by this document.
- Type-only imports MUST use top-level `import type` when the imported module provides only types to the current file.
- Mixed value/type imports from the same module SHOULD use inline `type` specifiers, for example `import { type Value, value } from './value';`.
- Type-only exports and re-exports MUST use top-level `export type`.
- Mixed value/type exports and re-exports SHOULD use inline `type` specifiers, for example `export { type Value, value } from './value';`.
- Named import specifiers SHOULD be sorted automatically by Oxlint; import declaration ordering is handled by Oxfmt.
- Application source SHOULD use named exports. Default exports are allowed for tooling configuration, generated files, and external framework or library conventions.
- Implementation modules SHOULD export at declaration sites. Explicit export lists SHOULD be reserved for module entry points or intentional public API selection.
