# Conventions

- [Conventions](#conventions)
  - [总体原则](#总体原则)
    - [Shared Code 与 Feature-Specific Code 分离](#shared-code-与-feature-specific-code-分离)
    - [依赖方向单向流动](#依赖方向单向流动)
    - [Feature 保持可维护、可删除](#feature-保持可维护可删除)
    - [目录服务真实 Concern](#目录服务真实-concern)
  - [结构](#结构)
    - [项目根目录](#项目根目录)
    - [`src/` 目录职责](#src-目录职责)
    - [`src/app/`](#srcapp)
    - [`src/routes/`](#srcroutes)
    - [`src/components/`](#srccomponents)
    - [`providers/`](#providers)
    - [`features/*/`](#features)
    - [`models/`](#models)
    - [`api/`](#api)
    - [Routing 与 App Composition](#routing-与-app-composition)
    - [Testing](#testing)
  - [命名](#命名)
    - [目录名与文件名](#目录名与文件名)
    - [可数资源与不可数概念](#可数资源与不可数概念)
    - [产物类型 Suffix](#产物类型-suffix)
    - [React Components 与 CSS Modules](#react-components-与-css-modules)
    - [Models 命名](#models-命名)
    - [API 命名](#api-命名)
    - [Form 命名](#form-命名)
    - [Schema 命名](#schema-命名)
    - [Mapper 命名](#mapper-命名)
    - [TanStack Query 命名](#tanstack-query-命名)
    - [Test File 命名](#test-file-命名)
  - [实现约定](#实现约定)
    - [Imports 与 Barrel Files](#imports-与-barrel-files)
    - [Routing](#routing)
    - [App Composition](#app-composition)
    - [i18n](#i18n)
    - [Styling](#styling)
    - [Assets](#assets)
    - [API Requests](#api-requests)
    - [API Operations](#api-operations)
    - [TanStack Query Queries](#tanstack-query-queries)
    - [TanStack Query Mutations](#tanstack-query-mutations)

本文档定义 React SPA / CSR 企业级中后台项目的目录结构、命名体系和实现约定。本文档只描述会影响长期维护的工程规范；项目用途、安装、运行、构建、测试命令、Docker 使用等操作性内容由 [`README.md`](../README.md) 承担。

本文档面向人类开发者和 AI coding agents。新增代码、移动文件、创建目录、引入抽象、组织 API 与 models 时，应优先遵守本文档。

## 总体原则

### Shared Code 与 Feature-Specific Code 分离

共享代码和业务 feature 代码必须分开。共享目录必须有明确职责，不能成为无法判断归属的杂物区。

feature-specific 代码默认靠近所属 feature。只有当代码被多个 features 复用，且职责稳定、边界清晰时，才提升到 `src/` 下的 shared 目录。

### 依赖方向单向流动

代码依赖方向应保持单向：

```text
shared -> features -> app/routes
```

规则：

- shared code 不依赖 `src/features/*/`。
- features 不依赖 `src/app/`。
- features 之间不直接互相 import。
- `app/routes` 负责组合 shared code 与 features。
- 如果两个 features 需要共享代码，应将共享部分提升到 shared 目录，或在 app/routes 层组合，而不是让 features 互相依赖。

### Feature 保持可维护、可删除

一个 feature 应尽量是独立业务单元。删除一个 feature 时，理想影响范围应主要集中在组合它的 routes/app 层。

如果删除一个 feature 会导致大量其他 features 破坏，说明 feature 边界已经泄漏。此时应重新判断相关代码是否属于 shared code，或是否应在 app/routes 层组合。

### 目录服务真实 Concern

不要为每个 feature 机械创建所有可能目录。目录必须对应真实职责、真实代码和真实维护边界。

只有当文件数量、职责边界或协作成本证明有必要时，才创建或拆分目录。空目录、预留目录和过早分层会增加团队理解成本。

## 结构

### 项目根目录

项目根目录只保留项目级配置、文档、脚本、静态资源、源码入口等内容。以下目录和文件是常见集合，不表示所有项目都必须创建。

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

职责：

- `.github/`：GitHub workflows、issue templates、pull request templates 等平台配置。
- `.husky/`：Git hooks。仅在启用 Husky 时存在。
- `.vscode/`：团队共享且低争议的编辑器配置。
- `config/`：项目级工具配置拆分目录。非必要不创建。
- `docs/`：项目文档。
- `e2e/`：end-to-end tests。仅在启用 Playwright 或同类工具时创建。
- `public/`：不经 bundler 处理的静态资源。
- `scripts/`：项目维护、代码生成、检查、发布脚本。非必要不创建。
- `src/`：应用源代码。
- `AGENTS.md`：coding agents 的仓库约束。
- `README.md`：项目用途、安装、运行、构建、测试、Docker 等使用说明。
- `package.json`：依赖、scripts、package manager、engines 等包配置。
- `tsconfig.json`：TypeScript 根配置。
- `vite.config.ts`：Vite 配置。

### `src/` 目录职责

以下目录和文件是常见集合，不表示所有项目都必须创建。

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

默认常用目录：

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
- `testing/`：测试工具、custom render、test setup helpers。
- `index.tsx`：React bootstrap entry。

按业务复杂度创建的目录：

- `features/`：业务 feature 的主要组织位置。
- `models/`：跨 feature 共享的前端数据模型及其边界转换。
- `api/`：跨 feature 共享的 API requests、queries、mutations、operations。
- `hooks/`：跨 feature 复用的 React hooks。
- `helpers/`：项目内部、语义较具体、难以归入 `utils/` 或 `lib/` 的辅助函数。
- `mocks/`：MSW handlers、开发 mock、测试 mock。仅在启用 mock 方案时创建。

非默认或需谨慎创建的目录：

- `services/`：仅用于明确的应用级 orchestration services；不作为 API request functions 的默认目录。
- `stores/`：仅在引入 client state store 技术并存在跨 feature client state 时创建。

### `src/app/`

`src/app/` 是应用组合层，不是业务 feature 层，也不是 shared component 层。

推荐结构：

```text
app/
├── providers/
├── index.tsx
└── routes.tsx
```

职责：

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

### `src/routes/`

`src/routes/` 存放 route-level components。

示例：

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

### `src/components/`

`src/components/` 存放跨 feature 复用的 UI components，不依赖业务 feature。

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

- `feedback/`：仅在存在跨 feature 复用的 toast、empty state、result、loading 等展示组件时创建。

### `providers/`

`providers/` 表示 provider composition，默认放在 `src/app/providers/`。

仅组合第三方 provider 或全局 provider 时，不创建单独的顶层目录。feature-specific provider 应靠近对应 feature。

### `features/*/`

feature 内同名目录复用 `src/` 下目录职责，只是作用域收窄到当前 feature。

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

### `models/`

`models/` 存放前端对业务资源、API 数据、表单数据、运行时校验、数据转换的纯模型代码。

职责边界：

- 可以包含 frontend model types。
- 可以包含 API DTO types。
- 可以包含 form value types。
- 可以包含 schemas。
- 可以包含 constants。
- 可以包含 mappers。
- 可以包含 type guards。
- 可以包含 fixtures。
- 可以包含 factories。
- 可以被 `api/`、components、hooks、routes 使用。
- 不依赖 `api/`。
- 不包含网络请求。
- 不包含 TanStack Query hooks。
- 不包含 React components。
- 不包含 route composition。
- 不包含 UI side effects。

默认使用 flat resource-prefixed files：

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

说明：

- `*.guards.ts`：纯 type guards 或 narrow functions。
- `*.fixtures.ts`：测试或开发 fixtures。不能进入运行主路径。
- `*.factories.ts`：测试或开发数据工厂。不能进入运行主路径。
- `*.test.ts`：colocated unit tests。
- `*.formatters.ts`：仅在是领域数据格式化且无 UI 依赖时才考虑；UI 展示格式化应靠近 UI。

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

升级后示例：

```text
models/
└── users/
    ├── users.types.ts
    ├── users.schemas.ts
    ├── users.constants.ts
    ├── users.mappers.ts
    ├── users.guards.ts
    ├── users.fixtures.ts
    └── users.mappers.test.ts
```

### `api/`

`api/` 存放 API request functions、TanStack Query queries、TanStack Query mutations，以及由多个 API requests 组成的 operations。

feature-specific API 默认放在 `features/*/api/`。多个 features 共享的 API 代码才提升到 `src/api/`。

默认使用 resource-level files：

```text
api/
├── users.requests.ts
├── users.queries.ts
├── users.mutations.ts
└── users.operations.ts
```

职责边界：

- `*.requests.ts`：纯 API request functions。
- `*.queries.ts`：TanStack Query `queryOptions`、query factory、query hooks。
- `*.mutations.ts`：`mutationOptions`、mutation hooks、cache invalidation/update。
- `*.operations.ts`：多个 request functions 组成的 async operations。

不默认使用：

- `*.endpoints.ts`。
- `*.api.ts`。
- `*.services.ts`。

### Routing 与 App Composition

路由定义和应用组合使用固定位置：

- route definitions 放在 `src/app/routes.tsx`。
- route-level components 放在 `src/routes/`。
- application bootstrap entry 放在 `src/index.tsx`。
- application composition entry 放在 `src/app/index.tsx`。
- cross-cutting providers 放在 `src/app/providers/`。

### Testing

unit/component tests 默认 colocate 到被测试文件附近。

测试支持代码按职责放置：

- `src/testing/` 放测试工具、custom render、test setup helpers。
- `e2e/` 仅在启用 Playwright 或同类工具时创建。
- 不默认使用 `__tests__/`。

## 命名

### 目录名与文件名

目录名和文件名应保持清晰、稳定、语义明确、可搜索、可推断。

规则：

- 目录名使用 `lowercase` / `kebab-case`，包括 React components 和 hooks 目录和文件。
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
traffic
```

规则：

- 文件名前缀通常跟随 resource 复数形式，例如 `users.types.ts`。
- 类型名使用单数实体名，例如 `User`、`Product`。

### 产物类型 Suffix

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

React component 文件名使用 `kebab-case`：

```text
user-form.tsx
users-table.tsx
product-card.tsx
```

Component-scoped CSS Modules 使用 `<component>.module.css`：

```text
user-form.module.css
users-table.module.css
product-card.module.css
```

规则：

- 默认优先使用 Tailwind CSS。
- Tailwind CSS 不适合时，再使用 CSS Modules。
- 不默认使用 `style.css`、`styles.css`、`style.module.css`。
- 全局样式放在 `src/styles/`。
- CSS Modules locals 使用 `camelCase`。

### Models 命名

model artifact 文件：

```text
users.types.ts
users.schemas.ts
users.constants.ts
users.mappers.ts
users.guards.ts
users.fixtures.ts
users.factories.ts
```

model 类型：

```ts
type User = ...
type UserId = ...
type UserListItem = ...
type UserDto = ...
```

规则：

- `User` 表示前端 canonical model。
- `UserId` 表示 resource id。
- `UserListItem` 只在列表项结构确实不同于 `User` 时使用。
- `UserDto` 表示 API 原始数据结构。
- 使用 `Dto`，不使用全大写 `DTO`。

暂不固化：

- OpenAPI generated types 的完整 alias 命名。
- request body / response body / query params / path params / headers 的细粒度 DTO 命名。
- `schemas` / `types` / `constants` 的 single source of truth。

### API 命名

API artifact 文件：

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

规则：

- collection read 使用 `list<ResourcePlural>`。
- detail read 使用 `get<ResourceSingular>`。
- create 使用 `create<ResourceSingular>`。
- generic update 使用 `update<ResourceSingular>`。
- full replacement 语义明确时使用 `replace<ResourceSingular>`。
- partial update 语义明确时使用 `patch<ResourceSingular>`。
- delete 使用 `delete<ResourceSingular>`。
- 业务动作使用业务动词。
- 同质批量操作使用 `bulk<Action><ResourcePlural>`。
- 异质批处理使用 `execute<ResourcePlural>Batch`。
- 不默认使用 HTTP method 命名，例如 `putUser()`。
- 不默认使用 `fetchUsers()`。

### Form 命名

表单状态结构使用 `*FormValues`：

```ts
type UserFormValues = ...
type CreateUserFormValues = ...
type UpdateUserFormValues = ...
```

规则：

- `UserFormValues` 表示通用表单状态结构。
- create/update 表单结构不同，则拆成 `Create*FormValues` 和 `Update*FormValues`。
- form values 到 request body 的转换使用 mapper。

### Schema 命名

schema value 使用 `camelCase`，并以 `Schema` 结尾：

```ts
const userSchema = ...
const userDtoSchema = ...
const usersQueryParamsSchema = ...
const createUserFormValuesSchema = ...
```

规则：

- 本节不绑定具体 schema library。
- 本节不定义 schema-first 或 type-first。
- schema 命名应表达它校验的数据边界。

### Mapper 命名

mapper 使用 `map<Source>To<Target>`：

```ts
mapUserDtoToUser();
mapUsersDtoToUsers();
mapUserFormValuesToCreateUserRequestBodyDto();
mapUserFormValuesToUpdateUserRequestBodyDto();
```

规则：

- mapper 是纯函数。
- mapper 默认放在 `models/*.mappers.ts`。
- 展示格式化不使用 `map`，应使用 `format`。

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

规则：

- query factory 使用 `<resourcePlural>Queries`。
- mutation factory 使用 `<resourcePlural>Mutations`。
- query hook 使用 `use<Resource>Query`。
- mutation hook 使用 `use<Action><Resource>Mutation`。
- query key hierarchy 与 `queryOptions` 放在同一个 `*.queries.ts` 中。

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

默认使用 direct imports。

规则：

- 不默认创建 feature-level `index.ts` public API。
- 不默认创建全局聚合 barrel files。
- 不默认使用 `export *` 聚合整个目录。
- 允许小范围 module entry，但必须代表真实模块边界。
- import 语句必须遵守结构章节定义的依赖方向。

可接受的小范围 module entry 示例：

```text
src/lib/request/index.ts
src/components/ui/app-loader/index.ts
```

这些文件应代表稳定模块入口，而不是把目录内所有文件无差别 re-export。

### Routing

当前 routes 使用 lazy route objects，并使用 `RouteErrorBoundary` 处理 route-level errors。

规则：

- 新增 route 时沿用现有 lazy route object structure。
- feature components 不直接定义全局 route tree。
- route-level components 保持薄，复杂业务 UI 下沉到 features 或 shared components。

如果未来迁移到 TanStack Router file-based routing，应在迁移实现完成后同步更新本节和相关目录结构，不提前固化未落地的 file router 规则。

### App Composition

`src/index.tsx` 只负责 bootstrap React。`src/app/index.tsx` 负责 app composition。

规则：

- cross-cutting providers 从 `src/app/providers/` 组合。
- shared 和 features 不反向依赖 app layer。
- app layer 可以组合 routes、providers、global boundaries 和 feature entry components。

### i18n

用户可见文案应使用 i18n resources，不直接写 literal strings。

位置：

- locale resources 放在 `src/locales/`。
- generated i18next types 放在 `src/@types/`。
- i18next config 放在 `i18next.config.ts`。

修改 user-facing text、translation keys 或 locale resources 后，运行：

```bash
pnpm run i18n:extract
pnpm run i18n:types
pnpm run lint:i18n
```

### Styling

默认优先使用 Tailwind CSS。

规则：

- CSS / CSS Modules 只作为 fallback。
- CSS Modules 用于复杂 scoped styles、第三方样式隔离、Tailwind CSS 难以清晰表达的局部样式。
- global style entry points 放在 `src/styles/`。
- conditional class name composition 优先使用 `src/utils/cn.ts`。
- CSS Modules locals 使用 `camelCase`。

### Assets

静态资源按处理方式和 ownership 放置。

规则：

- static public assets 放在 `public/`。
- 需要 bundler processing、hashing 或 React component usage 的 assets 放在 `src/assets/` 或 `src/**/assets/`。
- feature-specific assets 靠近 feature。
- SVG 默认沿用项目的 React component import 约定。

### API Requests

一个 resource 的常规 endpoints 默认放在同一个 `<resource>.requests.ts`。不默认一个 endpoint 一个文件。

规则：

- 当 resource 的 request functions 明显过多或存在独立子资源时，再拆分。
- `*.requests.ts` 对外默认返回 frontend model，而不是 raw DTO。
- canonical DTO-to-model mapping 默认在 `*.requests.ts` 中完成。
- mapping 逻辑本身放在 `models/*.mappers.ts`。

示例：

```ts
export async function listUsers(): Promise<User[]> {
  const response = await request<ListUsersResponseDto>(...);

  return response.data.map(mapUserDtoToUser);
}
```

### API Operations

多个 API requests 组成的 function 默认放在 `*.operations.ts`。

规则：

- operations 可以调用多个 `*.requests.ts` 中的 request functions。
- operations 不直接承载 UI side effects。
- operations 不依赖 React。
- 如果组合逻辑只服务一个 mutation hook，优先靠近该 mutation；可复用后再提升为 operation。

### TanStack Query Queries

queries 使用 resource-level query factory。

规则：

- 使用 `queryOptions` 管理 queryKey 和 queryFn。
- query key hierarchy 与 queryOptions colocate 在 `<resource>.queries.ts`。
- 不默认创建 standalone `keys.ts`。
- query hooks 调用 query factory。
- `select` 只用于 view-specific projection 或订阅优化，不作为 canonical DTO mapping 的默认位置。

示例：

```ts
export const usersQueries = {
  all: () => ['users'] as const,

  lists: () => [...usersQueries.all(), 'list'] as const,

  list: (params: ListUsersQueryParams) =>
    queryOptions({
      queryKey: [...usersQueries.lists(), params],
      queryFn: () => listUsers(params),
    }),

  detail: (userId: UserId) =>
    queryOptions({
      queryKey: [...usersQueries.all(), 'detail', userId],
      queryFn: () => getUser(userId),
    }),
};
```

### TanStack Query Mutations

同一 resource 的 mutations 默认放在 `<resource>.mutations.ts`。

规则：

- mutation hooks 调用 `*.requests.ts` 或 `*.operations.ts`。
- cache invalidation / cache update 与 mutation colocate。
- queries 和 mutations 默认拆文件。
- request function 和对应 TanStack Query hook 默认不放在同一个文件。
