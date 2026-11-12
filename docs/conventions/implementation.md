# Implementation

Read the [scope, normative keywords, and shared principles](README.md) before applying these conventions. Use [general naming conventions](naming.md) for file names and resource names, and [structure and dependencies](structure.md) for module placement and imports.

## Assets

- SVGs used as React components SHOULD use `?react` imports.
- SVGs, images, and other assets used as URLs SHOULD use regular imports.

## Components

### Component Files

- Each file SHOULD define one React component. This applies to components throughout `src/`, including app, routes, and features.
- A short, closely related helper component used only by the main component MAY be defined in the same file at module scope. It SHOULD move to its own file when its logic grows, it is reused, or it needs independent maintenance.
- Exported hooks, utilities, context objects, and runtime constants SHOULD live in separate modules; type-only exports MAY remain alongside components.

### Shared Components

`src/components/` contains UI components reused across features and does not depend on feature internals.

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
