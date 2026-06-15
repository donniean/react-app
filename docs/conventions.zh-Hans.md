# Conventions

本文档定义项目的目录结构、命名体系和实现约定。

## 你需要命名一个合适的 title

### 你需要命名一个合适的 title 2

当本文档与现有实际代码、tool configuration、generated files、design source 或其他已存在事实冲突时，MUST 以现有事实为准，并将冲突视为 documentation drift 或待确认 migration。MUST NOT 在没有明确任务时仅为匹配本文档而改动现有实现。

### Normative Keywords

本文档中的 `MUST`、`MUST NOT`、`SHOULD`、`SHOULD NOT` 和 `MAY` 在且仅在大写形式出现时，按照 [BCP 14](https://www.rfc-editor.org/info/bcp14/) 解释。

- `MUST`：绝对要求。
- `MUST NOT`：绝对不可采用。
- `SHOULD`：推荐做法；偏离需有明确理由。
- `SHOULD NOT`：非推荐做法；偏离需有明确理由。
- `MAY`：可选做法。

### Shared Code

Shared parts of the code 指 `src/` 下不属于 `src/app/`、`src/routes/`、`src/features/` 或 `src/testing/`，且可被多个生产代码模块复用的代码。

- Shared code 与 feature-specific code MUST 分离。
- Shared code MUST 有明确职责和归属，MUST NOT 成为杂物区。
- 只服务一个 feature 的代码 SHOULD 留在该 feature 内。
- `src/testing/` 是 shared test infrastructure，不属于 production shared code。
- Production code MUST NOT 依赖 `src/testing/`。

## Principles

### Code Flow

Code Flow 指代码依赖和组合方向。

代码依赖 SHOULD 从 shared code 流向 features，再由 `app/` / `routes/` 组合。Reusable components MUST NOT 为完成自身职责而依赖 `feature` 内部实现；如果出现这种依赖，该 component SHOULD 下沉到对应 feature，或提升到合适的 shared module。

- `app/` 和 `routes/` MAY 组合 features 与 shared code。
- features MAY 依赖自身内部代码和 shared code。
- features MUST NOT 直接互相 import。
- shared code MUST NOT 依赖 `src/app/`、`src/routes/` 或 `src/features/*/`。
- 跨 feature 复用的代码 SHOULD 提升到合适的 shared module，或在 `app/` / `routes/` 层组合。
- 一个 feature SHOULD 是独立业务单元。
- 删除一个 feature 时，理想影响范围 SHOULD 主要集中在组合它的 `routes/` / `app/` 层。
- 目录 MUST 对应真实职责、真实代码和真实维护边界。
- 项目 MUST NOT 为每个 feature 机械创建所有可能目录。

## General Naming

### Folders And Files

- 目录名 MUST 使用 `kebab-case`，除明确例外外 MUST NOT 使用大写字母。
- 文件名的命名主体 SHOULD 使用 `kebab-case`，例如 `user-form.tsx`。
- `-` 用于连接同一 segment 内的多个单词，例如 `user-form.tsx`。
- 文件名 MAY 使用一段或多段 `.` 分隔不同语义的 segments；每个 non-extension segment SHOULD 表达明确语义，例如 `users.types.ts`、`user-form.test.tsx`、`user-form.module.css`。
- 文件需要同时表达命名主体和文件职责时，MAY 使用 `<subject>.<suffix>` 命名，例如 `users.types.ts`。
- 普通单一职责模块 MAY 使用简短文件名，例如 `env.ts`、`cn.ts`、`index.ts`。
- React component 和 hook 的目录和文件遵循上述规则，MUST NOT 使用 `PascalCase`。

常见命名例外：

- 工具强制路径，例如 `.github/`、`.husky/`、`.vscode/`、`src/@types/`。
- BCP 47 locale tags，例如 `zh-Hans/`。
- 约定俗成的根目录文件，例如 `README.md`、`AGENTS.md`、`Dockerfile`、`LICENSE`。
- 由生成工具控制命名的 generated files。

### Singular And Plural Names

- 可数业务资源 SHOULD 使用复数目录名和文件名前缀，例如 `users`、`products`、`orders`。
- 不可数名词、能力、领域概念 SHOULD 使用自然形式，例如 `auth`、`metadata`、`traffic`。

### Semantic Naming

- Collection SHOULD 通过容器或明确集合语义表达，例如 type `User[]`、variable `users`、type `UserList`。
- List item 只在列表项结构确实不同于详情结构时 SHOULD 使用 `<ResourceSingular>ListItem` stem，例如 type `UserListItem`、variable `userListItem`、schema `userListItemSchema`。
- Form values SHOULD 使用 `<Subject>FormValues` stem，例如 type `UserFormValues`、variable `userFormValues`、schema `userFormValuesSchema`。
- 处理 form values 的 function 或 hook MAY 在名称中保留 `FormValues`，例如 `mapUserFormValuesToCreateUserRequestBodyDto()`、`useUserFormValues()`。

## Project Structure

### Root

根目录 MAY 出现以下目录，不代表需要每个目录。目录 MUST 有真实用途，MUST NOT 为凑齐结构创建空目录。

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
└── src/
```

- `.github/`：GitHub platform configuration。
- `.husky/`：Git hooks，仅在启用 Husky 时存在。
- `.vscode/`：团队共享且低争议的 editor configuration。
- `config/`：项目级工具配置拆分目录，非必要不创建。
- `docs/`：项目文档。
- `e2e/`：end-to-end tests，仅在启用 Playwright 或同类工具时创建。
- `public/`：不经 bundler 处理的静态资源。
- `scripts/`：项目维护、代码生成、检查、发布脚本，非必要不创建。
- `src/`：应用源代码。

### Source

`src/` 下 MAY 出现以下目录和入口文件，不代表需要每个目录。目录 MUST 按实际职责创建。

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
- `helpers/`：项目独有的 helper functions，不可跨项目复制。
- `hooks/`：跨 feature 复用的 React hooks。
- `lib/`：第三方库适配、基础设施封装、配置后的 clients。
- `locales/`：i18n resource files。
- `mocks/`：mock handlers、mock data 和 mock utilities。
- `models/`：跨 feature 共享的前端数据模型及其边界转换。
- `routes/`：route-level components。
- `services/`：明确的应用级 orchestration services，非必要不创建。
- `stores/`：跨 feature client state stores，仅在引入对应状态管理方案时创建。
- `styles/`：global style entry points 和 global CSS。
- `testing/`：测试工具、custom render、test setup helpers。
- `utils/`：可跨项目复制的 generic utilities。
- `index.tsx`：React bootstrap entry。

### Placement

- 只服务一个 feature 的代码 SHOULD 放在 `features/<feature>/`。
- 跨 features 复用但仍有稳定业务语义的代码 SHOULD 放在合适的 shared module，例如 `components/business/`、`models/` 或 `api/`。
- 无项目业务语义、可跨项目复制的 pure utilities SHOULD 放在 `utils/`。
- 第三方库适配、configured clients 和基础设施封装 SHOULD 放在 `lib/`。
- 跨 features 的 orchestration 只有在无法归属于 route、单一 feature、API operation、model、hook 或 component 时，才 MAY 放在 `services/`。
- 目录没有真实代码和明确职责时，MUST NOT 创建。
- 需要新增本文档未列出的目录时，SHOULD 基于明确职责，并优先采用相关框架或工具的官方文档、正式规范、相关标准或社区通行实践中的目录命名。

## API

`api/` 存放 API request functions、TanStack Query queries、TanStack Query mutations，以及由多个 API requests 组成的 operations。

- 某个 feature 专有的 API SHOULD 放在 `features/*/api/`。
- 多个 features 共享的 API 代码才 SHOULD 提升到 `src/api/`。

### Files

API files SHOULD 按 resource 和 file suffix 组织。

常用 API file suffix：

- `<resource>.requests.ts`：对应后端 endpoints 的 request functions；MUST NOT 包含 React、TanStack Query hooks 或 UI side effects。
- `<resource>.operations.ts`：多个 request functions 组成的 frontend async operations；MUST NOT 包含 React 或 UI side effects。
- `<resource>.queries.ts`：读操作的 TanStack Query `queryOptions`、query factories 和 query hooks。
- `<resource>.mutations.ts`：写操作的 TanStack Query mutations、mutation hooks、cache invalidation 和 cache update。

示例：

```text
api/
├── users.requests.ts
├── users.operations.ts
├── users.queries.ts
└── users.mutations.ts
```

### Naming

API 原始数据结构、query params、request body 和 response body SHOULD 使用 `Dto` 后缀。

常用 API 边界命名：

- API resource shape 使用 `<ResourceSingular>Dto`，例如 `UserDto`。
- Path params 使用 `<Operation>PathParams`，例如 `GetUserPathParams`。
- Query params 使用 `<Operation>QueryParamsDto`，例如 `ListUsersQueryParamsDto`。
- Request headers 使用 `<Operation>RequestHeaders`，例如 `ExportUsersRequestHeaders`。
- Request body 使用 `<Operation>RequestBodyDto`，例如 `CreateUserRequestBodyDto`、`UpdateUserRequestBodyDto`。
- Response body 使用 `<Operation>ResponseDto`，例如 `ListUsersResponseDto`、`GetUserResponseDto`。

常用 API operation 命名：

- `GET` 集合读取：request function SHOULD 使用 `list<ResourcePlural>`，query hook SHOULD 使用 `use<ResourcePlural>Query`，`useInfiniteQuery` hook SHOULD 使用 `use<ResourcePlural>InfiniteQuery`，例如 `listUsers` / `useUsersQuery` / `useUsersInfiniteQuery`。
- `GET` 详情读取：request function SHOULD 使用 `get<ResourceSingular>`，query hook SHOULD 使用 `use<ResourceSingular>Query`，例如 `getUser` / `useUserQuery`。
- `POST` 单资源创建：request function SHOULD 使用 `create<ResourceSingular>`，mutation hook SHOULD 使用 `useCreate<ResourceSingular>Mutation`，例如 `createUser` / `useCreateUserMutation`。
- `PATCH` 单资源局部更新：request function SHOULD 使用 `update<ResourceSingular>`，mutation hook SHOULD 使用 `useUpdate<ResourceSingular>Mutation`，例如 `updateUser` / `useUpdateUserMutation`。
- `PUT` 单资源完整替换：request function SHOULD 使用 `replace<ResourceSingular>`，mutation hook SHOULD 使用 `useReplace<ResourceSingular>Mutation`，例如 `replaceUser` / `useReplaceUserMutation`。
- `DELETE` 单资源删除：request function SHOULD 使用 `delete<ResourceSingular>`，mutation hook SHOULD 使用 `useDelete<ResourceSingular>Mutation`，例如 `deleteUser` / `useDeleteUserMutation`。
- Client-side multi-resource operation：request function SHOULD 使用 `<action><ResourcePlural>`，mutation hook SHOULD 使用 `use<Action><ResourcePlural>Mutation`，例如 `deleteUsers` / `useDeleteUsersMutation`。
- Server-side bulk endpoint：request function SHOULD 使用 `bulk<Action><ResourcePlural>`，mutation hook SHOULD 使用 `useBulk<Action><ResourcePlural>Mutation`，例如 `bulkDeleteUsers` / `useBulkDeleteUsersMutation`。
- Server-side batch endpoint：request function SHOULD 使用 `batch<Action><ResourcePlural>`，mutation hook SHOULD 使用 `useBatch<Action><ResourcePlural>Mutation`，例如 `batchWriteUsers` / `useBatchWriteUsersMutation`。

### Mapping

- DTO-to-model mapping SHOULD 在返回 frontend model 的 request function 中完成。
- `*.requests.ts` SHOULD 同时支持返回 frontend model 的 request functions 和返回 raw DTO 的 request functions。
- UI code SHOULD 优先调用返回 frontend model 的 request functions；只有确实需要 raw DTO 时才 MAY 调用返回 raw DTO 的 request functions。
- mapping 逻辑本身 SHOULD 放在 `models/*.mappers.ts`。

### Operations

- `*.requests.ts` SHOULD 只放对应后端 API endpoints 的 request functions。
- `*.operations.ts` SHOULD 放由多个 request functions 组成的 frontend async operations。
- client-side multi-resource operation 指由前端多次调用单资源 API 组成的 operation；复用时 SHOULD 放在 `*.operations.ts`。
- client-side multi-resource operation 若只服务一个 mutation hook 且不导出复用，MAY 作为 private function 留在 `*.mutations.ts`。
- server-side bulk endpoint 指后端一次 request 对多个 resources 执行同一种 action；endpoint function SHOULD 放在 `*.requests.ts`。
- server-side batch endpoint 指后端一次 request 提交一批 operations，且 operations MAY 包含不同 action；endpoint function SHOULD 放在 `*.requests.ts`。
- operations MUST NOT 依赖 React，MUST NOT 承载 UI side effects。

### TanStack Query

- Query factory SHOULD 使用 `<resourcePlural>Queries`，例如 `usersQueries`。
- normal queries SHOULD 使用 `queryOptions` 管理；infinite queries SHOULD 使用 `infiniteQueryOptions` 管理。
- custom hooks wrapping `useQueries` SHOULD 使用 `use<ResourcePlural>Queries`，例如 `useUsersQueries`。
- request function 和对应 TanStack Query hook SHOULD NOT 放在同一个文件。

### URL Search Naming

URL 查询相关变量 SHOULD 使用以下语义：

- `queryParams`：对象形式的查询参数集合，例如 `{ a: 1, b: 2 }`。
- `queryString`：不带 `?` 的序列化查询串，例如 `a=1&b=2`。
- `search`：带 `?` 的完整查询串，语义对齐 Web 标准 `URL.search`。
- `searchParams`：`URLSearchParams` 实例。

## Application Composition

`src/app/` 是应用组合层，不是业务 feature 层，也不是 shared component 层。

- `src/index.tsx` SHOULD 只承担 global side-effect imports 与 React root creation。
- `src/app/index.tsx` SHOULD 负责 app composition。
- `src/app/routes.tsx` SHOULD 负责 route definitions。
- `src/app/providers/` SHOULD 负责组合全局 providers。
- app layer MAY 组合 routes、providers、global boundaries 和 feature entry components。
- shared code 和 features MUST NOT 反向依赖 app layer。
- `src/app/` MUST NOT 放业务 resource models、feature-specific components、API request functions 或通用 UI components。

## Assets

`assets/` 存放会被 source code import 的 bundled assets。

- 应用级 bundled assets SHOULD 放在 `src/assets/`。
- feature-specific bundled assets SHOULD 放在 `features/*/assets/`。
- 需要固定文件名或 root-absolute access 的 assets MAY 放在 `public/`。
- `public/` assets MUST 使用 root absolute path 引用。
- 作为 URL 使用的 SVG、图片等 assets SHOULD 使用普通 import。
- 作为 React component 使用的 SVG SHOULD 使用 `?react` import。

## Components

`src/components/` 存放跨 feature 复用的 UI components，不依赖业务 feature。

常用 components 子目录 MAY 按职责创建。

```text
components/
├── business/
├── errors/
├── layouts/
└── ui/
```

- `ui/` 存放 design system 基础组件和低业务语义的共享 UI components。
- `business/` 存放跨多个 features 复用且业务语义稳定的 shared business components。
- `errors/` 存放共享 error boundary fallback 和错误展示 components。
- `layouts/` 存放跨 route 或跨 feature 复用的布局 components。

### Component Files

- React component 文件名 MUST 使用 `kebab-case`，例如 `user-form.tsx`。
- Component-local companion files SHOULD 使用同一个 `<component>` 前缀，例如 `user-form.constants.ts`、`user-form.helpers.ts`、`user-form.module.css`、`user-form.test.tsx`。
- Component-scoped CSS Modules 和 component tests SHOULD 靠近 component。
- 可复用 helper SHOULD 提升到 `utils/`、`helpers/`、feature 或 shared module。

## Configuration

`config/` 存放运行时配置、环境变量解析、应用级配置对象，或项目级工具配置拆分目录。

- `src/config/` SHOULD 用于应用运行时配置。
- 根目录 `config/` SHOULD 用于项目级工具配置拆分。
- 业务 resource constants MUST NOT 放入 `config/`。
- `configs/` SHOULD NOT 作为目录名。

## Features

`features/*/` 存放某个业务 feature 私有的代码。feature 内同名目录复用 `src/` 下目录职责，只是作用域收窄到当前 feature。

常用 feature 子目录 MAY 按需创建。

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

- `api/` 和 `models/` 在 feature 内 MUST 只服务当前 feature。
- `services/` 仅在当前 feature 存在明确 orchestration service 时 MAY 创建。
- `stores/` 仅在当前 feature 存在独立 client state store 时 MAY 创建。
- `styles/` 仅在需要 feature-level CSS / CSS Modules 时 MAY 创建。

## Helpers

`helpers/` 存放 project-specific helper functions。

- `helpers/` MAY 带项目语义，但 MUST NOT 作为杂物目录。
- feature-specific helpers SHOULD 放在 `features/*/helpers/`。
- 可跨项目复制的纯工具 SHOULD 放在 `utils/`。

## Hooks

`hooks/` 存放跨 feature 复用的 React hooks。

- Shared hooks MAY 依赖 `lib/`、`utils/`、`config/` 和稳定的 shared hooks。
- Shared hooks MUST NOT 依赖 `features/*/`、`routes/` 或 `app/`。
- feature-specific hooks SHOULD 放在 `features/*/hooks/`。
- 封装业务 resource 的 TanStack Query hooks SHOULD 放在对应的 `api/*.queries.ts` 或 `api/*.mutations.ts` 文件中，而不是 generic `hooks/`。

## Libraries

`lib/` 存放第三方库适配、基础设施封装、配置后的 clients。

- request client、i18n client、analytics adapter 等 SHOULD 放在 `lib/`。
- `lib/` 中的封装 SHOULD 隐藏第三方库的项目级配置细节。
- `lib/` MUST NOT 放 feature-specific 业务流程。

## Localization

`locales/` 存放 i18n resource files。

- Locale directories SHOULD 使用 BCP 47 locale tags，例如 `en/` 和 `zh-Hans/`。
- Locale resources MUST 保持为数据文件；business logic MUST NOT 放在 locale resources 中。
- 用户可见文案 SHOULD 使用 i18n resources，SHOULD NOT 直接写 literal strings。
- locale resources MUST 放在 `src/locales/`。
- generated i18next types MUST 放在 `src/@types/`。
- i18next config MUST 放在 `i18next.config.ts`。

## Mocking

`mocks/` 存放 mock handlers、mock data 和 development/test mock utilities。

- `mocks/` SHOULD 仅在使用 MSW 或同类 mock 方案时创建。
- feature-specific mock data 若不跨 features 复用，SHOULD 靠近所属 feature。
- Mock code MUST NOT 进入 production runtime path。

## Models

`models/` 存放前端对业务资源、API 数据、表单数据、运行时校验、数据转换的纯模型代码。

`models/` MAY 包含 frontend model types、API DTO types、form value types、schemas、constants、mappers、type guards、fixtures、factories 和 colocated unit tests。

常见 models 文件 MAY 使用 `<subject>.<suffix>` 组织。

```text
models/
├── users.constants.ts
├── users.mappers.ts
├── users.schemas.ts
└── users.types.ts
```

常用 models file suffix：

- `constants`：常量、选项表、映射表。
- `factories`：测试或开发数据工厂。
- `fixtures`：测试或开发 fixtures。
- `guards`：type guards 或 narrow functions。
- `mappers`：数据边界转换函数。
- `schemas`：运行时校验 schemas。
- `types`：TypeScript types、interfaces、DTOs、form values。

Constants:

- resource-level constants SHOULD 放在 `models/*.constants.ts`。
- 普通 exported constants SHOULD 使用 `camelCase`。
- 真正常量语义强、不会按业务对象演化的 primitive constants MAY 使用 `UPPER_SNAKE_CASE`。
- 对象、数组、选项表、映射表等常量 SHOULD 使用 `as const` 保留 literal types。
- 需要校验对象形状但保留具体推断时，SHOULD 使用 `satisfies`。
- 应用源码 SHOULD 避免使用 TypeScript `enum`；enum-like runtime values SHOULD 使用 `as const` object / array 加 union type。
- 生成代码或明确要求使用 `enum` 的 tooling MAY 例外。

Schemas:

- schema value SHOULD 使用 `camelCase`，并以 `Schema` 结尾，例如 `userSchema`、`createUserFormValuesSchema`。

Mappers:

- mapper SHOULD 使用 `map<Source>To<Target>`，例如 `mapUserDtoToUser()`。
- mapper MUST 是纯函数。
- mapper SHOULD 放在 `models/*.mappers.ts`。
- 展示格式化 SHOULD NOT 使用 `map`，SHOULD 使用 `format`。

Dependencies:

- `models/` MAY 被 `api/`、components、hooks、routes 使用。
- `models/` MUST NOT 依赖 `api/`。
- `models/` MUST NOT 包含网络请求、TanStack Query hooks、React components、route composition 或 UI side effects。
- `*.fixtures.ts` 和 `*.factories.ts` MUST NOT 进入运行主路径。

Source of truth:

- runtime values 的 source of truth 是 constants。
- runtime validation 的 source of truth 是 schemas。
- compile-time contracts 的 source of truth 是 types 或 generated types。
- API boundary shape 的 source of truth 是后端契约或 generated DTOs。
- types SHOULD NOT 为了复用常量而反向制造 runtime import cycle。

## Routing

`src/routes/` 存放 route-level components。

- route-level components MAY 组合 features 和 shared components。
- route-level components SHOULD 保持薄，职责 SHOULD 聚焦 route layout、route params、page-level composition 和 route-level error/loading states。
- feature-specific complex UI SHOULD 放在 `features/*/components/`。
- route-level components MUST NOT 作为跨 feature 复用组件目录。
- route-level errors SHOULD 使用 `RouteErrorBoundary`。

## Services

`services/` 存放明确的 orchestration services。

- `services/` SHOULD NOT 作为 baseline 目录创建。
- 应用级 services 仅在 orchestration 跨 features 复用，且不归属于 route 或单一 feature 时，MAY 放在 `src/services/`。
- feature-specific services SHOULD 放在 `features/*/services/`。
- API request functions 组成的 orchestration SHOULD 放在 `api/*.operations.ts` 或 `features/*/api/*.operations.ts`。
- Services MUST NOT 作为 API requests、models、hooks、stores 或 UI logic 的通用归置目录。

## State Stores

`stores/` 存放 client state stores。

- `stores/` SHOULD 仅在项目使用明确的 client state management library 或 store pattern 时创建。
- Server state SHOULD 留在 TanStack Query 中，而不是复制到 client stores。
- feature-specific stores SHOULD 放在 `features/*/stores/`。
- Stores MUST NOT 依赖 routes 或 app composition code。

## Styling

`styles/` 存放 global style entry points 和 global CSS。

- Tailwind CSS SHOULD 作为 baseline styling approach。
- CSS / CSS Modules SHOULD 只作为 fallback。
- Global style entry points MUST 放在 `src/styles/`。
- component-scoped CSS Modules SHOULD 靠近 component。
- component-scoped CSS Modules MUST 使用 `<component>.module.css`。
- CSS Modules locals MUST 使用 `camelCase`。
- `style.css`、`styles.css`、`style.module.css` SHOULD NOT 作为 component-scoped CSS Modules 命名。

## Testing

`testing/` 存放测试工具、custom render、test setup helpers 和跨测试复用的 test utilities。

- Unit / component tests MUST 使用 `*.test.ts` / `*.test.tsx`。
- Playwright e2e tests MUST 使用 `*.spec.ts`。
- `*.tests.ts` 和 `*.testing.tsx` MUST NOT 作为测试文件后缀。
- `__tests__/` SHOULD NOT 作为 baseline 测试目录。
- 跨 tests 复用的 test utilities SHOULD 放在 `src/testing/`。
- 单一 module 使用的 test helpers SHOULD 与该 module colocate。
- Production code MUST NOT 依赖 `src/testing/`。

## Utilities

`utils/` 存放可跨项目复制的 generic utilities。

- `utils/` SHOULD 能相对容易复制到其他项目使用。
- `utils/` SHOULD 保持纯函数和低业务语义。
- `utils/` MUST NOT 依赖 `src/features/*/`。
- `utils/` MUST NOT 发起 API requests。
- request client、configured third-party clients SHOULD 放在 `lib/`，MUST NOT 放在 `utils/`。

## Imports

- Direct imports SHOULD 作为 baseline import style。
- Feature-level `index.ts` public API SHOULD NOT 作为 baseline。
- 全局聚合 barrel files SHOULD NOT 作为 baseline。
- `export *` 聚合整个目录 SHOULD NOT 作为 baseline。
- 小范围 module entry MAY 使用，但它 MUST 代表真实模块边界。
- import 语句 MUST 遵守本文档定义的依赖方向。
- 仅导入 types 时，MUST 使用 `import type`。
- type-only exports MUST 使用 `export type`。
- 同一个模块同时导入 runtime values 和 types 时，SHOULD 遵守当前 ESLint 配置自动修复后的形式。
- TypeScript 和 ESLint 配置是 type-only import / export 自动检查的权威来源。

## Tooling Coverage

Tool configuration files 是 automated enforcement 的权威来源；verification commands 由 `AGENTS.md`、`README.md` 和 `package.json` 维护。

- File naming、import sorting、type-only imports / exports、unused imports、i18n literal strings、i18n resources、CSS Modules locals 和部分 TanStack Query rules MAY 由 tooling 自动检查。
- Feature boundaries、directory ownership、DTO-to-model mapping stage、query params normalization、business semantics 和 cross-feature reuse boundaries MUST 通过 code review 检查。
