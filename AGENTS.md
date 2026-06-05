# AGENTS.md

## 仓库范围

除非用户明确要求，不要在本仓库中加入后端服务实现。后端集成应通过既有 API 配置和 request utilities 处理。

## i18n

- 用户可见文本应使用 i18n resource，不要直接写 literal string。
- Locale 文件位于 `src/locales/`。
- 生成类型位于 `src/@types/`。
- 修改 locale、翻译 key 或用户可见文本后，运行：

```bash
pnpm run i18n:types
pnpm run lint:i18n
```

## Styling

- 全局样式入口位于 `src/styles/`。
- CSS Modules 使用 camelCase locals convention。
- Tailwind CSS 通过 Vite plugin 接入。
- SVG 作为 React component 使用时优先沿用现有 SVGR 配置。

## 验证

根据改动文件运行相关检查。常用命令：

```bash
pnpm run lint
pnpm run test
pnpm run build
```

涉及用户可见 UI、routing、i18n 或 build config 的改动，在可行时进行本地浏览器 smoke test。

当前 CI 不运行 test step，不要把 CI 视为完整 test coverage。

## Docker

未经用户明确确认，不要运行以下命令：

```bash
pnpm run docker:build
pnpm run docker:build:multi
```

这些命令会 push Docker images 到 Docker Hub。
