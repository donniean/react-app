# Conventions

本文档定义项目的目录结构、命名体系和实现约定。

## Normative Keywords

本文档使用 [BCP 14](https://www.rfc-editor.org/info/bcp14/) 风格表达 requirement levels。本文档只使用以下 keywords；只有大写形式具有规范含义。

- `MUST`: absolute requirement.
- `MUST NOT`: absolute prohibition.
- `SHOULD`: recommended default; deviations require clear reason.
- `SHOULD NOT`: not recommended by default; deviations require clear reason.
- `MAY`: permitted, not required.

## Principles

### Layers

Shared code 和 business feature code MUST 分开。Shared code 目录 MUST 有明确职责，MUST NOT 成为无法判断归属的杂物区。

### Import Direction

本文档中的箭头表示「左侧 MAY import 右侧」。未列出的跨层 import SHOULD be treated as disallowed unless a more specific section permits it。

```text
src/index.tsx -> src/app
src/index.tsx -> src/styles
src/index.tsx -> src/lib/i18n
app -> routes
app -> features
app -> shared
routes -> features
routes -> shared
features/<name> -> features/<name>
features/<name> -> shared
api -> models
api -> lib
api -> config
api -> utils
models -> utils
components -> hooks
components -> lib
components -> utils
lib -> config
lib -> utils
hooks -> lib
hooks -> utils
```

- shared code MUST NOT import `src/features/*/`。
- features MUST NOT import `src/app/`。
- features MUST NOT 直接互相 import。
- `app/` 和 `routes/` SHOULD 负责组合 shared code 与 features。
- 跨 feature 复用的代码 SHOULD 提升到 shared 目录，或在 `app/` / `routes/` 层组合。
- `models/` 和 `utils/` MUST NOT import React、routes、API clients、UI components 或 features。
- `components/ui/` MUST NOT import business models、API、features 或 routes。

### Feature Boundaries

一个 feature SHOULD 是独立业务单元。删除一个 feature 时，理想影响范围 SHOULD 主要集中在组合它的 `routes/` / `app/` 层。

### Directory Creation

项目 MUST NOT 为每个 feature 机械创建所有可能目录。目录 MUST 对应真实职责、真实代码和真实维护边界。

## Global Naming

### Directories And Files

- 目录命名方式 MUST 使用 `kebab-case`，除明确例外外 MUST NOT 使用大写字母。
- 文件命名方式 MUST 使用 `kebab-case`，多个主体之间 MAY 使用 `.` 分隔。
- `-` 用于连接同一命名主体内的多个单词，例如 `user-form.tsx`。
- `.` 用于分隔命名主体、产物类型、测试后缀、CSS Modules 后缀，例如 `users.types.ts`、`user-form.test.tsx`、`user-form.module.css`。
- resource 相关文件名 SHOULD 使用 `resource` + `artifact`。
- 普通单一职责模块 MAY 使用简短文件名，例如 `env.ts`、`cn.ts`、`index.ts`。
- React component 和 hook 的目录和文件 MUST 遵循上述规则，MUST NOT 使用 `PascalCase`。

Naming exceptions:

- tool-mandated paths，例如 `.github/`、`.husky/`、`.vscode/`、`src/@types/`。
- BCP 47 locale tags，例如 `zh-Hans/`。
- well-known root files，例如 `README.md`、`AGENTS.md`、`Dockerfile`、`LICENSE`。
- generated files whose names are controlled by the generating tool。

常见模式：

```text
<resource>.<artifact>.ts
<resource>.<artifact>.test.ts
<component>.tsx
<component>.test.tsx
<component>.module.css
```

### Type Names

- Type、interface 和 class names MUST 使用 `PascalCase`。
- Type 和 interface 名称 MUST NOT 使用 `I`、`T` 等匈牙利式前缀。
- 类型名称 SHOULD 表达数据角色或领域含义，例如 `User`、`UserDto`、`UserFormValues`。
- Runtime enum-like values SHOULD 使用 `as const` objects / arrays 加 union types。
- TypeScript `enum` SHOULD NOT be introduced in application source unless generated code or tooling explicitly permits it。

### Resources And Concepts

可数业务资源 SHOULD 使用复数：

```text
users
products
orders
```

不可数名词、能力、领域概念 SHOULD 使用其自然形式：

```text
auth
metadata
traffic
```

- 文件名前缀 SHOULD 跟随 resource 复数形式，例如 `users.types.ts`。
- 类型名 SHOULD 使用单数实体名，例如 `User`、`Product`。

### Artifact Suffixes

artifact suffix 表示一个文件中主要承载的产物类型。它用于让文件名可搜索、可推断，并避免同一 resource 下不同职责的文件混在一起。

artifact suffix SHOULD 使用复数：

```text
users.types.ts
users.schemas.ts
users.requests.ts
```

以下写法 SHOULD NOT 使用：

```text
users.type.ts
users.schema.ts
users.request.ts
```

常用 artifact suffix：

- `constants`：常量、选项表、映射表。
- `factories`：测试或开发数据工厂。
- `fixtures`：测试或开发 fixtures。
- `guards`：type guards 或 narrow functions。
- `mappers`：数据边界转换函数。
- `mutations`：TanStack Query mutations。
- `operations`：多个 request functions 组成的 async operations。
- `queries`：TanStack Query queries。
- `requests`：纯 API request functions。
- `schemas`：运行时校验 schemas。
- `types`：TypeScript types、interfaces、DTOs、form values。

### Test File Suffixes

- Unit / component tests MUST 使用 `*.test.ts` / `*.test.tsx`。
- Playwright e2e tests MUST 使用 `*.spec.ts`。
- 本项目用后缀区分测试层级。即使测试工具支持更多匹配模式，也 SHOULD 按上述后缀收窄。
- MUST NOT 使用 `*.tests.ts`。
- MUST NOT 使用 `*.testing.tsx`。

### CSS Modules Suffixes

- component-scoped CSS Modules MUST 使用 `<component>.module.css`。
- SHOULD NOT use `style.css`、`styles.css`、`style.module.css` by default。

## Project Structure Overview

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

- `.github/`：GitHub workflows、issue templates、pull request templates 等平台配置。
- `.husky/`：Git hooks，仅在启用 Husky 时存在。
- `.vscode/`：团队共享且低争议的编辑器配置。
- `config/`：项目级工具配置拆分目录，非必要不创建。
- `docs/`：项目文档。
- `e2e/`：end-to-end tests，仅在启用 Playwright 或同类工具时创建。
- `public/`：不经 bundler 处理的静态资源。
- `scripts/`：项目维护、代码生成、检查、发布脚本，非必要不创建。
- `src/`：应用源代码。
- `AGENTS.md`：coding agents 的仓库约束。
- `README.md`：项目用途、安装、运行、构建、测试、Docker 等使用说明。
- `package.json`：依赖、scripts、package manager、engines 等包配置。
- `tsconfig.json`：TypeScript 根配置。
- `vite.config.ts`：Vite 配置。

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

- `@types/`：全局类型声明、工具生成声明。
- `api/`：跨 feature 共享的 API requests、queries、mutations、operations。
- `app/`：应用组合层。
- `assets/`：应用级 bundled assets。
- `components/`：跨 feature 复用的 UI components。
- `config/`：运行时配置、环境变量解析、应用级配置对象。
- `features/`：业务 feature 的主要组织位置。
- `helpers/`：project-specific helper functions。
- `hooks/`：跨 feature 复用的 React hooks。
- `lib/`：第三方库适配、基础设施封装、配置后的 clients。
- `locales/`：i18n resources。
- `mocks/`：MSW handlers、开发 mock、测试 mock，仅在启用 mock 方案时创建。
- `models/`：跨 feature 共享的前端数据模型及其边界转换。
- `routes/`：route-level components。
- `services/`：明确的应用级 orchestration services，非必要不创建。
- `stores/`：跨 feature client state stores，仅在引入对应状态管理方案时创建。
- `styles/`：全局样式入口、Tailwind CSS 入口、全局 CSS。
- `testing/`：测试工具、custom render、test setup helpers。
- `utils/`：generic utilities that can be copied across projects。
- `index.tsx`：React bootstrap entry。

## `api/`

### Purpose

`api/` 存放 API request functions、TanStack Query queries、TanStack Query mutations，以及由多个 API requests 组成的 operations。

feature-specific API SHOULD 放在 `features/*/api/`。多个 features 共享的 API 代码才 SHOULD 提升到 `src/api/`。

### Structure

```text
api/
├── users.mutations.ts
├── users.operations.ts
├── users.queries.ts
└── users.requests.ts
```

- `*.mutations.ts`：`mutationOptions`、mutation hooks、cache invalidation/update。
- `*.operations.ts`：多个 request functions 组成的 async operations。
- `*.queries.ts`：TanStack Query `queryOptions`、query factory、query hooks。
- `*.requests.ts`：纯 API request functions。

以下 suffixes SHOULD NOT be used as default choices：

- `*.endpoints.ts`。
- `*.api.ts`。
- `*.services.ts`。

### Naming

API DTO aliases SHOULD 使用命名方式 `<Action><ResourceSingularOrPlural><Something>Dto` ：

- resource DTO：`<ResourceSingular>Dto`。
- path params DTO：`List<ResourcePlural>PathParamsDto`。
- query params DTO：`List<ResourcePlural>QueryParamsDto`。
- request headers DTO：`List<ResourcePlural>RequestHeadersDto`。
- request body DTO：`Create<ResourceSingular>RequestBodyDto`、`Update<ResourceSingular>RequestBodyDto`。
- response body DTO：`List<ResourceSingular>ResponseDto`。
- response envelope DTO：`ListUsersResponseDto`，仅在 API wrapper 或后端协议确实存在 envelope 时使用。

Generated OpenAPI files MUST NOT 手动修改。若生成类型名称过长或不稳定，application-facing aliases MAY 定义在 `models/*.types.ts` 中。

常见请求函数命名：

- `GET` collection read SHOULD 使用 `list<ResourcePlural>`。
- `GET` detail read SHOULD 使用 `get<ResourceSingular>`。
- `POST` create SHOULD 使用 `create<ResourceSingular>`。
- `PATCH` generic update SHOULD 使用 `update<ResourceSingular>`。
- `PUT` full replacement 语义明确时 SHOULD 使用 `replace<ResourceSingular>`。
- `DELETE` delete SHOULD 使用 `delete<ResourceSingular>`。

其他：

- 业务动作 SHOULD 使用业务动词。
- 同质批量操作 SHOULD 使用 `bulk<Action><ResourcePlural>`。
- SHOULD NOT use HTTP method 命名 by default，例如 `putUser()`。
- SHOULD NOT use `fetchUsers()` by default。

TanStack Query 命名：

```ts
const usersQueries = ...
const usersMutations = ...

useUsersQuery()
useUserQuery()
useCreateUserMutation()
useBulkDeleteUsersMutation()
```

- query factory SHOULD 使用 `<resourcePlural>Queries`。
- mutation factory SHOULD 使用 `<resourcePlural>Mutations`。
- query hook SHOULD 使用 `use<Resource>Query`。
- mutation hook SHOULD 使用 `use<Action><Resource>Mutation`。
- query key hierarchy SHOULD 与 `queryOptions` 放在同一个 `*.queries.ts` 中。

### URL Search Terminology

URL 查询相关命名 SHOULD 区分以下概念：

- `queryParams`：对象形式的查询参数集合，表示序列化前的键值对，例如 `{ a: 1, b: 2 }`。
- `queryString`：不带 `?` 的序列化查询串，例如 `a=1&b=2`。
- `search`：带 `?` 的完整查询串，语义对齐 Web 标准 `URL.search`，例如 `?a=1&b=2`。
- `searchParams`：`URLSearchParams` 实例，用于解析与构造查询参数。

`URLSearchParams` 中的 values 在解析或序列化后是 strings。直接调用 constructor 时，SHOULD 传入已序列化的 string values：

```ts
new URLSearchParams({ a: '1', b: '2' });
new URLSearchParams(queryString);
```

### Implementation

一个 resource 的常规 endpoints SHOULD 放在同一个 `<resource>.requests.ts`。SHOULD NOT use one endpoint per file by default。

- 当 resource 的 request functions 明显过多或存在独立子资源时，再拆分。
- `*.requests.ts` SHOULD 对外返回 frontend model，而不是 raw DTO。
- canonical DTO-to-model mapping SHOULD 在 `*.requests.ts` 中完成。
- mapping 逻辑本身 SHOULD 放在 `models/*.mappers.ts`。

```ts
export async function listUsers(): Promise<User[]> {
  const response = await request<ListUsersResponseDto>(...);

  return response.data.map(mapUserDtoToUser);
}
```

API operations:

- 多个 API requests 组成的 function SHOULD 放在 `*.operations.ts`。
- operations MAY 调用多个 `*.requests.ts` 中的 request functions。
- operations MUST NOT 直接承载 UI side effects。
- operations MUST NOT 依赖 React。
- 如果组合逻辑只服务一个 mutation hook，SHOULD 优先靠近该 mutation；可复用后再提升为 operation。

TanStack Query queries:

- queries SHOULD 使用 resource-level query factory。
- queries SHOULD 使用 `queryOptions` 管理 queryKey 和 queryFn。
- query key hierarchy SHOULD 与 queryOptions colocate 在 `<resource>.queries.ts`。
- SHOULD NOT create standalone `keys.ts` by default。
- query hooks SHOULD 调用 query factory。
- query keys MUST 是 top-level arrays。
- query keys MUST 可序列化。
- query keys MUST 包含所有会影响 `queryFn` 返回数据的 variables。
- query keys MUST NOT 包含 functions、class instances 或不稳定对象。
- list query params 在进入 query key 前 SHOULD 规范化，特别是空值、default values、排序字段和数组顺序会影响缓存语义时。

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

TanStack Query mutations:

- 同一 resource 的 mutations SHOULD 放在 `<resource>.mutations.ts`。
- mutation hooks SHOULD 调用 `*.requests.ts` 或 `*.operations.ts`。
- cache invalidation / cache update SHOULD 与 mutation colocate。
- queries 和 mutations SHOULD 拆文件。
- request function 和对应 TanStack Query hook SHOULD NOT be placed in the same file by default。

### Anti-Patterns

- API request function 直接返回 raw DTO 给 UI。
- 在 `*.queries.ts` 中重复写 canonical DTO mapping。

## `app/`

### Purpose

`src/app/` 是应用组合层，不是业务 feature 层，也不是 shared component 层。

### Structure

```text
app/
├── providers/
├── index.tsx
└── routes.tsx
```

- `providers/`：cross-cutting provider composition。
- `index.tsx`：application composition entry。
- `routes.tsx`：route definitions。

### Implementation

- `src/index.tsx` MAY contain required global side-effect imports and React root creation。
- `src/index.tsx` MUST NOT contain app composition、routes、providers、business logic、data fetching 或 feature UI。
- `src/app/index.tsx` SHOULD 负责 app composition。
- `src/app/routes.tsx` SHOULD 负责 route definitions。
- `src/app/providers/` SHOULD 负责组合全局 providers。
- route definitions SHOULD 使用 lazy route objects。
- app layer MAY 组合 routes、providers、global boundaries 和 feature entry components。
- shared 和 features MUST NOT 反向依赖 app layer。
- `src/app/` MUST NOT 放业务 resource models、feature-specific components、API request functions 或通用 UI components。
- `services/` 和 `stores/` SHOULD NOT be default subdirectories of `src/app/`。

### Anti-Patterns

- 在 `src/app/` 写业务页面内部 UI。
- 在 `src/app/` 放 resource types、schemas、mappers。
- 在 `src/app/` 发起 API requests。
- 把 feature-specific provider 提升到 `src/app/providers/`。

## `assets/`

### Purpose

`assets/` 存放会被 source code import 的 bundled assets。

### Implementation

- Application-level bundled assets SHOULD 放在 `src/assets/`。
- Feature-specific bundled assets SHOULD 放在 `features/*/assets/`。
- Assets that require fixed filenames or root-absolute access MAY 放在 `public/`。
- Detailed asset placement rules are defined in `Assets` under `Cross-Cutting Conventions`。

### Anti-Patterns

- 把 feature-specific assets 提升到 `src/assets/`。
- 把需要 bundler hashing 或 processing 的 assets 放进 `public/`。

## `components/`

### Purpose

`src/components/` 存放跨 feature 复用的 UI components，不依赖业务 feature。

### Structure

```text
components/
├── errors/
├── layouts/
└── ui/
```

- `errors/`：共享 error boundary fallback、错误展示 components。
- `layouts/`：跨 route 或跨 feature 复用的布局 components。
- `ui/`：设计系统基础组件、低业务语义的共享 UI components。

按需扩展：

- `forms/`：跨 feature 复用的 form controls 或 form field components。
- `navigation/`：跨 feature 复用的 navigation components。

### Naming

React component 文件名 MUST 使用 `kebab-case`：

```text
user-form.tsx
users-table.tsx
product-card.tsx
```

Component-local companion files SHOULD 使用同一个 `<component>` 前缀：

```text
user-form.constants.ts
user-form.helpers.ts
user-form.test.tsx
```

- `<component>.test.tsx` 放 component tests。
- `<component>.helpers.ts` MUST 只放 component-local helper functions。
- `<component>.constants.ts` MUST 只放 component-local constants。
- 可复用 helper SHOULD 提升到 `utils/`、`helpers/` 或 feature/shared owner。
- 业务 resource constants SHOULD 放到 `models/*.constants.ts`。

### CSS Modules

component-scoped CSS Modules MUST 使用 `<component>.module.css`：

```text
user-form.module.css
users-table.module.css
```

- SHOULD 优先使用 Tailwind CSS。
- Tailwind CSS 不适合时，MAY 使用 CSS Modules。
- 全局样式 MUST 放在 `src/styles/`。
- CSS Modules locals MUST 使用 `camelCase`。

### Dependencies

- `src/components/ui/**` MUST NOT import `src/models/**`、`src/api/**`、`src/features/**`。
- `src/components/layouts/**` SHOULD 避免依赖 business models。
- 依赖 business model 的 UI SHOULD 优先放在 `features/*/components/`。
- 跨多个 features 且业务语义稳定的共享业务组件 MAY 放入 `src/components/` 的非 `ui/` 子目录。
- shared components MAY 依赖 `src/utils/`、`src/lib/`、`src/hooks/` 中稳定的 shared code。
- shared components MUST NOT 依赖 `src/features/*/`。
- shared components MUST NOT 承载 feature-specific 业务流程。
- shared components MUST NOT 直接定义 routes。
- shared components MUST NOT 直接发起 API requests。

### Anti-Patterns

- shared component 直接 import 某个 feature。
- shared component 内部发起 API request。
- 把 feature-specific 业务流程抽到 `src/components/`。
- 在 shared component 中硬编码业务 copy 而不走 i18n。

## `config/`

### Purpose

`config/` 存放运行时配置、环境变量解析、应用级配置对象，或项目级工具配置拆分目录。

### Structure

```text
src/config/
└── env.ts
```

### Implementation

- `src/config/` SHOULD 用于应用运行时配置。
- 根目录 `config/` SHOULD 用于项目级工具配置拆分。
- 业务 resource constants MUST NOT 放入 `config/`。
- SHOULD NOT 创建 `configs/`。

### Anti-Patterns

- 把业务枚举值放进 `src/config/`。
- 同时创建 `config/` 和 `configs/`。
- 把环境变量解析散落在业务代码中。

## `features/`

### Purpose

`features/*/` 存放某个业务 feature 私有的代码。feature 内同名目录复用 `src/` 下目录职责，只是作用域收窄到当前 feature。

### Structure

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

### Implementation

- `api/` 和 `models/` 在 feature 内 MUST 只服务当前 feature。
- `services/` 仅在当前 feature 存在明确 orchestration service 时 MAY 创建。
- `stores/` 仅在当前 feature 存在独立 client state store 时 MAY 创建。
- `styles/` SHOULD NOT be created by default；只有需要 feature-level CSS / CSS Modules 时 MAY 创建。
- features MUST NOT 直接互相 import。
- 跨 feature 复用的代码 SHOULD 提升到 shared 目录，或在 `app/` / `routes/` 层组合。

### Anti-Patterns

- `features/users` 直接 import `features/products`。
- 每个 feature 都机械创建完整目录树。
- 把共享 UI 长期留在某个 feature 内让其他 features 引用。
- 把 app-level provider、router 或 global boundary 放进 feature。

## `helpers/`

### Purpose

`helpers/` 存放 project-specific helper functions。它用于项目内部、语义较具体、难以归入 `utils/` 或 `lib/` 的辅助函数。

### Implementation

- `helpers/` MAY 带项目语义，但 MUST NOT 作为杂物目录。
- feature-specific helpers SHOULD 放在 `features/*/helpers/`。
- 能被不同项目直接复用的纯工具 SHOULD 放在 `utils/`。

### Anti-Patterns

- 把难以命名的代码统一丢进 `helpers/`。
- 把业务流程隐藏在 `helpers/` 中绕过 feature 边界。

## `hooks/`

### Purpose

`hooks/` 存放跨 feature 复用的 React hooks。

### Implementation

- Shared hooks MAY depend on `lib/`、`utils/`、`config/` 和 stable shared hooks。
- Shared hooks MUST NOT depend on `features/*/`、`routes/` 或 `app/`。
- Feature-specific hooks SHOULD 放在 `features/*/hooks/`。
- Hooks that wrap TanStack Query for a business resource SHOULD live in the relevant `api/*.queries.ts` or `api/*.mutations.ts` file, not in generic `hooks/`。

### Anti-Patterns

- 把 feature-specific business hooks 放进 `src/hooks/`。
- 在 shared hooks 中 import feature code。

## `lib/`

### Purpose

`lib/` 存放第三方库适配、基础设施封装、配置后的 clients。

### Examples

```text
lib/i18n/
lib/request/
```

### Implementation

- `lib/` MAY 封装 third-party integration 或 configured client。
- request client、i18n client、analytics adapter 等 SHOULD 放在 `lib/`。
- `lib/` 中的封装 SHOULD 隐藏第三方库的项目级配置细节。

### Anti-Patterns

- 把 feature-specific 业务流程放进 `lib/`。
- 把第三方库原样 re-export 成无意义 wrapper。

## `locales/`

### Purpose

`locales/` 存放 i18n resource files。

### Implementation

- Locale directories SHOULD use BCP 47 locale tags, for example `en/` and `zh-Hans/`.
- Locale resources MUST remain data files; business logic MUST NOT live in locale resources.
- Generated i18n types SHOULD live under `src/@types/`.
- Detailed i18n rules are defined in `i18n` under `Cross-Cutting Conventions`.

### Anti-Patterns

- 在 feature code 中绕过 i18n resources 写长期存在的 user-facing copy。
- 把 runtime formatting logic 放进 locale JSON。

## `mocks/`

### Purpose

`mocks/` 存放跨 feature 复用的 mock handlers、mock data 和 development/test mock utilities。

### Implementation

- `mocks/` SHOULD exist only when a mock strategy such as MSW or equivalent tooling is used.
- Feature-specific mock data SHOULD stay close to its feature when it is not reused across features.
- Mock code MUST NOT enter the production runtime path.

### Anti-Patterns

- 把 production fallback logic 放进 `mocks/`。
- 让 application code depend on `mocks/`。

## `models/`

### Purpose

`models/` 存放前端对业务资源、API 数据、表单数据、运行时校验、数据转换的纯模型代码。

### Structure

```text
models/
├── users.constants.ts
├── users.mappers.ts
├── users.schemas.ts
└── users.types.ts
```

`models/` MAY 包含：

- frontend model types.
- API DTO types.
- form value types.
- schemas。
- constants。
- mappers。
- type guards.
- fixtures。
- factories。
- colocated unit tests.

### Naming

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

- `User` 表示前端 canonical model。
- `UserId` 表示 resource id。
- `UserListItem` 只在列表项结构确实不同于 `User` 时 SHOULD 使用。
- `UserDto` 表示 API 原始数据结构。
- MUST 使用 `Dto`，MUST NOT 使用全大写 `DTO`。
- Type 和 interface 名称 MUST NOT 使用 `I`、`T` 等前缀。

### Constants

```text
users.constants.ts
```

- resource-level constants SHOULD 放在 `models/*.constants.ts`。
- 普通 exported constants SHOULD 使用 `camelCase`。
- 真正常量语义强、不会按业务对象演化的 primitive constants MAY 使用 `UPPER_SNAKE_CASE`。
- 对象、数组、选项表、映射表等常量 SHOULD 使用 `as const` 保留 literal types。
- 需要校验对象形状但保留具体推断时，SHOULD 使用 `satisfies`。

```ts
type UserStatus = 'active' | 'inactive';

export const userStatusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
] as const satisfies ReadonlyArray<{
  label: string;
  value: UserStatus;
}>;

export const DEFAULT_PAGE_SIZE = 20;
```

### Schemas

schema value SHOULD 使用 `camelCase`，并以 `Schema` 结尾：

```ts
const userSchema = ...
const usersQueryParamsSchema = ...
const createUserFormValuesSchema = ...
```

- 本节不绑定具体 schema library。
- 本节不定义 schema-first 或 type-first。
- schema 命名 SHOULD 表达它校验的数据边界。

### Mappers

mapper SHOULD 使用 `map<Source>To<Target>`：

```ts
mapUserDtoToUser();
mapUserFormValuesToCreateUserRequestBodyDto();
```

- mapper MUST 是纯函数。
- mapper SHOULD 放在 `models/*.mappers.ts`。
- 展示格式化 MUST NOT 使用 `map`，SHOULD 使用 `format`。

### Implementation

- `models/` MAY 被 `api/`、components、hooks、routes 使用。
- `models/` MUST NOT 依赖 `api/`。
- `models/` MUST NOT 包含网络请求。
- `models/` MUST NOT 包含 TanStack Query hooks。
- `models/` MUST NOT 包含 React components。
- `models/` MUST NOT 包含 route composition。
- `models/` MUST NOT 包含 UI side effects。
- `*.fixtures.ts` 和 `*.factories.ts` MUST NOT 进入运行主路径。
- UI 展示格式化 SHOULD 靠近 UI；只有无 UI 依赖的领域数据格式化才 MAY 放入 `models/`。

Source of truth SHOULD 按 concern 划分，而不是把 `types`、`schemas`、`constants` 强行合并为单一来源：

- runtime values 的 source of truth 是 constants。
- runtime validation 的 source of truth 是 schemas。
- compile-time contracts 的 source of truth 是 types 或 generated types。
- API boundary shape 的 source of truth 是后端契约或 generated DTOs；前端可在 `models/*.types.ts` 中定义 application-facing aliases。
- types SHOULD NOT 为了复用常量而反向制造 runtime import cycle；需要从 runtime value 推导 type 时，MAY 使用 `typeof`，但 dependency direction MUST remain clear。

### Anti-Patterns

- 在 `models/` 中调用 request client。
- 在 `models/` 中 import `api/`。
- 在 mapper 中触发 toast、navigation、cache invalidation 等 side effects。
- 把 UI-only formatting 放进 shared models。

## `routes/`

### Purpose

`src/routes/` 存放 route-level components。

### Structure

```text
routes/
├── errors/
│   └── not-found.tsx
└── root/
    └── root.tsx
```

### Implementation

- route-level components MAY 组合 features 和 shared components。
- route-level components SHOULD 保持薄，SHOULD focus on route layout、route params、page-level composition 和 route-level error/loading states。
- Feature-specific complex UI SHOULD live in `features/*/components/`。
- Route-only layout/composition MAY stay in `routes/` when it remains thin。
- Cross-feature stable shared UI MAY live in `src/components/`。
- `src/components/ui/` MUST remain business-agnostic。
- route-level components MUST NOT 作为跨 feature 复用组件目录。
- route-level components MUST NOT 直接定义业务 resource models。
- route-level errors SHOULD 使用 `RouteErrorBoundary`。

### Anti-Patterns

- 在 route-level component 中堆积复杂表单、表格、业务流程。
- 从 `src/routes/` 导出共享 UI 给 features 使用。
- 在 route-level component 中定义 resource model 或 mapper。

## `services/`

### Purpose

`services/` 存放明确的 orchestration services。

### Implementation

- `services/` SHOULD NOT be created by default。
- Application-level services MAY live in `src/services/` only when orchestration is reused across features and does not belong to a route or a single feature。
- Feature-specific services SHOULD live in `features/*/services/`。
- Services MUST NOT be used as a generic place for API requests、models、hooks、stores 或 UI logic。

### Anti-Patterns

- 把所有 API requests 命名为 services。
- 把难以归类的业务代码统一放进 `services/`。

## `stores/`

### Purpose

`stores/` 存放 client state stores。

### Implementation

- `stores/` SHOULD exist only when the project uses an explicit client state management library or store pattern.
- Server state SHOULD stay in TanStack Query, not in client stores.
- Feature-specific stores SHOULD live in `features/*/stores/`.
- Stores MUST NOT import routes or app composition code.

### Anti-Patterns

- 把 TanStack Query server state 复制进 client stores。
- 为简单 component state 创建 global store。

## `styles/`

### Purpose

`styles/` 存放 global style entry points 和 global CSS。

### Implementation

- Global style entry points MUST live in `src/styles/`.
- Component-scoped styles SHOULD live next to the component when CSS Modules are needed.
- Detailed styling rules are defined in `Styling` under `Cross-Cutting Conventions`.

### Anti-Patterns

- 把 feature-specific scoped CSS 放进 `src/styles/`。
- 在 global CSS 中累积 component-specific selectors。

## `testing/`

### Purpose

`testing/` 存放测试工具、custom render、test setup helpers 和跨测试复用的 test utilities。

### Implementation

- Test utilities shared across tests SHOULD live in `src/testing/`.
- Test helpers used by one module SHOULD stay colocated with that module.
- Production code MUST NOT depend on `src/testing/`.
- Detailed test file naming rules are defined in `Test File Suffixes`.

### Anti-Patterns

- 把 production factories 或 runtime code 放进 `src/testing/`。
- 让 application runtime import test utilities。

## `utils/`

### Purpose

`utils/` 存放 generic utilities that can be copied across projects。它 SHOULD 尽量保持纯函数、低业务语义，并且不依赖本项目的 feature、routing、API 或 UI 结构。

### Examples

```text
utils/cn.ts
```

### Implementation

- `utils/` SHOULD 能相对容易复制到其他项目使用。
- `utils/` SHOULD 保持纯函数和低业务语义。
- `utils/` MUST NOT 依赖 `src/features/*/`。
- `utils/` MUST NOT 发起 API requests。
- request client、configured third-party clients SHOULD 放在 `lib/`，MUST NOT 放在 `utils/`。

### Anti-Patterns

- 把业务流程放进 `utils/`。
- 把 request client 放进 `utils/`。
- 把 feature-specific helper 提升到 `utils/`。

## Cross-Cutting Conventions

### Imports And Barrel Files

- Direct imports SHOULD be the default import style。
- Feature-level `index.ts` public API SHOULD NOT be the default pattern。
- 全局聚合 barrel files SHOULD NOT be the default pattern。
- `export *` 聚合整个目录 SHOULD NOT be the default pattern。
- MAY 使用小范围 module entry，但它 MUST 代表真实模块边界。
- import 语句 MUST 遵守结构章节定义的依赖方向。

可接受的小范围 module entry 示例：

```text
src/lib/request/index.ts
src/components/ui/app-loader/index.ts
```

这些文件 SHOULD 代表稳定模块入口，而不是把目录内所有文件无差别 re-export。

### Type-Only Imports

- 仅导入 types 时，MUST 使用 `import type`。
- type-only exports MUST 使用 `export type`。
- 同一个模块同时导入 runtime values 和 types 时，SHOULD 遵守当前 ESLint 配置自动修复后的形式。
- 本项目已启用 `verbatimModuleSyntax`、`@typescript-eslint/consistent-type-imports` 和 `@typescript-eslint/consistent-type-exports`；文档 MUST NOT 写出与工具配置相反的 import/export 风格。

### i18n

- 用户可见文案 SHOULD 使用 i18n resources，SHOULD NOT 直接写 literal strings。
- locale resources MUST 放在 `src/locales/`。
- generated i18next types MUST 放在 `src/@types/`。
- i18next config MUST 放在 `i18next.config.ts`。
- 修改 user-facing text、translation keys 或 locale resources 后，MUST 同步更新 locale resources、generated types 和 i18n checks。具体命令由 `AGENTS.md`、`README.md` 和 `package.json` 维护。

### Styling

- Tailwind CSS SHOULD be the default styling approach。
- CSS / CSS Modules SHOULD 只作为 fallback。
- CSS Modules MAY 用于复杂 scoped styles、第三方样式隔离、Tailwind CSS 难以清晰表达的局部样式。
- global style entry points MUST 放在 `src/styles/`。
- conditional class name composition SHOULD 使用 `src/utils/cn.ts`。
- CSS Modules locals MUST 使用 `camelCase`。

### Assets

- 被 source code import、需要 bundler processing、需要 hashing、或需要 React component usage 的 assets SHOULD 放在 `src/assets/` 或 `src/**/assets/`。
- 不被 source code import、需要固定文件名、或需要 root absolute path 直接访问的 assets MAY 放在 `public/`。
- `public/` assets MUST 使用 root absolute path 引用。
- feature-specific assets SHOULD 靠近 feature。
- SVG 作为 React component 使用时 SHOULD 沿用项目的 `?react` / `vite-plugin-svgr` 约定。

### Testing

- unit/component tests SHOULD colocate 到被测试文件附近。
- `src/testing/` SHOULD 放测试工具、custom render、test setup helpers。
- `e2e/` 仅在启用 Playwright 或同类工具时 MAY 创建。
- SHOULD NOT use `__tests__/` by default。

## Rule Enforcement

本节是 non-normative snapshot。Tool configuration is authoritative for automated enforcement；`AGENTS.md`、`README.md` 和 `package.json` own verification commands。

| Area                               | Enforcement                                                                                                        | Status                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| File name case                     | `unicorn/filename-case`                                                                                            | Automated for ESLint-covered files |
| Import sorting                     | `simple-import-sort/imports`、`simple-import-sort/exports`                                                         | Automated for ESLint-covered files |
| Type-only imports / exports        | `verbatimModuleSyntax`、`@typescript-eslint/consistent-type-imports`、`@typescript-eslint/consistent-type-exports` | Automated for TypeScript files     |
| Unused imports                     | `unused-imports/no-unused-imports`                                                                                 | Automated for ESLint-covered files |
| i18n literal strings and resources | `eslint-plugin-i18next`、`i18next-cli`                                                                             | Automated by lint and i18n tooling |
| CSS Modules locals                 | Vite `css.modules.localsConvention: 'camelCase'`                                                                   | Automated by Vite config           |
| Feature boundaries                 | Code review                                                                                                        | Manual review                      |
| DTO-to-model mapping stage         | Code review                                                                                                        | Manual review                      |
| TanStack Query key completeness    | Code review                                                                                                        | Manual review                      |

## Reference

本节是 non-normative quick reference。发生冲突时，以前文的 normative sections 为准。

### Directory Summary

```text
src/api/          requests, queries, mutations, operations
src/app/          app composition
src/assets/       bundled assets imported by source code
src/components/   shared UI components
src/config/       runtime configuration
src/features/     feature-specific code
src/helpers/      project-specific helper functions
src/hooks/        shared React hooks
src/lib/          integrations and configured clients
src/locales/      i18n resources
src/mocks/        mock handlers and mock data
src/models/       frontend data models and boundary mapping
src/routes/       route-level components
src/services/     orchestration services
src/stores/       client state stores
src/styles/       global style entry points
src/testing/      shared test utilities
src/utils/        generic pure utilities
```

### Naming Summary

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
