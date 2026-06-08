# Conventions

This file is the authoritative source for `react-app` project structure and implementation conventions. [README.md](../README.md) keeps only the repository purpose, common commands, and high-level entry points.

## Routing

- Route definitions are in [`src/app/routes.tsx`](../src/app/routes.tsx).
- Route-level components are in [`src/routes/`](../src/routes/).
- Current routes use lazy route objects and handle route-level errors with `RouteErrorBoundary`.
- When adding a route, prefer the existing `lazy` route object structure.

## App Composition

- The application bootstrap entry point is [`src/index.tsx`](../src/index.tsx).
- The application composition entry point is [`src/app/index.tsx`](../src/app/index.tsx).
- Providers are in [`src/app/providers/`](../src/app/providers/).
- When adding a cross-cutting provider, prefer implementing it under `src/app/providers/` and composing it from `src/app/index.tsx`.

## React Component Folder and File Naming

- React component directory names and file names use `kebab-case`, not `PascalCase`.

## i18n

- User-facing text should use i18n resources; do not write literal strings directly. ESLint enables `i18next/no-literal-string`.
- Locale resources are in [`src/locales/`](../src/locales/).
- Generated i18next types are in [`src/@types/`](../src/@types/).
- i18next config is in [`i18next.config.ts`](../i18next.config.ts).
- After changing user-facing text, translation keys, or locale resources, update locale resources, regenerate i18next types, and run i18n checks:

```bash
pnpm run i18n:extract
pnpm run i18n:types
pnpm run lint:i18n
```

## Styling

- Global style entry points are in [`src/styles/`](../src/styles/).
- Prefer Tailwind CSS for general-purpose styling.
- Tailwind CSS is integrated through `@tailwindcss/vite`.
- CSS Modules use `camelCase` for locals.
- Prefer [`src/utils/cn.ts`](../src/utils/cn.ts) for conditional class name composition.

## Assets

- Import SVGs as React components by default. `vite-plugin-svgr` supports `?react` imports.
- Put static public assets in [`public/`](../public/). Put assets that need bundler processing, hashing, or React component usage in [`src/assets/`](../src/assets/) or `src/**/assets/`.
