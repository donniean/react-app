# react-app

[![License: MIT](https://img.shields.io/github/license/donniean/react-app)](https://github.com/donniean/react-app/blob/main/LICENSE) [![CI](https://github.com/donniean/react-app/actions/workflows/ci.yaml/badge.svg)](https://github.com/donniean/react-app/actions/workflows/ci.yaml)

A personal GitHub Template repository，用于沉淀 React starter / template / example / demo / scaffold，面向后台或中台类前端控制台。应用形态是 single-page application (SPA)，渲染方式是 client-side rendering (CSR)，后端服务默认由独立团队开发和维护。

## 环境要求

- Node.js 和 pnpm 版本以 [`.nvmrc`](.nvmrc)、[`package.json`](package.json) 的 `packageManager` / `engines` 字段为准。
- 使用 `pnpm`。`preinstall` 会通过 `only-allow` 阻止其他 package manager。

## 安装

```bash
pnpm install
```

## 开发

```bash
pnpm run dev
```

开发服务器默认使用端口 `3000`。

## Customize

通常需要修改以下文件，以满足项目；其他 `src/` 下文件由于需要大量修改，因此不在此赘述。

- [`vite.config.ts`](vite.config.ts)
- [`.env`](.env) and `.env,*`
- [`index.html`](index.html)
- [`src/@types/vite-env.d.ts`](src/@types/vite-env.d.ts) [IntelliSense for TypeScript](https://vite.dev/guide/env-and-mode#intellisense-for-typescript)

### 环境变量

以 [`.env.example`](.env.example) 为起点：

```bash
cp .env.example .env.local
```

```bash
VITE_API_BASE_URL=http://127.0.0.1:3001
```

设置 `VITE_API_BASE_URL` 后，API 会被 proxy 到该地址。

## 规范与约定

项目结构、routing、imports、i18n、styling、browser smoke test 和 Docker 约定见 [docs/conventions.md](docs/conventions.md)。

## 构建

```bash
pnpm run build
```

## 预览

```bash
pnpm run preview
```

## Lint & Format

```bash
pnpm run lint
pnpm run lint:fix
```

## Testing

```bash
pnpm run test
pnpm run test:coverage
pnpm run test:watch
pnpm run test:ui
```

## Docker

本地运行已构建 image：

```bash
pnpm run docker:run
```

`docker:build` 和 `docker:build:multi` 会 push images 到 Docker Hub；运行前应确认目标 image 和发布意图。

## Inspiration

- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [React + TypeScript + Vite template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)

## License

[MIT](LICENSE)
