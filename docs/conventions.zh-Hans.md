# Conventions

- [Conventions](#conventions)
  - [总体原则](#总体原则)
  - [全局命名规则](#全局命名规则)
    - [Constants](#constants)
    - [Schemas](#schemas)
  - [项目结构总览](#项目结构总览)
  - [`app/`](#app)
  - [`routes/`](#routes)
  - [`features/`](#features)
  - [`models/`](#models)
  - [`api/`](#api)
  - [`components/`](#components)
  - [`lib/`、`utils/`、`helpers/`](#libutilshelpers)
  - [`config/`](#config)
  - [Cross-Cutting Rules](#cross-cutting-rules)
  - [Reference](#reference)

本文档定义目录结构、命名体系和实现约定。安装、运行、构建、测试命令、Docker 使用等操作性内容由 [`README.md`](../README.md) 承担。

## 总体原则

**代码分层：** 共享代码和业务 feature 代码必须分开。shared 目录必须有明确职责，不能成为无法判断归属的杂物区。

**依赖方向：** 代码依赖方向保持单向。

```text
shared -> features -> app/routes
```

规则：

- shared code 不依赖 `src/features/*/`
- features 不依赖 `src/app/`
- features 之间不直接互相 import
- `app/routes` 负责组合 shared code 与 features
- 跨 feature 复用的代码应提升到 shared 目录，或在 app/routes 层组合

**Feature 边界：** 一个 feature 应尽量是独立业务单元。删除一个 feature 时，理想影响范围应主要集中在组合它的 routes/app 层。

**目录创建：** 不为每个 feature 机械创建所有可能目录。目录必须对应真实职责、真实代码和真实维护边界。

## 全局命名规则

**目录名与文件名：**

- 目录名使用 lowercase / `kebab-case`
- React component 目录和文件使用 `kebab-case`
- 不使用 `PascalCase` component 文件名
- resource 文件名使用 resource name + artifact suffix
- `-` 用于连接同一命名主体内的多个单词，例如 `user-form.tsx`
- `.` 用于分隔命名主体、产物类型、测试后缀、CSS Modules 后缀，例如 `users.types.ts`、`user-form.test.tsx`、`user-form.module.css`
- 普通单一职责模块可以使用简短文件名，例如 `env.ts`、`cn.ts`、`index.ts`

常见模式：

```text
<resource>.<artifact>.ts
<resource>.<artifact>.test.ts
<component>.tsx
<component>.test.tsx
<component>.module.css
```

**可数资源与不可数概念：**

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

- 文件名前缀通常跟随 resource 复数形式，例如 `users.types.ts`
- 类型名使用单数实体名，例如 `User`、`Product`

**Artifact suffix：**

artifact suffix 使用复数：

```text
users.types.ts
users.schemas.ts
users.requests.ts
```

不推荐：

```text
users.type.ts
users.schema.ts
users.request.ts
```

常用 artifact suffix：

- `constants`
- `factories`
- `fixtures`
- `guards`
- `mappers`
- `mutations`
- `operations`
- `queries`
- `requests`
- `schemas`
- `types`

**Test file suffix：**

- Vitest 使用 `*.test.ts` / `*.test.tsx`
- Playwright 使用 `*.spec.ts`
- 不使用 `*.tests.ts`
- 不使用 `*.testing.tsx`

**CSS Modules suffix：**

- component-scoped CSS Modules 使用 `<component>.module.css`
- 不默认使用 `style.css`、`styles.css`、`style.module.css`

### Constants

- constants 文件使用 `.constants.ts`
- resource-level constants 使用 `<resource>.constants.ts`
- component-local constants 使用 `<component>.constants.ts`
- 普通 exported constants 默认使用 `camelCase`
- 真正常量语义强、不会按业务对象演化的 primitive constants 可以使用 `UPPER_SNAKE_CASE`

```ts
export const userStatusOptions = ...
export const DEFAULT_PAGE_SIZE = 20;
```

### Schemas

- schema value 使用 `camelCase`
- schema 名称以 `Schema` 结尾
- schema 命名应表达它校验的数据边界
- 本文档不绑定具体 schema library

```ts
const userSchema = ...
const usersQueryParamsSchema = ...
const createUserFormValuesSchema = ...
```

## 项目结构总览

项目根目录只保留项目级配置、文档、脚本、静态资源、源码入口等内容。目录在前，文件在后；同类条目按字母顺序排序。

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

- `.github/`：GitHub workflows、issue templates、pull request templates 等平台配置
- `.husky/`：Git hooks，仅在启用 Husky 时存在
- `.vscode/`：团队共享且低争议的编辑器配置
- `config/`：项目级工具配置拆分目录，非必要不创建
- `docs/`：项目文档
- `e2e/`：end-to-end tests，仅在启用 Playwright 或同类工具时创建
- `public/`：不经 bundler 处理的静态资源
- `scripts/`：项目维护、代码生成、检查、发布脚本，非必要不创建
- `src/`：应用源代码
- `AGENTS.md`：coding agents 的仓库约束
- `README.md`：项目用途、安装、运行、构建、测试、Docker 等使用说明
- `package.json`：依赖、scripts、package manager、engines 等包配置
- `tsconfig.json`：TypeScript 根配置
- `vite.config.ts`：Vite 配置

`src/` 下的常见目录和文件：

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

- `@types/`：全局类型声明、工具生成声明
- `api/`：跨 feature 共享的 API requests、queries、mutations、operations
- `app/`：应用组合层
- `assets/`：应用级 bundled assets
- `components/`：跨 feature 复用的 UI components
- `config/`：运行时配置、环境变量解析、应用级配置对象
- `features/`：业务 feature 的主要组织位置
- `helpers/`：项目内部、语义较具体、难以归入 `utils/` 或 `lib/` 的辅助函数
- `hooks/`：跨 feature 复用的 React hooks
- `lib/`：第三方库适配、基础设施封装、配置后的 clients
- `locales/`：i18n resources
- `mocks/`：MSW handlers、开发 mock、测试 mock，仅在启用 mock 方案时创建
- `models/`：跨 feature 共享的前端数据模型及其边界转换
- `routes/`：route-level components
- `services/`：明确的应用级 orchestration services，非必要不创建
- `stores/`：跨 feature client state stores，仅在引入对应状态管理方案时创建
- `styles/`：全局样式入口、Tailwind CSS 入口、全局 CSS
- `testing/`：测试工具、custom render、test setup helpers
- `utils/`：通用、纯函数、低业务语义的工具函数
- `index.tsx`：React bootstrap entry

## `app/`

**Purpose:** `src/app/` 是应用组合层，不是业务 feature 层，也不是 shared component 层。

**Structure:**

```text
app/
├── providers/
├── index.tsx
└── routes.tsx
```

- `providers/`：cross-cutting provider composition
- `index.tsx`：application composition entry
- `routes.tsx`：route definitions

**Implementation rules:**

- `src/index.tsx` 只负责 bootstrap React
- `src/app/index.tsx` 负责 app composition
- `src/app/routes.tsx` 负责 route definitions
- `src/app/providers/` 负责组合全局 providers
- route definitions 使用 lazy route objects
- app layer 可以组合 routes、providers、global boundaries 和 feature entry components
- shared 和 features 不反向依赖 app layer
- 不在 `src/app/` 放业务 resource models、feature-specific components、API request functions 或通用 UI components
- `services/` 和 `stores/` 不作为 `src/app/` 默认子目录

**Anti-patterns:**

- 在 `src/app/` 写业务页面内部 UI
- 在 `src/app/` 放 resource types、schemas、mappers
- 在 `src/app/` 发起 API requests
- 把 feature-specific provider 提升到 `src/app/providers/`

如果未来迁移到 TanStack Router file-based routing，应在迁移实现完成后同步更新本节和相关目录结构。

## `routes/`

**Purpose:** `src/routes/` 存放 route-level components。

**Structure:**

```text
routes/
├── errors/
│   └── not-found.tsx
└── root/
    └── root.tsx
```

**Implementation rules:**

- route-level components 可以组合 features 和 shared components
- route-level components 应保持薄，不承载复杂业务 UI
- 复杂业务 UI 应放入 `features/*/components/` 或 `src/components/`
- route-level components 不作为跨 feature 复用组件目录
- route-level components 不直接定义业务 resource models
- route-level errors 使用 `RouteErrorBoundary`

**Anti-patterns:**

- 在 route-level component 中堆积复杂表单、表格、业务流程
- 从 `src/routes/` 导出共享 UI 给 features 使用
- 在 route-level component 中定义 resource model 或 mapper

## `features/`

**Purpose:** `features/*/` 存放某个业务 feature 私有的代码。feature 内同名目录复用 `src/` 下目录职责，只是作用域收窄到当前 feature。

**Structure:**

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

**Implementation rules:**

- `api/` 和 `models/` 在 feature 内只服务当前 feature
- `services/` 仅在当前 feature 存在明确 orchestration service 时创建
- `stores/` 仅在当前 feature 存在独立 client state store 时创建
- `styles/` 默认不创建；只有需要 feature-level CSS / CSS Modules 时创建
- features 之间不直接互相 import
- 跨 feature 复用的代码提升到 shared 目录，或在 app/routes 层组合

**Anti-patterns:**

- `features/users` 直接 import `features/products`
- 每个 feature 都机械创建完整目录树
- 把共享 UI 长期留在某个 feature 内让其他 features 引用
- 把 app-level provider、router 或 global boundary 放进 feature

## `models/`

**Purpose:** `models/` 存放前端对业务资源、API 数据、表单数据、运行时校验、数据转换的纯模型代码。

**Structure:**

```text
models/
├── users.constants.ts
├── users.mappers.ts
├── users.schemas.ts
└── users.types.ts
```

可以包含：

- frontend model types
- API DTO types
- form value types
- schemas
- constants
- mappers
- type guards
- fixtures
- factories
- colocated unit tests

**Naming:**

model artifacts 使用 resource name + artifact suffix：

```text
users.types.ts
users.schemas.ts
users.mappers.ts
```

常见 model artifacts：

- `constants`
- `factories`
- `fixtures`
- `guards`
- `mappers`
- `schemas`
- `types`

model 类型：

```ts
type User = ...
type UserId = ...
type UserListItem = ...
type UserDto = ...
```

规则：

- `User` 表示前端 canonical model
- `UserId` 表示 resource id
- `UserListItem` 只在列表项结构确实不同于 `User` 时使用
- `UserDto` 表示 API 原始数据结构
- 使用 `Dto`，不使用全大写 `DTO`

**Constants:**

```text
users.constants.ts
```

- resource-level constants 放在 `models/*.constants.ts`
- 普通 exported constants 默认使用 `camelCase`
- 真正常量语义强、不会按业务对象演化的 primitive constants 可以使用 `UPPER_SNAKE_CASE`

```ts
export const userStatusOptions = ...
export const DEFAULT_PAGE_SIZE = 20;
```

**Schemas:**

schema value 使用 `camelCase`，并以 `Schema` 结尾：

```ts
const userSchema = ...
const usersQueryParamsSchema = ...
const createUserFormValuesSchema = ...
```

规则：

- 本节不绑定具体 schema library
- 本节不定义 schema-first 或 type-first
- schema 命名应表达它校验的数据边界

**Mappers:**

mapper 使用 `map<Source>To<Target>`：

```ts
mapUserDtoToUser();
mapUserFormValuesToCreateUserRequestBodyDto();
```

规则：

- mapper 是纯函数
- mapper 默认放在 `models/*.mappers.ts`
- 展示格式化不使用 `map`，应使用 `format`

**Implementation rules:**

- `models/` 可以被 `api/`、components、hooks、routes 使用
- `models/` 不依赖 `api/`
- `models/` 不包含网络请求
- `models/` 不包含 TanStack Query hooks
- `models/` 不包含 React components
- `models/` 不包含 route composition
- `models/` 不包含 UI side effects
- `*.fixtures.ts` 和 `*.factories.ts` 不能进入运行主路径
- UI 展示格式化应靠近 UI；只有无 UI 依赖的领域数据格式化才考虑放入 `models/`

**Anti-patterns:**

- 在 `models/` 中调用 request client
- 在 `models/` 中 import `api/`
- 在 mapper 中触发 toast、navigation、cache invalidation 等 side effects
- 把 UI-only formatting 放进 shared models

## `api/`

**Purpose:** `api/` 存放 API request functions、TanStack Query queries、TanStack Query mutations，以及由多个 API requests 组成的 operations。

feature-specific API 默认放在 `features/*/api/`。多个 features 共享的 API 代码才提升到 `src/api/`。

**Structure:**

```text
api/
├── users.mutations.ts
├── users.operations.ts
├── users.queries.ts
└── users.requests.ts
```

- `*.mutations.ts`：`mutationOptions`、mutation hooks、cache invalidation/update
- `*.operations.ts`：多个 request functions 组成的 async operations
- `*.queries.ts`：TanStack Query `queryOptions`、query factory、query hooks
- `*.requests.ts`：纯 API request functions

不默认使用：

- `*.endpoints.ts`
- `*.api.ts`
- `*.services.ts`

**Request naming:**

Request function 命名与 HTTP method 的默认对应关系：

- `GET /users` -> `listUsers`
- `GET /users/:userId` -> `getUser`
- `POST /users` -> `createUser`
- `PUT /users/:userId` -> `replaceUser`
- `PATCH /users/:userId` -> `patchUser` 或 `updateUser`
- `DELETE /users/:userId` -> `deleteUser`
- `POST /users/:userId/activate` -> `activateUser`

规则：

- collection read 使用 `list<ResourcePlural>`
- detail read 使用 `get<ResourceSingular>`
- create 使用 `create<ResourceSingular>`
- generic update 使用 `update<ResourceSingular>`
- full replacement 语义明确时使用 `replace<ResourceSingular>`
- partial update 语义明确时使用 `patch<ResourceSingular>`
- delete 使用 `delete<ResourceSingular>`
- 业务动作使用业务动词
- 同质批量操作使用 `bulk<Action><ResourcePlural>`
- 异质批处理使用 `execute<ResourcePlural>Batch`
- 不默认使用 HTTP method 命名，例如 `putUser()`
- 不默认使用 `fetchUsers()`

**TanStack Query naming:**

```ts
const usersQueries = ...
const usersMutations = ...

useUsersQuery()
useUserQuery()
useCreateUserMutation()
useBulkDeleteUsersMutation()
```

规则：

- query factory 使用 `<resourcePlural>Queries`
- mutation factory 使用 `<resourcePlural>Mutations`
- query hook 使用 `use<Resource>Query`
- mutation hook 使用 `use<Action><Resource>Mutation`
- query key hierarchy 与 `queryOptions` 放在同一个 `*.queries.ts` 中

**API Requests:**

一个 resource 的常规 endpoints 默认放在同一个 `<resource>.requests.ts`。不默认一个 endpoint 一个文件。

规则：

- 当 resource 的 request functions 明显过多或存在独立子资源时，再拆分
- `*.requests.ts` 对外默认返回 frontend model，而不是 raw DTO
- canonical DTO-to-model mapping 默认在 `*.requests.ts` 中完成
- mapping 逻辑本身放在 `models/*.mappers.ts`

```ts
export async function listUsers(): Promise<User[]> {
  const response = await request<ListUsersResponseDto>(...);

  return response.data.map(mapUserDtoToUser);
}
```

**API Operations:**

多个 API requests 组成的 function 默认放在 `*.operations.ts`。

规则：

- operations 可以调用多个 `*.requests.ts` 中的 request functions
- operations 不直接承载 UI side effects
- operations 不依赖 React
- 如果组合逻辑只服务一个 mutation hook，优先靠近该 mutation；可复用后再提升为 operation

**TanStack Query Queries:**

queries 使用 resource-level query factory。

规则：

- 使用 `queryOptions` 管理 queryKey 和 queryFn
- query key hierarchy 与 queryOptions colocate 在 `<resource>.queries.ts`
- 不默认创建 standalone `keys.ts`
- query hooks 调用 query factory
- `select` 只用于 view-specific projection 或订阅优化，不作为 canonical DTO mapping 的默认位置

```ts
export const usersQueries = {
  all: () => ['users'] as const,

  list: (params: ListUsersQueryParams) =>
    queryOptions({
      queryKey: [...usersQueries.all(), 'list', params],
      queryFn: () => listUsers(params),
    }),
};
```

**TanStack Query Mutations:**

同一 resource 的 mutations 默认放在 `<resource>.mutations.ts`。

规则：

- mutation hooks 调用 `*.requests.ts` 或 `*.operations.ts`
- cache invalidation / cache update 与 mutation colocate
- queries 和 mutations 默认拆文件
- request function 和对应 TanStack Query hook 默认不放在同一个文件

**Anti-patterns:**

- API request function 直接返回 raw DTO 给 UI
- 在 `*.queries.ts` 中重复写 canonical DTO mapping
- 为每个 endpoint 创建一个文件
- 单独创建 standalone `keys.ts` 作为默认模式
- 把 request functions 命名为 `putUser`、`fetchUsers`

## `components/`

**Purpose:** `src/components/` 存放跨 feature 复用的 UI components，不依赖业务 feature。

**Structure:**

```text
components/
├── errors/
├── layouts/
└── ui/
    └── feedback/
```

- `errors/`：共享 error boundary fallback、错误展示 components
- `layouts/`：跨 route 或跨 feature 复用的布局 components
- `ui/`：设计系统基础组件、低业务语义的共享 UI components
- `ui/feedback/`：跨 feature 复用的 toast、empty state、result、loading 等反馈类 UI

按需扩展：

- `forms/`：跨 feature 复用的 form controls 或 form field components
- `navigation/`：跨 feature 复用的 navigation components

**Naming:**

React component 文件名使用 `kebab-case`：

```text
user-form.tsx
users-table.tsx
product-card.tsx
```

Component-local companion files 使用同一个 `<component>` 前缀：

```text
user-form.constants.ts
user-form.helpers.ts
user-form.test.tsx
```

规则：

- `<component>.test.tsx` 放 component tests
- `<component>.helpers.ts` 只放 component-local helper functions
- `<component>.constants.ts` 只放 component-local constants
- 可复用 helper 应提升到 `utils/`、`helpers/` 或 feature/shared owner
- 业务 resource constants 应放到 `models/*.constants.ts`

**CSS Modules:**

component-scoped CSS Modules 使用 `<component>.module.css`：

```text
user-form.module.css
users-table.module.css
```

规则：

- 默认优先使用 Tailwind CSS
- Tailwind CSS 不适合时，再使用 CSS Modules
- 全局样式放在 `src/styles/`
- CSS Modules locals 使用 `camelCase`

**Dependencies:**

- 可以依赖 `src/utils/`、`src/lib/`、`src/hooks/`、`src/models/` 中稳定的 shared code
- 不依赖 `src/features/*/`
- 不承载 feature-specific 业务流程
- 不直接定义 routes
- 不直接发起 API requests

**Anti-patterns:**

- shared component 直接 import 某个 feature
- shared component 内部发起 API request
- 把 feature-specific 业务流程抽到 `src/components/`
- 在 shared component 中硬编码业务 copy 而不走 i18n

## `lib/`、`utils/`、`helpers/`

**Purpose:** 这三个目录都用于共享代码，但语义不同。

- `lib/`：第三方库适配、基础设施封装、配置后的 clients
- `utils/`：通用、纯函数、低业务语义的工具函数
- `helpers/`：项目内部、语义较具体、难以归入 `utils/` 或 `lib/` 的辅助函数

**Examples:**

```text
lib/i18n/
lib/request/
utils/cn.ts
```

**Rules:**

- `lib/` 可以封装 third-party integration 或 configured client
- `utils/` 应尽量保持纯函数和低业务语义
- `helpers/` 不作为杂物目录
- feature-specific helpers 应放在 `features/*/helpers/`

**Anti-patterns:**

- 把业务流程放进 `utils/`
- 把 request client 放进 `utils/`
- 把难以命名的代码统一丢进 `helpers/`

## `config/`

**Purpose:** `config/` 存放运行时配置、环境变量解析、应用级配置对象，或项目级工具配置拆分目录。

**Structure:**

```text
src/config/
└── env.ts
```

**Rules:**

- `src/config/` 用于应用运行时配置
- 根目录 `config/` 用于项目级工具配置拆分
- 业务 resource constants 不放入 `config/`
- 非必要不创建 `configs/`

**Anti-patterns:**

- 把业务枚举值放进 `src/config/`
- 同时创建 `config/` 和 `configs/`
- 把环境变量解析散落在业务代码中

## Cross-Cutting Rules

**Imports 与 Barrel Files：**

- 默认使用 direct imports
- 不默认创建 feature-level `index.ts` public API
- 不默认创建全局聚合 barrel files
- 不默认使用 `export *` 聚合整个目录
- 允许小范围 module entry，但必须代表真实模块边界
- import 语句必须遵守结构章节定义的依赖方向

可接受的小范围 module entry 示例：

```text
src/lib/request/index.ts
src/components/ui/app-loader/index.ts
```

这些文件应代表稳定模块入口，而不是把目录内所有文件无差别 re-export。

**i18n：**

- 用户可见文案应使用 i18n resources，不直接写 literal strings
- locale resources 放在 `src/locales/`
- generated i18next types 放在 `src/@types/`
- i18next config 放在 `i18next.config.ts`

修改 user-facing text、translation keys 或 locale resources 后，运行：

```bash
pnpm run i18n:extract
pnpm run i18n:types
pnpm run lint:i18n
```

**Styling：**

- 默认优先使用 Tailwind CSS
- CSS / CSS Modules 只作为 fallback
- CSS Modules 用于复杂 scoped styles、第三方样式隔离、Tailwind CSS 难以清晰表达的局部样式
- global style entry points 放在 `src/styles/`
- conditional class name composition 优先使用 `src/utils/cn.ts`
- CSS Modules locals 使用 `camelCase`

**Assets：**

- static public assets 放在 `public/`
- 需要 bundler processing、hashing 或 React component usage 的 assets 放在 `src/assets/` 或 `src/**/assets/`
- feature-specific assets 靠近 feature
- SVG 默认沿用项目的 React component import 约定

**Testing：**

- unit/component tests 默认 colocate 到被测试文件附近
- `src/testing/` 放测试工具、custom render、test setup helpers
- `e2e/` 仅在启用 Playwright 或同类工具时创建
- 不默认使用 `__tests__/`

## Reference

**Directory summary:**

```text
src/app/          app composition
src/routes/       route-level components
src/features/     feature-specific code
src/models/       frontend data models and boundary mapping
src/api/          requests, queries, mutations, operations
src/components/   shared UI components
src/lib/          integrations and configured clients
src/utils/        generic pure utilities
src/helpers/      project-specific helper functions
src/config/       runtime configuration
```

**Naming summary:**

```text
users.types.ts
users.schemas.ts
users.constants.ts
users.mappers.ts
users.requests.ts
users.queries.ts
users.mutations.ts
users.operations.ts
user-form.tsx
user-form.test.tsx
user-form.module.css
```

**Not yet standardized：**

- Type-only imports
- `schemas` / `types` / `constants` 的 single source of truth
- OpenAPI generated types 的完整 alias 命名体系
- `ListUsersResponseDto` vs `ListUsersResponseBodyDto`
- `CreateUserRequestDto` vs `CreateUserRequestBodyDto`
- `config/` vs `constants/` 的完整边界
