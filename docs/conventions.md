# Conventions

## Routing

- Route definitions 位于 [`src/app/routes.tsx`](../src/app/routes.tsx)。
- Route-level components 位于 [`src/routes/`](../src/routes/)。
- 当前 routes 使用 lazy route objects，并通过 `RouteErrorBoundary` 处理 route-level errors。
- 新增 route 时，优先沿用当前 `lazy` route object 结构。

## App composition

- App bootstrap 入口位于 [`src/index.tsx`](../src/index.tsx)。
- App composition 入口位于 [`src/app/index.tsx`](../src/app/index.tsx)。
- Providers 位于 [`src/app/providers/`](../src/app/providers/)。
- 新增 cross-cutting provider 时，优先在 `src/app/providers/` 下实现，并从 `src/app/index.tsx` 组合。

## React component folder and file naming

- 项目文件名默认使用 `kebab-case`。React component 的目录名和文件名也使用 `kebab-case`，而不是 `PascalCase`。

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
- 优先使用 Tailwind CSS 处理通用 styling。
- Tailwind CSS 通过 `@tailwindcss/vite` 接入。
- CSS Modules 使用 `camelCase` locals convention。
- 合并 conditional class names 时优先使用 [`src/utils/cn.ts`](../src/utils/cn.ts)。

## Assets

- SVG 优先作为 React component 导入；项目已通过 `vite-plugin-svgr` 支持 `?react` imports。
