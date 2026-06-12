# Conventions 文档大纲草案

本文是 `docs/conventions.md` 的重写大纲草案，不是正式规范正文。正式文档只定义会影响长期维护的目录边界、命名体系和实现约定；项目用途、安装、运行、测试命令、Docker 使用等内容由 `README.md` 承担。

## 编写目标

- 面向企业级中后台 / 后台管理系统的 React SPA / CSR 项目。
- 作为人类和 AI 都容易执行的项目规范。
- 以可维护性、可删除性、依赖方向、团队协作为主要判断标准。
- 优先依据官方文档、正式规范、相关标准、社区共识与最佳实践；没有统一标准时，给出项目内固定选择。
- 不预创建所有可能目录；只在真实 concern 出现时创建。

## 总体原则

### Shared code 与 feature-specific code 分离

- 共享代码和业务 feature 代码必须分开。
- shared 目录必须有明确职责，不能成为杂物区。
- feature-specific 代码默认靠近 feature；跨 feature 复用后，再提升到 shared 位置。

### 依赖方向单向流动

- 代码依赖方向应从 shared 到 features，再到 app/routes。
- shared 不依赖 features。
- features 不依赖 app/routes。
- features 之间不直接互相 import。
- app/routes 负责组合 shared 与 features。

### Feature 应保持可维护、可删除

- 一个 feature 应尽量是独立业务单元。
- 删除一个 feature 时，理想影响范围应主要集中在组合它的 routes/app 层。
- 如果删除一个 feature 会导致大量其他 feature 破坏，说明边界泄漏。

### 目录服务于真实 concern

- 不为每个 feature 机械创建 `api/`、`models/`、`stores/`、`services/`、`styles/` 等目录。
- 目录必须对应真实职责、真实代码和真实维护边界。
- 当文件数量、职责边界或协作成本证明有必要时，再拆分目录。

## 技术选择基准

本节说明新增库或替换技术方案时应优先参考 [tech-stack.md](tech-stack.md)，不在 conventions 中复制完整依赖清单。

- React SPA / CSR。
- Vite。
- Tailwind CSS 优先，CSS / CSS Modules 作为 fallback。
- TanStack Query 用于 server state。
- i18n resources 管理用户可见文案。
- Vitest 用于 unit/component tests。
- Playwright 如启用，用于 end-to-end tests。

## 结构

### 项目根目录职责

说明项目根目录只保留项目级配置、文档、脚本、静态资源、源码入口等内容。

```text
.
├── .github/
├── .husky/
├── .vscode/
├── config/
├── docs/
├── e2e/
├── public/
├── scripts/
├── src/
├── AGENTS.md
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

需要覆盖：

- `.github/`：GitHub workflows、templates、平台配置。
- `.husky/`：Git hooks。仅在启用 Husky 时存在。
- `.vscode/`：团队共享且低争议的编辑器配置。
- `config/`：项目级工具配置拆分目录。非必要不创建。
- `docs/`：项目文档。
- `e2e/`：end-to-end tests。仅在启用 Playwright 或同类工具时存在。
- `public/`：不经 bundler 处理的静态资源。
- `scripts/`：项目维护、代码生成、检查、发布脚本。
- `src/`：应用源代码。
- `vite.config.ts`：Vite 配置。

### `src/` 目录职责

说明 `src/` 下可能出现的目录，但不是所有项目都需要。

```text
src/
├── @types/
├── api/
├── app/
├── assets/
├── components/
├── config/
├── features/
├── helpers/
├── hooks/
├── lib/
├── locales/
├── mocks/
├── models/
├── routes/
├── services/
├── stores/
├── styles/
├── testing/
├── utils/
└── index.tsx
```

默认常用：

- `app/`：应用组合层，包括 root app、providers composition、router composition。
- `routes/`：route-level components。
- `components/`：跨 feature 复用的 UI components。
- `lib/`：第三方库适配、基础设施封装、配置后的 clients。
- `utils/`：通用、纯函数、低业务语义的工具函数。
- `styles/`：全局样式入口、Tailwind CSS 入口、全局 CSS。
- `assets/`：应用级 bundled assets。
- `config/`：运行时配置、环境变量解析、应用级配置对象。
- `@types/`：全局类型声明、工具生成声明。
- `locales/`：i18n resources。
- `testing/`：测试工具、custom render、测试环境 helpers。
- `index.tsx`：React bootstrap entry。

按业务复杂度创建：

- `features/`：业务 feature 的主要组织位置。
- `models/`：跨 feature 共享的前端数据模型及其边界转换。
- `api/`：跨 feature 共享的 API requests、queries、mutations、operations。
- `hooks/`：跨 feature 复用的 React hooks。
- `helpers/`：项目内部、语义较具体、难以归入 `utils/` 或 `lib/` 的辅助函数。
- `mocks/`：MSW handlers、开发 mock、测试 mock。仅在启用 mock 方案时创建。

非默认或需谨慎创建：

- `services/`：仅用于明确的应用级 orchestration services；不作为 API request functions 的默认目录。
- `stores/`：仅在引入 client state store 技术并存在跨 feature client state 时创建。

### `src/app/` 子目录职责

说明 `src/app/` 是应用组合层，不是业务 feature 层，也不是 shared component 层。

```text
app/
├── providers/
├── index.tsx
└── routes.tsx
```

默认职责：

- `index.tsx`：application composition entry。
- `routes.tsx`：route definitions。
- `providers/`：cross-cutting provider composition。

职责边界：

- 可以组合 shared code 与 features。
- 可以注册路由、全局 providers、全局错误边界、全局 suspense/loading 边界。
- 不放业务 resource models。
- 不放 feature-specific components。
- 不放 API request functions。
- 不放通用 UI components。

按需扩展：

- `router/`：仅在路由配置拆分后确实需要目录化时创建。
- `layouts/`：仅在存在 app-shell 级布局，且不适合放入 `src/components/layouts/` 时创建。

不默认创建：

- `services/`。
- `stores/`。

### `src/routes/` Route-Level Components 职责

说明 `src/routes/` 存放 route-level components。

```text
routes/
├── root/
│   ├── root.tsx
│   └── root.module.css
└── errors/
    └── not-found.tsx
