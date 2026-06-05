# conventions

## i18n

- Locale resources 位于 `src/locales/`。
- i18next generated types 位于 `src/@types/`。
- 修改用户可见文本、translation keys 或 locale resources 后，运行：

```bash
pnpm run i18n:types
pnpm run lint:i18n
```

## Styling

- 全局样式入口位于 `src/styles/`。
- CSS Modules 使用 camelCase locals convention。
- Tailwind CSS 通过 `@tailwindcss/vite` 接入。
- SVG 作为 React component 使用时沿用现有 SVGR 配置。
