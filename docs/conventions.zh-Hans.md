# Conventions

本文档定义项目的目录结构、命名体系和实现约定。

## Normative Keywords

本文档使用 [BCP 14](https://www.rfc-editor.org/info/bcp14/) 风格表达要求等级。本文档只使用以下 keywords；只有大写形式具有规范含义。

- `MUST`：绝对要求。
- `MUST NOT`：绝对不可采用。
- `SHOULD`：推荐做法；偏离需有明确理由。
- `SHOULD NOT`：非推荐做法；偏离需有明确理由。
- `MAY`：可选做法。

## Principles

### Layers

Shared code 与 business feature code MUST 分离。Shared code 目录 MUST 有明确职责，MUST NOT 成为无法判断归属的杂物区。

### Code Flow

Code Flow 指代码依赖和组合方向。本文档中的箭头表示「左侧 MAY import 右侧」。未列出的跨层 import SHOULD NOT 出现，除非更具体章节另有说明。

```text
bootstrap -> app/routes -> features -> shared
features/<name> -> features/<name>
shared -> lower-level shared
```

- bootstrap MAY import `src/app`、global styles，以及必要的 global side-effect initialization。
- shared code MUST NOT 依赖 `src/features/*/`、`src/routes/` 或 `src/app/`。
- features MUST NOT 依赖 `src/app/` 或 `src/routes/`。
- features MUST NOT 直接互相 import。
- `app/` 和 `routes/` SHOULD 负责组合 shared code 与 features。
- 跨 feature 复用的代码 SHOULD 提升到 shared 目录，或在 `app/` / `routes/` 层组合。
- `models/` 和 `utils/` MUST NOT 依赖 React、routes、API clients、UI components 或 features。
- `components/ui/` MUST NOT 依赖 business models、API、features 或 routes。

### Feature Boundaries

一个 feature SHOULD 是独立业务单元。删除一个 feature 时，理想影响范围 SHOULD 主要集中在组合它的 `routes/` / `app/` 层。

### Directory Creation

项目 MUST NOT 为每个 feature 机械创建所有可能目录。目录 MUST 对应真实职责、真实代码和真实维护边界。

## General Naming

### Folder And File Names

- 目录命名方式 MUST 使用 `kebab-case`，除明确例外外 MUST NOT 使用大写字母。
- 文件命名方式 MUST 使用 `kebab-case`，多个主体之间 MAY 使用 `.` 分隔。
- `-` 用于连接同一命名主体内的多个单词，例如 `user-form.tsx`。
- `.` 用于分隔命名主体、产物类型、测试后缀、CSS Modules 后缀，例如 `users.types.ts`、`user-form.test.tsx`、`user-form.module.css`。
- resource 相关文件名 SHOULD 使用 `resource` + `artifact`。
- 普通单一职责模块 MAY 使用简短文件名，例如 `env.ts`、`cn.ts`、`index.ts`。
- React component 和 hook 的目录和文件 MUST 遵循上述规则，MUST NOT 使用 `PascalCase`。

命名例外：

- 工具强制路径，例如 `.github/`、`.husky/`、`.vscode/`、`src/@types/`。
- BCP 47 locale tags，例如 `zh-Hans/`。
- 约定俗成的根目录文件，例如 `README.md`、`AGENTS.md`、`Dockerfile`、`LICENSE`。
- 由生成工具控制命名的 generated files。

常见模式：

```text
<resource>.<artifact>.ts
<resource>.<artifact>.test.ts
<component>.tsx
<component>.test.tsx
<component>.module.css
```

### Type Names

- Type、interface 和 class 名称 MUST 使用 `PascalCase`。
- Type 和 interface 名称 MUST NOT 使用 `I`、`T` 等匈牙利式前缀。
- 类型名称 SHOULD 表达数据角色或领域含义，例如 `User`、`UserDto`、`UserFormValues`。
- 运行时 enum-like values SHOULD 使用 `as const` object / array 加 union type。
- 应用源码 SHOULD 避免使用 TypeScript `enum`；优先使用 `as const` value 加 union type。生成代码或明确要求使用 `enum` 的 tooling MAY 例外。

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
- 表示单个实体的类型名 SHOULD 使用单数实体名，例如 `User`、`Product`。集合类型 SHOULD 通过容器或语义表达，例如 `User[]`、`UsersById`、`UserListItem[]`。

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
- `style.css`、`styles.css`、`style.module.css` SHOULD NOT 作为基线命名。

## Project Structure Overview

以下为仓库根目录 MAY 出现的常见目录和文件。目录和文件 MUST 有真实用途，MUST NOT 为凑齐结构创建空目录或占位文件。

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

以下为 `src/` 下 MAY 出现的目录和入口文件。目录 MUST 按实际职责创建，MUST NOT 为凑齐结构创建空目录。

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
- `helpers/`：带项目语义的 helper functions。
- `hooks/`：跨 feature 复用的 React hooks。
- `lib/`：第三方库适配、基础设施封装、配置后的 clients。
- `locales/`：i18n resource files。
- `mocks/`：MSW handlers、开发 mock、测试 mock，仅在启用 mock 方案时创建。
- `models/`：跨 feature 共享的前端数据模型及其边界转换。
- `routes/`：route-level components。
- `services/`：明确的应用级 orchestration services，非必要不创建。
- `stores/`：跨 feature client state stores，仅在引入对应状态管理方案时创建。
- `styles/`：全局样式入口、Tailwind CSS 入口、全局 CSS。
- `testing/`：测试工具、custom render、test setup helpers。
- `utils/`：可跨项目复制的 generic utilities。
- `index.tsx`：React bootstrap entry。

## `api/`

### Purpose

`api/` 存放 API request functions、TanStack Query queries、TanStack Query mutations，以及由多个 API requests 组成的 operations。

某个 feature 专有的 API SHOULD 放在 `features/*/api/`。多个 features 共享的 API 代码才 SHOULD 提升到 `src/api/`。

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

以下 suffixes SHOULD NOT 作为基线方案：

- `*.endpoints.ts`。
- `*.api.ts`。
- `*.services.ts`。

### Naming

API DTO aliases SHOULD 使用 `<Operation><Part>Dto` 命名。`Operation` 表示业务操作，例如 `ListUsers`、`CreateUser`、`UpdateUser`；`Part` 表示 API 边界中的数据部位，例如 `PathParams`、`QueryParams`、`RequestHeaders`、`RequestBody`、`Response`。

- resource DTO：`<ResourceSingular>Dto`。
- path params DTO：`List<ResourcePlural>PathParamsDto`。
- query params DTO：`List<ResourcePlural>QueryParamsDto`。
- request headers DTO：`List<ResourcePlural>RequestHeadersDto`。
- request body DTO：`Create<ResourceSingular>RequestBodyDto`、`Update<ResourceSingular>RequestBodyDto`。
- response body DTO：`List<ResourcePlural>ResponseDto`。
- response envelope DTO：`List<ResourcePlural>ResponseEnvelopeDto`，仅在 API wrapper 或后端协议确实存在 envelope 时使用。

生成的 OpenAPI files MUST NOT 手动修改。若生成类型名称过长或不稳定，application-facing aliases MAY 定义在 `models/*.types.ts` 中。

常见请求函数命名：

请求函数名 SHOULD 使用 `<action><Resource>`。`Resource` 的单复数 SHOULD 表达操作对象是单个 resource 还是多个 resources。

多资源操作命名：

- `<action><ResourcePlural>`：client-side multi-resource wrapper，例如 `deleteUsers`。这类函数 MAY 多次调用单资源 API，例如 `Promise.all(ids.map(deleteUser))`。
- `bulk<Action><ResourcePlural>`：server-side bulk endpoint，例如 `bulkDeleteUsers`。这类函数表示一次 API request 对多个 resources 执行同一种 action。
- `batch<Action><ResourcePlural>`：server-side batch endpoint，例如 `batchWriteUsers`。这类函数表示一次 API request 提交一批 operations；每个 operation MAY 有不同 action。

`bulk` 和 `batch` MUST 只用于一次 API request 的后端能力，MUST NOT 用于前端多次调用单资源 API 的 wrapper。

HTTP method 与 action 的常见对应关系：

- `GET` 集合读取 SHOULD 使用 `list<ResourcePlural>`，例如 `listUsers`。
- `GET` 详情读取 SHOULD 使用 `get<ResourceSingular>`，例如 `getUser`。
- `POST` 单资源创建 SHOULD 使用 `create<ResourceSingular>`，例如 `createUser`。
- `POST` 前端多资源 wrapper SHOULD 使用 `create<ResourcePlural>`，例如 `createUsers`。
- `POST` server-side bulk create SHOULD 使用 `bulkCreate<ResourcePlural>`，例如 `bulkCreateUsers`。
- `POST` server-side batch write SHOULD 使用 `batchWrite<ResourcePlural>`，例如 `batchWriteUsers`。
- `PATCH` 单资源局部更新 SHOULD 使用 `update<ResourceSingular>`，例如 `updateUser`。
- `PATCH` 前端多资源 wrapper SHOULD 使用 `update<ResourcePlural>`，例如 `updateUsers`。
- `PATCH` server-side bulk update SHOULD 使用 `bulkUpdate<ResourcePlural>`，例如 `bulkUpdateUsers`。
- `PUT` 单资源完整替换 SHOULD 使用 `replace<ResourceSingular>`，例如 `replaceUser`。
- `PUT` 前端多资源 wrapper SHOULD 使用 `replace<ResourcePlural>`，例如 `replaceUsers`。
- `PUT` server-side bulk replace SHOULD 使用 `bulkReplace<ResourcePlural>`，例如 `bulkReplaceUsers`。
- `DELETE` 单资源删除 SHOULD 使用 `delete<ResourceSingular>`，例如 `deleteUser`。
- `DELETE` 前端多资源 wrapper SHOULD 使用 `delete<ResourcePlural>`，例如 `deleteUsers`。
- `DELETE` server-side bulk delete SHOULD 使用 `bulkDelete<ResourcePlural>`，例如 `bulkDeleteUsers`。

Batch action 命名 SHOULD 表达 batch payload 的真实语义。混合 `create`、`update`、`delete` 的 batch SHOULD 使用 `batchWrite<ResourcePlural>` 或更具体的业务动词。`batchUpdate<ResourcePlural>` SHOULD 只用于所有 items 都是 update，或后端契约明确把该 batch 命名为 update 的场景。

其他：

- 业务动作 SHOULD 使用业务动词。
- request function SHOULD NOT 使用 HTTP method 命名，例如 `putUser()`。
- request function SHOULD NOT 使用 `fetchUsers()`。

TanStack Query 命名：

```ts
const usersQueries = ...
const usersMutations = ...

useUsersQuery()
useUserQuery()
useCreateUserMutation()
useDeleteUsersMutation()
useBulkDeleteUsersMutation()
useBatchWriteUsersMutation()
```

- query factory SHOULD 使用 `<resourcePlural>Queries`。
- mutation factory SHOULD 使用 `<resourcePlural>Mutations`。
- query hook SHOULD 使用 `use<Resource>Query`。
- mutation hook SHOULD 使用 `use<Action><Resource>Mutation`。
- 前端多资源 wrapper mutation hook SHOULD 使用 `use<Action><ResourcePlural>Mutation`，例如 `useDeleteUsersMutation`。
- server-side bulk mutation hook SHOULD 使用 `useBulk<Action><ResourcePlural>Mutation`，例如 `useBulkDeleteUsersMutation`。
- server-side batch mutation hook SHOULD 使用 `useBatch<Action><ResourcePlural>Mutation`，例如 `useBatchWriteUsersMutation`。
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

一个 resource 的常规 endpoints SHOULD 放在同一个 `<resource>.requests.ts`。一个 endpoint 一个文件 SHOULD NOT 作为基线方案。

- 当 resource 的 request functions 明显过多或存在独立子资源时，再拆分。
- `*.requests.ts` MAY 同时提供 application-facing functions 和 raw DTO-facing functions。
- application-facing functions SHOULD 返回 frontend model，例如 `listUsers(): Promise<User[]>`。
- raw DTO-facing functions MAY 返回 raw DTO，但函数名或类型 MUST 明确表达 raw boundary，例如 `listUsersRaw(): Promise<ListUsersResponseDto>`。
- UI code SHOULD NOT 直接调用 raw DTO-facing functions。
- canonical DTO-to-model mapping SHOULD 在 application-facing request function 中完成。
- mapping 逻辑本身 SHOULD 放在 `models/*.mappers.ts`。

```ts
export async function listUsersRaw(): Promise<ListUsersResponseDto> {
  return request<ListUsersResponseDto>(...);
}

export async function listUsers(): Promise<User[]> {
  const response = await listUsersRaw();

  return response.data.map(mapUserDtoToUser);
}
```

API operations:

- `*.requests.ts` SHOULD 只放对应后端 API endpoints 的 request functions。
- `*.operations.ts` SHOULD 放由多个 request functions 组成的 frontend async operations。
- operations MAY 调用多个 `*.requests.ts` 中的 request functions。
- client-side multi-resource wrapper 若通过多次调用单资源 API 实现，SHOULD 放在 `*.operations.ts`。
- client-side multi-resource wrapper 若只服务一个 mutation hook 且不导出复用，MAY 作为 private function 留在 `*.mutations.ts`。
- server-side `bulk*` / `batch*` endpoint functions SHOULD 放在 `*.requests.ts`。
- operations MUST NOT 直接承载 UI side effects。
- operations MUST NOT 依赖 React。
- 如果组合逻辑只服务一个 mutation hook，SHOULD 优先靠近该 mutation；可复用后再提升为 operation。

文件归属示例：

```text
deleteUsers                  -> users.operations.ts
bulkDeleteUsers              -> users.requests.ts
batchWriteUsers              -> users.requests.ts
useDeleteUsersMutation       -> users.mutations.ts
useBulkDeleteUsersMutation   -> users.mutations.ts
useBatchWriteUsersMutation   -> users.mutations.ts
```

TanStack Query queries:

- queries SHOULD 使用 resource-level query factory。
- queries SHOULD 使用 `queryOptions` 管理 queryKey 和 queryFn。
- query key hierarchy SHOULD 与 queryOptions colocate 在 `<resource>.queries.ts`。
- SHOULD NOT 创建 standalone `keys.ts`。
- query hooks SHOULD 调用 query factory。
- query keys MUST 是 top-level arrays。
- query keys MUST 包含 `queryFn` 使用且会影响返回数据的全部变量。
- query keys SHOULD 使用可序列化的值。
- query params SHOULD 在进入 query key 前完成必要的规范化。
- query hooks SHOULD NOT 在返回结果上额外添加 `queryKey`。需要在 hook 外访问 query key 时，SHOULD 使用 query factory，例如 `usersQueries.list(params).queryKey`。

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
- request function 和对应 TanStack Query hook SHOULD NOT 放在同一个文件。

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

- `providers/`：cross-cutting providers 的组合入口。
- `index.tsx`：应用组合入口。
- `routes.tsx`：route definitions。

### Implementation

- `src/index.tsx` SHOULD 只承担必要的 global side-effect imports 与 React root creation。
- `src/index.tsx` MUST NOT 包含 app composition、routes、providers、business logic、data fetching 或 feature UI。
- `src/app/index.tsx` SHOULD 负责 app composition。
- `src/app/routes.tsx` SHOULD 负责 route definitions。
- `src/app/providers/` SHOULD 负责组合全局 providers。
- route definitions SHOULD 使用 lazy route objects。
- app layer MAY 组合 routes、providers、global boundaries 和 feature entry components。
- shared 和 features MUST NOT 反向依赖 app layer。
- `src/app/` MUST NOT 放业务 resource models、feature-specific components、API request functions 或通用 UI components。
- `services/` 和 `stores/` SHOULD NOT 作为 `src/app/` 的基线子目录。

### Anti-Patterns

- 在 `src/app/` 写业务页面内部 UI。
- 在 `src/app/` 放 resource types、schemas、mappers。
- 在 `src/app/` 发起 API requests。
- 把 feature-specific provider 提升到 `src/app/providers/`。

## `assets/`

### Purpose

`assets/` 存放会被 source code import 的 bundled assets。

### Implementation

- 应用级 bundled assets SHOULD 放在 `src/assets/`。
- 某个 feature 专有的 bundled assets SHOULD 放在 `features/*/assets/`。
- 需要固定文件名或 root-absolute access 的 assets MAY 放在 `public/`。
- 作为 URL 使用的 SVG、图片等 assets SHOULD 使用普通 import，例如 `import logoUrl from '@/assets/images/logo.svg'`。
- 作为 React component 使用的 SVG SHOULD 使用 `?react` import，例如 `import Logo from '@/assets/images/logo.svg?react'`。
- 更完整的 asset placement rules 见 `Cross-Cutting Conventions` 中的 `Assets`。

### Anti-Patterns

- 把 feature-specific assets 提升到 `src/assets/`。
- 把需要 bundler hashing 或 processing 的 assets 放进 `public/`。

## `components/`

### Purpose

`src/components/` 存放跨 feature 复用的 UI components，不依赖业务 feature。

### Structure

```text
components/
├── business/
├── errors/
├── layouts/
└── ui/
```

- `business/`：跨多个 features 复用且业务语义稳定的 shared business components。
- `errors/`：共享 error boundary fallback、错误展示 components。
- `layouts/`：跨 route 或跨 feature 复用的布局 components。
- `ui/`：设计系统基础组件、低业务语义的共享 UI components。

`business/` SHOULD 仅在存在跨多个 features 复用、业务语义稳定的 shared business components 时创建。`business/` 初始 SHOULD 保持 flat；文件数量增长后，MAY 按稳定的 business resource 或 concept 分组，例如 `users/`、`products/`、`organizations/`。

`business/` SHOULD NOT 按 UI shape 创建 `forms/`、`modals/`、`tables/`、`buttons/` 等基线子目录。Feature-specific business forms、modals、tables 和 action buttons SHOULD 放在 `features/*/components/`。

`business/` MAY 包含 component-local UI state，例如 open/closed、selected、expanded、hovered 等只影响自身展示的状态。`business/` MUST NOT 发起 API requests、调用 TanStack Query hooks、写入 client stores、执行 navigation、触发 toast、更新 cache、承载 permission branching 或业务 workflow side effects。

需要 data fetching、mutation、permission branching、workflow state 或业务 side effects 的 components SHOULD 放在 `features/*/components/`，并通过 props 组合 shared UI 或 shared business components。

推荐形态：

```text
components/business/
├── organization-logo.tsx
├── product-status-badge.tsx
├── user-avatar.tsx
└── user-status-badge.tsx
```

文件数量增长后的推荐形态：

```text
components/business/
├── organizations/
│   └── organization-logo.tsx
├── products/
│   └── product-status-badge.tsx
└── users/
    ├── user-avatar.tsx
    └── user-status-badge.tsx
```

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

- `src/components/ui/**` MUST NOT 依赖 `src/models/**`、`src/api/**`、`src/features/**`。
- `src/components/business/**` MAY 依赖稳定的 `src/models/**`，但 MUST NOT 依赖 `src/api/**`、`src/features/**`、`src/routes/**` 或 `src/app/**`。
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

`features/*/` 下的目录按需创建。目录职责参考 `src/` 下同名目录，只是作用域收窄到当前 feature。

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
- `styles/` SHOULD NOT 作为基线目录创建；只有需要 feature-level CSS / CSS Modules 时 MAY 创建。
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

- Shared hooks MAY 依赖 `lib/`、`utils/`、`config/` 和稳定的 shared hooks。
- Shared hooks MUST NOT 依赖 `features/*/`、`routes/` 或 `app/`。
- 某个 feature 专有的 hooks SHOULD 放在 `features/*/hooks/`。
- 封装业务 resource 的 TanStack Query hooks SHOULD 放在对应的 `api/*.queries.ts` 或 `api/*.mutations.ts` 文件中，而不是 generic `hooks/`。

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

- Locale directories SHOULD 使用 BCP 47 locale tags，例如 `en/` 和 `zh-Hans/`。
- Locale resources MUST 保持为数据文件；business logic MUST NOT 放在 locale resources 中。
- 生成的 i18n types SHOULD 放在 `src/@types/` 下。
- 更完整的 i18n 规则见 `Cross-Cutting Conventions` 中的 `i18n`。

### Anti-Patterns

- 在 feature code 中绕过 i18n resources 写长期存在的 user-facing copy。
- 把 runtime formatting logic 放进 locale JSON。

## `mocks/`

### Purpose

`mocks/` 存放跨 feature 复用的 mock handlers、mock data 和 development/test mock utilities。

### Implementation

- `mocks/` SHOULD 仅在使用 MSW 或同类 mock 方案时创建。
- 某个 feature 专有的 mock data 若不跨 features 复用，SHOULD 靠近所属 feature。
- Mock code MUST NOT 进入 production runtime path。

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
- types SHOULD NOT 为了复用常量而反向制造 runtime import cycle；需要从 runtime value 推导 type 时，MAY 使用 `typeof`，但 dependency direction MUST 保持清晰。

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
- route-level components SHOULD 保持薄，职责 SHOULD 聚焦 route layout、route params、page-level composition 和 route-level error/loading states。
- 某个 feature 专有的复杂 UI SHOULD 放在 `features/*/components/`。
- Route-only layout/composition 在足够薄时 MAY 留在 `routes/`。
- Cross-feature stable shared UI MAY 放在 `src/components/`。
- `src/components/ui/` MUST 保持 business-agnostic。
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

- `services/` SHOULD NOT 作为基线目录创建。
- 应用级 services 仅在 orchestration 跨 features 复用，且不归属于 route 或单一 feature 时，MAY 放在 `src/services/`。
- 某个 feature 专有的 services SHOULD 放在 `features/*/services/`。
- Services MUST NOT 作为 API requests、models、hooks、stores 或 UI logic 的通用归置目录。

### Anti-Patterns

- 把所有 API requests 命名为 services。
- 把难以归类的业务代码统一放进 `services/`。

## `stores/`

### Purpose

`stores/` 存放 client state stores。

### Implementation

- `stores/` SHOULD 仅在项目使用明确的 client state management library 或 store pattern 时创建。
- Server state SHOULD 留在 TanStack Query 中，而不是复制到 client stores。
- 某个 feature 专有的 stores SHOULD 放在 `features/*/stores/`。
- Stores MUST NOT 依赖 routes 或 app composition code。

### Anti-Patterns

- 把 TanStack Query server state 复制进 client stores。
- 为简单 component state 创建 global store。

## `styles/`

### Purpose

`styles/` 存放 global style entry points 和 global CSS。

### Implementation

- Global style entry points MUST 放在 `src/styles/`。
- 需要 CSS Modules 时，component-scoped styles SHOULD 靠近 component。
- 更完整的 styling 规则见 `Cross-Cutting Conventions` 中的 `Styling`。

### Anti-Patterns

- 把 feature-specific scoped CSS 放进 `src/styles/`。
- 在 global CSS 中累积 component-specific selectors。

## `testing/`

### Purpose

`testing/` 存放测试工具、custom render、test setup helpers 和跨测试复用的 test utilities。

### Implementation

- 跨 tests 复用的 test utilities SHOULD 放在 `src/testing/`。
- 单一 module 使用的 test helpers SHOULD 与该 module colocate。
- Production code MUST NOT 依赖 `src/testing/`。
- 更完整的测试文件命名规则见 `Test File Suffixes`。

### Anti-Patterns

- 把 production factories 或 runtime code 放进 `src/testing/`。
- 让 application runtime import test utilities。

## `utils/`

### Purpose

`utils/` 存放可跨项目复制的 generic utilities。它 SHOULD 尽量保持纯函数、低业务语义，并且不依赖本项目的 feature、routing、API 或 UI 结构。

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

- Direct imports SHOULD 作为基线 import style。
- Feature-level `index.ts` public API SHOULD NOT 作为基线方案。
- 全局聚合 barrel files SHOULD NOT 作为基线方案。
- `export *` 聚合整个目录 SHOULD NOT 作为基线方案。
- 小范围 module entry MAY 使用，但它 MUST 代表真实模块边界。
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

- Tailwind CSS SHOULD 作为基线 styling approach。
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
- `__tests__/` SHOULD NOT 作为基线测试目录。

## Rule Enforcement

本节是 non-normative snapshot。Tool configuration 是 automated enforcement 的权威来源；verification commands 由 `AGENTS.md`、`README.md` 和 `package.json` 维护。

- File name case：`unicorn/filename-case`，由 ESLint 覆盖文件自动检查。
- Import sorting：`simple-import-sort/imports`、`simple-import-sort/exports`，由 ESLint 覆盖文件自动检查。
- Type-only imports / exports：`verbatimModuleSyntax`、`@typescript-eslint/consistent-type-imports`、`@typescript-eslint/consistent-type-exports`，由 TypeScript / ESLint 自动检查。
- Unused imports：`unused-imports/no-unused-imports`，由 ESLint 覆盖文件自动检查。
- i18n literal strings and resources：`eslint-plugin-i18next`、`i18next-cli`，由 lint 和 i18n tooling 检查。
- CSS Modules locals：Vite `css.modules.localsConvention: 'camelCase'`，由 Vite config 约束。
- Feature boundaries：依靠 code review。
- DTO-to-model mapping stage：依靠 code review。
- TanStack Query key completeness：依靠 code review。
