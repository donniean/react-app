# react-app

A personal React starter.

[![License: MIT](https://img.shields.io/github/license/donniean/react-app)](https://github.com/donniean/react-app/blob/master/LICENSE) [![CI](https://github.com/donniean/react-app/actions/workflows/ci.yaml/badge.svg)](https://github.com/donniean/react-app/actions/workflows/ci.yaml)

## Requirements

- Node.js >= 22.0.0

## Install

```sh
npm install
```

## Development

```sh
npm run dev
```

## Build & Preview

```bash
npm build
npm preview
```

## Customize

- `vite.config.mjs`
- `.env` and `.env,*`
- `index.html`
- `src/vite-env.d.ts` [IntelliSense for TypeScript](https://cn.vitejs.dev/guide/env-and-mode.html#intellisense)
- `src/styles/theme.ts` and [Custom mantine theme](https://github.com/songkeys/tailwind-preset-mantine?tab=readme-ov-file#custom-mantine-theme)

## Testing

```bash
npm test
npm test:coverage
npm test:watch
npm test:ui
```

## Localization

```bash
npm run i18n:types
```

## Lint & Format

```bash
npm lint
npm lint:fix
```

## Recommended Packages

- [`axios`](https://github.com/axios/axios)
  - [`Ky`](https://github.com/sindresorhus/ky)
- [`date-fns`](https://github.com/date-fns/date-fns)
  - [`dayjs`](https://github.com/iamkun/dayjs)
- [`zod`](https://github.com/colinhacks/zod)
- [`cva`](https://github.com/joe-bell/cva)
- [`react-use`](https://github.com/streamich/react-use)
- [`immer`](https://github.com/immerjs/immer)
- [`use-immer`](https://github.com/immerjs/use-immer)
- [`zustand`](https://github.com/pmndrs/zustand)
- [`@tanstack/react-table`](https://github.com/tanstack/table)
- [`react-hook-form`](https://github.com/react-hook-form/react-hook-form)
- [`recharts`](https://github.com/recharts/recharts)
- [`motion`](https://github.com/motiondivision/motion)

## Inspiration

- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [React + TypeScript + Vite template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
- [Mantine Vite template](https://github.com/mantinedev/vite-template)

## License

[MIT](./LICENSE)
