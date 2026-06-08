# Conventions

本文件是 `react-app` 的项目结构与工程约定 single source of truth。[`README`](../README.md) 只保留仓库用途、常用命令和高层入口；具体实现约定维护在这里。

当前约定描述本 template 的现有实现。由 template 生成正式项目后，可以按业务目标替换示例页面、占位 request wrapper、默认 logo 和示例文案，但应保持 app runtime、tooling、workflows 和 deployment 边界清晰。

## Project shape

- 本项目是 single-page application (SPA) + client-side rendering (CSR)。
- 前端通过浏览器访问外部 API 或独立后端服务；除非项目目标改变，不在本仓库加入后端服务、API routes、SSR 或 full-stack framework 约定。
- App bootstrap 入口位于 [`src/index.tsx`](../src/index.tsx)。
- App composition 入口位于 [`src/app/index.tsx`](../src/app/index.tsx)。
- Shared UI、route components、cross-cutting libraries、styles 和 typed env helpers 分别维护在 `src/components/`、`src/routes/`、`src/lib/`、`src/styles/` 和 `src/config/`。

## Routing

- Route definitions 位于 [`src/app/routes.tsx`](../src/app/routes.tsx)。
- Route-level components 位于 [`src/routes/`](../src/routes/)。
- 当前 routes 使用 lazy route objects，并通过 `RouteErrorBoundary` 处理 route-level errors。
- 新增 route 时，优先沿用当前 `lazy` route object 结构。

## App composition

- Providers 位于 [`src/app/providers/`](../src/app/providers/)。
- 新增 cross-cutting provider 时，优先在 `src/app/providers/` 下实现，并从 `src/app/index.tsx` 组合。

## React component folder and file naming

- React component 的目录名和文件名使用 `kebab-case`，而不是 `PascalCase`。

## i18n

- 用户可见文本应使用 i18n resources，不要直接写 literal string；ESLint 启用了 `i18next/no-literal-string`。
- Locale resources 位于 [`src/locales/`](../src/locales/)，当前包含 `en` 和 `zh-Hans`。
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
- 静态公共资源放在 [`public/`](../public/)；需要经过 bundler 处理、hash 或作为 React component 使用的资源放在 [`src/assets/`](../src/assets/) 或 `src/**/assets/`。

## Environment variables

- Vite public env variables 使用 `VITE_` prefix。
- [`.env.example`](../.env.example) 当前只声明 `VITE_API_BASE_URL`。
- [`vite.config.ts`](../vite.config.ts) 会在 `VITE_API_BASE_URL` 存在时把 `/api` proxy 到该地址；不设置时不启用 proxy。
- 如果 app runtime 需要读取新的 env variable，同步检查 `.env.example`、`.env*`、[`src/@types/vite-env.d.ts`](../src/@types/vite-env.d.ts) 和 [`src/config/env.ts`](../src/config/env.ts)。

## Tooling and validation

- 使用 `pnpm`。`preinstall` 会通过 `only-allow` 阻止其他 package manager。
- Node.js 版本以 [`.nvmrc`](../.nvmrc) 和 [`package.json`](../package.json) 的 `engines.node` 为准；pnpm 版本以 `packageManager` 和 `engines.pnpm` 为准。
- `pnpm run build` 会先生成 i18n types，再运行 TypeScript project build 和 Vite build。
- `pnpm run lint` 汇总 package JSON、format、types、JavaScript/TypeScript、CSS、HTML、Markdown、i18n、spell 和 text checks。
- `lint-staged` 会在 staged changes 上运行 format、text、spell、i18n types / lint，以及与文件类型对应的 TypeScript、ESLint、Stylelint、HTML、Markdown 和 related Vitest checks。

## GitHub Workflows

- [`.github/workflows/ci.yaml`](../.github/workflows/ci.yaml) 在 pull requests to `main` 和 manual dispatch 上运行 lint、test 和 build，并上传 `dist/` artifact。
- [`.github/workflows/docker.yaml`](../.github/workflows/docker.yaml) 在 push to `main`、push tags 或 manual dispatch 上 build and push Docker image。
- Dependency bump、pull request auto-merge 和 auto-update workflows 复用 [`donniean/hub`](https://github.com/donniean/hub) 中的 reusable workflows；没有读取 upstream workflow 前，不要推断其内部行为。

## Docker and nginx

- [`Dockerfile`](../Dockerfile) 使用 Node.js builder stage 生成 Vite build output，再用 nginx runtime stage 服务 [`dist/`](../dist/)。
- [`nginx.conf`](../nginx.conf) 使用 `try_files $uri $uri/ /index.html` 支持 SPA fallback。
- `pnpm run docker:run` 以 `3000:80` 运行 `donniean/react-app` image。
- `pnpm run docker:build` 和 `pnpm run docker:build:multi` 会 push images 到 Docker Hub；运行前必须确认目标 image、credentials 和发布意图。
- [`.github/actions/sanitize-ref-name/action.yaml`](../.github/actions/sanitize-ref-name/action.yaml) 用于把 Git ref name 转换为 Docker tag 可用格式。
