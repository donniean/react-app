# Conventions

## Routing

- Route definitions 位于 [`src/app/routes.tsx`](../src/app/routes.tsx)。
- Route-level components 位于 [`src/routes/`](../src/routes/)。
- 当前 routes 使用 lazy loading，并通过 `RouteErrorBoundary` 处理 route-level errors。
- 新增 route 时，优先沿用当前 `lazy` route object 结构。

## App composition

- App 入口位于 [`src/app/index.tsx`](../src/app/index.tsx)。
- Providers 位于 [`src/app/providers/`](../src/app/providers/)。
- 新增 cross-cutting provider 时，优先在 `src/app/providers/` 下实现，并从 `src/app/index.tsx` 组合。

## React component folder and file naming

- React component 的目录名和文件名使用 `kebab-case`，而不是 `camelCase`。

## i18n

- 用户可见文本应使用 i18n resources，不要直接写 literal string；ESLint 启用了 `i18next/no-literal-string`。
- Locale resources 位于 [`src/locales/`](../src/locales/)。
- i18next generated types 位于 [`src/@types/`](../src/@types/)。
- i18next config 位于 [`i18next.config.ts`](../i18next.config.ts)。
- 修改用户可见文本、translation keys 或 locale resources 后，运行：

```bash
pnpm run i18n:types
pnpm run lint:i18n
```

## Styling

- 全局样式入口位于 [`src/styles/`](../src/styles/)。
- 优先使用 Tailwind CSS，而不是 CSS Modules
- Tailwind CSS 通过 `@tailwindcss/vite` 接入。
- CSS Modules 使用 `camelCase` locals convention。
- SVG 优先使用 React component，而不是 URL。
