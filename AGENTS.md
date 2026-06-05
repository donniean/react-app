# AGENTS.md

## 仓库边界

- 以 [README.md](README.md) 作为仓库用途、目录范围和常用命令的 single source of truth；更细的执行约束以本文件和相关源码为准。
- 以 [docs/conventions.md](docs/conventions.md) 作为规范和约定的 single source of truth；更细的执行约束以本文件和相关源码为准。
- 除非用户明确要求，不要在本仓库中加入后端服务实现。
- 本仓库是 single-page application (SPA) + client-side rendering (CSR)，不要引入 Server-side rendering (SSR) 、React Server Components、API routes 或 full-stack framework 约定，除非用户明确改变目标。

## 验证

根据改动范围运行相关检查：

```bash
pnpm run lint
pnpm run test
pnpm run build
```

如果检查结果可自动修复，优先运行影响范围最小的 `fix` 命令，而不是无差别运行全仓库修复。

更小范围的检查可按文件类型选择：

```bash
pnpm run lint:md
pnpm run lint:js
pnpm run lint:types
pnpm run lint:css
pnpm run lint:html
pnpm run lint:i18n
pnpm run lint:format
pnpm run lint:spell
pnpm run lint:text
pnpm run lint:package-json
```

对应的 `fix` 命令包括：

- `pnpm run lint:md:fix`
- `pnpm run lint:js:fix`
- `pnpm run lint:css:fix`
- `pnpm run lint:format:fix`
- `pnpm run lint:text:fix`
- `pnpm run lint:package-json:fix`

涉及用户可见 UI、routing、i18n、Vite config、Docker 或 nginx 的改动，在可行时进行本地浏览器 smoke test。

CI 当前在 pull requests to `main` 上运行 lint、test 和 build。

## Docker

未经用户明确确认，不要运行以下命令：

```bash
pnpm run docker:build
pnpm run docker:build:multi
```

这些命令会 push Docker images 到 Docker Hub。GitHub workflow `docker.yaml` 也会在 push to `main` 或 tags 时 build and push image。
