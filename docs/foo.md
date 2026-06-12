# Frontend Technology Stack

- 记录主要前端技术栈，不是完整依赖清单
- Node.js 使用 Active LTS
- 其他技术栈默认使用 latest stable
- `ALTERNATIVE` 表示同一职责的替代方案
- `OPTIONAL` 表示按项目需要引入

Project Scope

- 企业级中台或后台管理系统
- Single-page application (SPA)
- Client-side rendering (CSR)
- Custom design system
- 后端由专门后端团队独立开发与维护

Architecture & Structure

- Feature-based
- 不强制采用 [Feature-Sliced Design](https://feature-sliced.design/)

Runtime & Package Management

- [Node.js](https://github.com/nodejs/node)
- [pnpm](https://github.com/pnpm/pnpm)

Language & UI Library

- [TypeScript](https://github.com/microsoft/TypeScript)
- [React](https://github.com/facebook/react)

Build Tooling

- [Vite](https://github.com/vitejs/vite)

Styling

- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [clsx](https://github.com/nberlette/clsx)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- [Class Variance Authority](https://github.com/joe-bell/cva) OPTIONAL

UI Primitives & Components

- [Base UI](https://github.com/mui/base-ui)
  - [shadcn/ui](https://github.com/shadcn-ui/ui) ALTERNATIVE

Design System & Component Development

- [Storybook](https://github.com/storybookjs/storybook) OPTIONAL

Routing

- [TanStack Router](https://github.com/TanStack/router)
  - [React Router](https://github.com/remix-run/react-router) ALTERNATIVE

Client State

- `useState` / `useReducer`
- `useContext` OPTIONAL
- [Zustand](https://github.com/pmndrs/zustand) OPTIONAL

Server State & Data Fetching

- [TanStack Query](https://github.com/TanStack/query)

API Contract & Code Generation

- [OpenAPI TypeScript](https://github.com/openapi-ts/openapi-typescript) OPTIONAL
  - [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts)
  - [Orval](https://github.com/orval-labs/orval) ALTERNATIVE

HTTP Client

- [Ky](https://github.com/sindresorhus/ky)
  - [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) ALTERNATIVE
  - [axios](https://github.com/axios/axios) ALTERNATIVE

API Mocking

- [Mock Service Worker](https://github.com/mswjs/msw) OPTIONAL
- [Faker](https://github.com/faker-js/faker) OPTIONAL

Internationalization

- [react-i18next](https://github.com/i18next/react-i18next)

Date & Time

- [date-fns](https://github.com/date-fns/date-fns)
  - [Day.js](https://github.com/iamkun/dayjs) ALTERNATIVE

Utils

- [Remeda](https://github.com/remeda/remeda)

Forms & Validation

- [React Hook Form](https://github.com/react-hook-form/react-hook-form)
- [Zod](https://github.com/colinhacks/zod)

Tables & Data Grids

- [TanStack Table](https://github.com/TanStack/table)

Charts & Visualization

- [Recharts](https://github.com/recharts/recharts) OPTIONAL

Animation

- [Motion](https://github.com/motiondivision/motion) OPTIONAL

Testing

- [Vitest](https://github.com/vitest-dev/vitest) OPTIONAL
- [React Testing Library](https://github.com/testing-library/react-testing-library) OPTIONAL
- [Playwright](https://github.com/microsoft/playwright) OPTIONAL

Formatting & Linting

- [Prettier](https://github.com/prettier/prettier)
- [ESLint](https://github.com/eslint/eslint)
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
- [Stylelint](https://github.com/stylelint/stylelint)

Observability

- [Sentry](https://github.com/getsentry/sentry-javascript) OPTIONAL

Version Control & Repository Hosting

- [Git](https://github.com/git/git)
- [GitHub](https://github.com/)

CI/CD

- [GitHub Actions](https://github.com/features/actions)

Deployment

- Docker image
- [Caddy](https://github.com/caddyserver/caddy)
  - [NGINX](https://github.com/nginx/nginx) ALTERNATIVE
