# AGENTS.md

## 仓库边界

- 以 [README.md](README.md) 作为仓库用途、目录范围和常用命令的 single source of truth。
- 除非用户明确要求，不要在本仓库中加入后端服务实现。
- 本仓库是 single-page application (SPA) + client-side rendering (CSR)，不要引入 Server-side rendering (SSR) 、React Server Components、API routes 或 full-stack framework 约定，除非用户明确改变目标。

## 验证

根据改动范围运行相关检查：

```bash
pnpm run lint
pnpm run test
pnpm run build
```

涉及用户可见 UI、routing、i18n、Vite config、Docker 或 nginx 的改动，在可行时进行本地浏览器 smoke test。

CI 当前运行 lint 和 build；test job 存在但 test step 被注释，不要把 CI 视为完整 test coverage。

## Docker

未经用户明确确认，不要运行以下命令：

```bash
pnpm run docker:build
pnpm run docker:build:multi
```

这些命令会 push Docker images 到 Docker Hub。GitHub workflow `docker.yaml` 也会在 push to `main` 或 tags 时 build and push image。