```

职责边界：

- route-level components 可以组合 features 和 shared components。
- route-level components 应保持薄，不承载复杂业务 UI。
- 复杂业务 UI 应放入 `features/*/components/` 或 `src/components/`。
- route-level components 不作为跨 feature 复用组件目录。
- route-level components 不直接定义业务 resource models。

### `src/components/` 子目录职责

说明 `src/components/` 存放跨 feature 复用的 UI components，不依赖业务 feature。

```text
components/
├── errors/
├── layouts/
└── ui/
```

默认子目录：

- `ui/`：设计系统基础组件、低业务语义的共享 UI components。
- `layouts/`：跨 route 或跨 feature 复用的布局 components。
- `errors/`：共享 error boundary fallback、错误展示 components。

职责边界：

- 可以依赖 `src/utils/`、`src/lib/`、`src/hooks/`、`src/models/` 中稳定的 shared code。
- 不依赖 `src/features/*/`。
- 不承载 feature-specific 业务流程。
- 不直接定义 routes。
- 不直接发起 API requests。

按需扩展：

- `forms/`：仅在存在跨 feature 复用的 form controls 或 form field components 时创建。
- `feedback/`：仅在存在跨 feature 复用的 toast、empty state、result、loading 等展示组件时创建。
- `navigation/`：仅在存在跨 feature 复用的 navigation components 时创建。

### `providers/`

- `providers/` 表示 provider composition，默认放在 `src/app/providers/`。
- 仅组合第三方 provider 或全局 provider 时，不创建单独的顶层目录。
- feature-specific provider 靠近对应 feature。

### `features/*/` 目录职责

说明 feature 内同名目录复用 `src/` 下目录职责，只是作用域收窄到当前 feature。

```text
features/*/
├── api/
├── assets/
├── components/
├── helpers/
├── hooks/
├── models/
├── services/
├── stores/
├── styles/
└── utils/
```

默认说明：

- `api/`：当前 feature 私有的 requests、queries、mutations、operations。
- `assets/`：当前 feature 私有资源。
- `components/`：当前 feature 私有 components。
- `helpers/`：当前 feature 私有辅助函数。
- `hooks/`：当前 feature 私有 hooks。
- `models/`：当前 feature 私有前端数据模型及其边界转换。
- `utils/`：当前 feature 私有通用工具。

需谨慎创建：

- `services/`：仅在当前 feature 存在明确 orchestration service 时创建。
- `stores/`：仅在当前 feature 存在独立 client state store 时创建。
- `styles/`：默认优先使用 Tailwind CSS；只有需要 feature-level CSS / CSS Modules 时创建。

### `models/` 结构

职责定义：

> `models/` 存放前端对业务资源、API 数据、表单数据、运行时校验、数据转换的纯模型代码。

职责边界：

- `models/` 可以包含 frontend model types、API DTO types、form value types、schemas、constants、mappers、type guards、fixtures、factories。
- `models/` 可以被 `api/`、components、hooks、routes 使用。
- `models/` 不依赖 `api/`。
- `models/` 不包含网络请求。
- `models/` 不包含 TanStack Query hooks。
- `models/` 不包含 React components。
- `models/` 不包含 route composition。
- `models/` 不包含 UI side effects。

默认 flat resource-prefixed files：

```text
models/
├── users.types.ts
├── users.schemas.ts
├── users.constants.ts
└── users.mappers.ts
```

可按需增加：

```text
models/
├── users.guards.ts
├── users.fixtures.ts
├── users.factories.ts
└── users.mappers.test.ts
```

不默认使用：

```text
models/users/types.ts
models/users/users.types.ts
```

允许升级为 resource 子目录的条件：

- resource 文件数量明显增多。
- 同一个 resource 出现 fixtures、tests、generated files 等配套文件。
- flat files 已经影响可读性和协作。
- 子目录代表真实 mini-module，而不是提前规划。

### `api/` 结构

职责定义：

- `api/` 存放 API request functions、TanStack Query queries、TanStack Query mutations，以及由多个 API requests 组成的 operations。
- feature-specific API 默认放在 `features/*/api/`。
- 多个 features 共享的 API 代码才提升到 `src/api/`。

默认 resource-level files：

```text
api/
├── users.requests.ts
├── users.queries.ts
├── users.mutations.ts
└── users.operations.ts
```

职责边界：

- `*.requests.ts`：纯 API request functions。
- `*.queries.ts`：TanStack Query queryOptions、query factory、query hooks。
- `*.mutations.ts`：mutationOptions、mutation hooks、cache invalidation/update。
- `*.operations.ts`：多个 request functions 组成的 async operations。

不默认使用：

- `*.endpoints.ts`。
- `*.api.ts`。
- `*.services.ts`。

### Routing 与 App Composition 结构

- route definitions 放在 `src/app/routes.tsx`。
- route-level components 放在 `src/routes/`。
- application bootstrap entry 放在 `src/index.tsx`。
- application composition entry 放在 `src/app/index.tsx`。
- cross-cutting providers 放在 `src/app/providers/`。

### Testing 结构

- unit/component tests 默认 colocate 到被测试文件附近。
- `src/testing/` 放测试工具、custom render、test setup helpers。
- `e2e/` 仅在启用 Playwright 或同类工具时创建。
- 不默认使用 `__tests__/`。

## 命名

### 目录名与文件名通用规则

- 目录名使用 lowercase / `kebab-case`。
- React component 文件名使用 `kebab-case`。
- 不使用 `PascalCase` component 文件名。
- resource 文件名使用 resource name + artifact suffix。

### 可数资源与不可数概念

可数业务资源使用复数：

```text
users
products
orders
```

不可数名词、能力、领域概念使用其自然形式：

```text
auth
metadata
feedback
traffic
equipment
```

规则：

- 文件名前缀通常跟随 resource 复数形式，例如 `users.types.ts`。
- 类型名使用单数实体名，例如 `User`、`Product`。

### 产物类型 suffix

artifact suffix 使用复数：

```text
users.types.ts
users.schemas.ts
users.constants.ts
users.mappers.ts
users.requests.ts
users.queries.ts
users.mutations.ts
users.operations.ts
```

不推荐：

```text
users.type.ts
users.schema.ts
users.constant.ts
users.mapper.ts
```

### React Components 与 CSS Modules

```text
user-form.tsx
users-table.tsx
product-card.tsx

user-form.module.css
users-table.module.css
product-card.module.css
```

规则：

- 默认优先使用 Tailwind CSS。
- Tailwind CSS 不适合时，再使用 CSS Modules。
- CSS Modules 文件使用 `<component>.module.css`。
- 不默认使用 `style.css`、`styles.css`、`style.module.css`。
- 全局样式放在 `src/styles/`。
- CSS Modules locals 使用 `camelCase`。

### Models 命名

文件：

```text
users.types.ts
users.schemas.ts
users.constants.ts
users.mappers.ts
users.guards.ts
users.fixtures.ts
users.factories.ts
```

类型：

```ts
type User = ...
type UserId = ...
type UserListItem = ...
type UserDto = ...
```

暂不固化：

- OpenAPI generated types 的完整 alias 命名。
- request body / response body / query params / path params / headers 的细粒度 DTO 命名。
- `schemas` / `types` / `constants` 的 single source of truth。

### API 命名

文件：

```text
users.requests.ts
users.queries.ts
users.mutations.ts
users.operations.ts
```

Request functions:

```ts
listUsers();
getUser();
createUser();
updateUser();
replaceUser();
patchUser();
deleteUser();
activateUser();
archiveUser();
bulkDeleteUsers();
bulkUpdateUsersStatus();
executeUsersBatch();
```

### Form 命名

```ts
type UserFormValues = ...
type CreateUserFormValues = ...
type UpdateUserFormValues = ...
```

### Schema 命名

```ts
const userSchema = ...
const userDtoSchema = ...
const usersQueryParamsSchema = ...
const createUserFormValuesSchema = ...
```

### Mapper 命名

```ts
mapUserDtoToUser();
mapUsersDtoToUsers();
mapUserFormValuesToCreateUserRequestBodyDto();
mapUserFormValuesToUpdateUserRequestBodyDto();
```

### TanStack Query 命名

```ts
const usersQueries = ...
const usersMutations = ...

useUsersQuery()
useUserQuery()
useCreateUserMutation()
useUpdateUserMutation()
useBulkDeleteUsersMutation()
```

### Test File 命名

```text
users.mappers.test.ts
user-form.test.tsx
users.spec.ts
```

规则：

- Vitest 使用 `*.test.ts` / `*.test.tsx`。
- Playwright 使用 `*.spec.ts`。
- 不使用 `*.tests.ts`。
- 不使用 `*.testing.tsx`。

## 实现约定

### Imports 与 Barrel Files

- 默认使用 direct imports。
- 不默认创建 feature-level `index.ts` public API。
- 不默认创建全局聚合 barrel files。
- 不默认使用 `export *` 聚合整个目录。
- 允许小范围 module entry，但必须代表真实模块边界。
- import 语句必须遵守结构章节定义的依赖方向。

### Routing 实现

- routes 使用 lazy route objects。
- route-level errors 使用 `RouteErrorBoundary`。
- 新增 route 时沿用现有 lazy route object structure。
- feature components 不直接定义全局 route tree。

### App Composition 实现

- `src/index.tsx` 只负责 bootstrap React。
- `src/app/index.tsx` 负责 app composition。
- cross-cutting providers 从 `src/app/providers/` 组合。
- shared 和 features 不反向依赖 app layer。

### i18n 实现

- user-facing text 使用 i18n resources。
- locale resources 放在 `src/locales/`。
- generated i18next types 放在 `src/@types/`。
- 修改文案、translation keys 或 locale resources 后，运行 extraction、type generation 和 i18n checks。

### Styling 实现

- 默认优先使用 Tailwind CSS。
- CSS / CSS Modules 只作为 fallback。
- conditional class name composition 优先使用 `src/utils/cn.ts`。

### Assets 实现

- static public assets 放在 `public/`。
- 需要 bundler processing、hashing 或 React component usage 的 assets 放在 `src/assets/` 或 `src/**/assets/`。
- feature-specific assets 靠近 feature。
- SVG 默认沿用项目的 React component import 约定。

### API Requests

- 一个 resource 的常规 endpoints 默认放在同一个 `<resource>.requests.ts`。
- 不默认一个 endpoint 一个文件。
- 当 resource 的 request functions 明显过多或存在独立子资源时，再拆分。
- `*.requests.ts` 对外默认返回 frontend model，而不是 raw DTO。
- canonical DTO-to-model mapping 默认在 `*.requests.ts` 中完成。
- mapping 逻辑本身放在 `models/*.mappers.ts`。

### API Operations

- 多个 API requests 组成的 function 默认放在 `*.operations.ts`。
- operations 可以调用多个 `*.requests.ts` 中的 request functions。
- operations 不直接承载 UI side effects。
- operations 不依赖 React。
- 如果组合逻辑只服务一个 mutation hook，优先靠近该 mutation；可复用后再提升为 operation。

### TanStack Query Queries

- 使用 resource-level query factory。
- 使用 `queryOptions` 管理 queryKey 和 queryFn。
- query key hierarchy 与 queryOptions colocate 在 `<resource>.queries.ts`。
- 不默认创建 standalone `keys.ts`。
- query hooks 调用 query factory。
- `select` 只用于 view-specific projection 或订阅优化，不作为 canonical DTO mapping 的默认位置。

### TanStack Query Mutations

- 同一 resource 的 mutations 默认放在 `<resource>.mutations.ts`。
- mutation hooks 调用 `*.requests.ts` 或 `*.operations.ts`。
- cache invalidation / cache update 与 mutation colocate。
- queries 和 mutations 默认拆文件。
- request function 和对应 TanStack Query hook 默认不放在同一个文件。

## 暂不纳入本次正式规范

- Type-only imports 规则。
- `schemas` / `types` / `constants` 的 single source of truth。
- OpenAPI generated types 的完整 alias 命名体系。
- `ListUsersResponseDto` vs `ListUsersResponseBodyDto` 等细粒度 DTO 命名。
- `CreateUserRequestDto` vs `CreateUserRequestBodyDto` 等细粒度 request body 命名。
- `config/` vs `configs/` vs `constants/` 的完整边界。
- 完整技术栈清单。
- 是否需要对 `services/` 进行更严格的禁用规则。
