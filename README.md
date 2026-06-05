# react-app

[![License: MIT](https://img.shields.io/github/license/donniean/react-app)](https://github.com/donniean/react-app/blob/main/LICENSE) [![CI](https://github.com/donniean/react-app/actions/workflows/ci.yaml/badge.svg)](https://github.com/donniean/react-app/actions/workflows/ci.yaml)

A personal React application starter:

- 目标场景：后台或中台类前端控制台。
- 应用形态：single-page application (SPA)。
- 渲染方式：client-side rendering (CSR)。

后端服务默认由独立团队开发和维护。

## 环境要求

Node.js 和 package manager 版本以 [`.nvmrc`](.nvmrc) 与 [`package.json`](package.json) 的 `packageManager` / `engines` 字段为准。

## 安装

```bash
pnpm install
```

## 开发

```bash
pnpm run dev
```

开发服务器默认使用端口 `3000`。

## 环境变量

以 [`.env.example`](.env.example) 为起点。

```bash
VITE_API_BASE_URL=http://127.0.0.1:3001
```

- `VITE_API_BASE_URL`：用于配置本地 API proxy，设置后，`/api` 会被 proxy 到该地址。

## 构建与预览

```bash
pnpm run build
pnpm run preview
```

## Customize

- `vite.config.ts`
- `.env` and `.env,*`
- `index.html`
- `src/@types/vite-env.d.ts` [IntelliSense for TypeScript](https://cn.vitejs.dev/guide/env-and-mode.html#intellisense)

## Localization

```bash
pnpm run i18n:types
pnpm run lint:i18n
```

## Testing

```bash
pnpm test
pnpm test:coverage
pnpm test:watch
pnpm test:ui
```

## Lint & Format

```bash
pnpm lint
pnpm lint:fix
```

## Docker

```bash
pnpm run docker:run
```

Docker build scripts 会 push images 到 Docker Hub；运行前应确认目标 image。

## Inspiration

- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [React + TypeScript + Vite template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)

## License

[MIT](./LICENSE)
