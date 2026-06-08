# react-app

[![License: MIT](https://img.shields.io/github/license/donniean/react-app)](https://github.com/donniean/react-app/blob/main/LICENSE) [![CI](https://github.com/donniean/react-app/actions/workflows/ci.yaml/badge.svg)](https://github.com/donniean/react-app/actions/workflows/ci.yaml)

一个个人自用的 public template repository，用于沉淀可复用的 React starter / template / example / demo / scaffold。

适用于：

- admin dashboard / panel / console
- single-page application (SPA)
- client-side rendering (CSR)
- 后端服务默认由独立团队开发和维护
- Custom design system

由本 template 生成的新项目不限定为个人自用，可按个人、团队或公司场景继续调整。

## 环境要求

- Node.js 版本以 [`.nvmrc`](.nvmrc) 和 [`package.json`](package.json) 的 `engines.node` 为准。
- pnpm 版本以 [`package.json`](package.json) 的 `packageManager` 和 `engines.pnpm` 为准。
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

## Usage

由本 template 生成正式项目后，优先按实际业务调整：

- [`package.json`](package.json)：package name、metadata 和 scripts。
- [`.env`](.env)、[`.env.example`](.env.example) 和 `.env*`：项目需要的 public Vite env variables。
- [`index.html`](index.html)：title、metadata 和 root document 信息。
- [`src/@types/vite-env.d.ts`](src/@types/vite-env.d.ts) [IntelliSense for TypeScript](https://vite.dev/guide/env-and-mode#intellisense-for-typescript)

`src/` 下的示例页面、默认 logo、占位 request wrapper 和示例文案应按业务目标替换、裁剪或删除。结构与工程约定见 [docs/conventions.md](docs/conventions.md)。

### 环境变量

以 [`.env.example`](.env.example) 为起点创建本地覆盖文件：

```bash
cp .env.example .env.local
```

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:3001
```

设置 `VITE_API_BASE_URL` 后，Vite dev server 和 preview server 会把 `/api` proxy 到该地址。

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

## 规范与约定

项目结构、routing、imports、i18n、styling、规范和约定见 [docs/conventions.md](docs/conventions.md)。

## Docker

本地运行已构建 image：

```bash
pnpm run docker:run
```

`docker:build` 和 `docker:build:multi` 会 push images 到 Docker Hub；运行前必须确认目标 image、credentials 和发布意图。

[`docker.yaml`](.github/workflows/docker.yaml) 会在 push to `main`、push tags 或手动触发时 build and push Docker image。

## References

- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [React + TypeScript + Vite template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)

## License

[MIT](LICENSE)
