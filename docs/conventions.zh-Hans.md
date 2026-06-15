# Conventions

本文档定义会影响长期可维护性的前端工程约定：代码边界、依赖方向、目录结构、命名模式和实现约定。

当本文档与现有代码、tool configuration、generated files、design source 或其他已存在事实冲突时，MUST 以现有事实为准，并将冲突视为 documentation drift 或待确认 migration。MUST NOT 在没有明确任务时仅为匹配本文档而改动现有实现。

本文档列出的目录是允许结构，不是必备结构。目录 MUST 按真实需要创建；未列出的目录 MAY 在有明确职责且符合相关框架、工具或社区通行实践时创建。

本文档没有规定的内容，SHOULD 优先遵守邻近代码的既有模式；没有稳定既有模式时，SHOULD 参考相关框架、工具或库的官方文档与社区通行实践。

## Normative Keywords

本文档中的 `MUST`、`MUST NOT`、`SHOULD`、`SHOULD NOT` 和 `MAY` 在且仅在大写形式出现时，按照 [BCP 14](https://www.rfc-editor.org/info/bcp14/) 解释。

- `MUST`：绝对要求。
- `MUST NOT`：绝对不可采用。
- `SHOULD`：推荐做法；偏离需有明确理由。
- `SHOULD NOT`：非推荐做法；偏离需有明确理由。
- `MAY`：可选做法。

## Principles

- Shared code 与 feature-specific code MUST 分离。
- Code flow SHOULD 保持单向：shared code -> features -> app / routes。
- Features MUST NOT 直接互相 import。跨 feature 协作 SHOULD 在 app / routes 层组合，或抽取到合适的 shared module。
- Shared code MUST NOT 依赖 app、routes 或 features。
- 只服务一个 feature 的代码 SHOULD 留在该 feature 内。
- 目录 MUST 对应真实职责、真实代码和真实维护边界。
- 项目 MUST NOT 为每个 feature 机械创建所有可能目录。

## Project Structure

### Root

项目根目录 MAY 包含以下目录：

```text
.
├── config/
├── docs/
├── e2e/
├── public/
├── scripts/
└── src/
```

- `config/`：项目级工具配置拆分目录，非必要不创建。
- `docs/`：项目文档。
- `e2e/`：end-to-end tests，仅在启用 Playwright 或同类工具时创建。
- `public/`：不经 bundler 处理的静态资源。
- `scripts/`：项目维护、代码生成、检查、发布脚本，非必要不创建。
- `src/`：应用源代码。

### Source

`src/` MAY 包含以下目录和入口文件：

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
- `api/`：跨 feature 共享的 API requests、queries、mutations 和 operations。
- `app/`：应用组合层。
- `assets/`：应用级 bundled assets。
- `components/`：跨 feature 复用的 shared UI components。
- `config/`：运行时配置、环境变量解析和应用级配置对象。
- `features/`：业务 feature 的主要组织位置。
- `helpers/`：project-specific helper functions。
- `hooks/`：跨 feature 复用的 React hooks。
- `lib/`：第三方库适配、configured clients 和基础设施封装。
- `locales/`：i18n resource files。
- `mocks/`：mock handlers、mock data 和 mock utilities。
- `models/`：跨 feature 共享的前端数据模型及其边界转换。
- `routes/`：route-level components。
- `services/`：明确的 application orchestration services，非必要不创建。
- `stores/`：跨 feature client state stores，仅在引入对应状态管理方案时创建。
- `styles/`：global style entry points 和 global CSS。
- `testing/`：测试工具、custom render、test setup helpers。
- `utils/`：可跨项目复用的 generic utilities。
- `index.tsx`：React bootstrap entry。

## Naming

### Folders And Files

- 目录名 MUST 使用 `kebab-case`，除明确例外外 MUST NOT 使用大写字母。
- 文件名的命名主体 SHOULD 使用 `kebab-case`，例如 `user-form.tsx`。
- 文件名 MAY 使用 `.` 分隔命名主体和文件职责，例如 `users.types.ts`、`users.queries.ts`、`user-list.helpers.ts`、`user-form.test.tsx`、`user-form.module.css`。
- React component 和 hook 的目录名、文件名遵循同一规则，MUST NOT 使用 `PascalCase`。
- 工具强制路径、locale tags、根目录约定文件和 generated files MAY 使用各自既有命名。

### Singular And Plural Names

- 可数业务 resource 的目录名和文件名前缀 SHOULD 使用复数，例如 `users`、`products`。
- 不可数名词、能力和领域概念 SHOULD 使用自然形式，例如 `auth`、`metadata`、`traffic`。

### Semantic Names

- Collection 名称 SHOULD 通过容器或明确集合语义表达，例如 `User[]`、`Users`、`UserList`、`users`、`userList`。
- List item 只在列表项结构确实不同于详情结构时 SHOULD 使用 `<ResourceSingular>ListItem` stem，例如 `UserListItem`、`userListItem`。
- Form values SHOULD 使用 `<Subject>FormValues` stem，例如 `UserFormValues`、`userFormValues`、`userFormValuesSchema`、`mapUserFormValuesToCreateUserRequestBody`、`useUserFormValues`。

## Features

`features/*/` 存放某个业务 feature 私有的代码。feature 内目录复用 `src/` 下同名目录的职责，只是作用域收窄到当前 feature。

Feature MAY 包含以下目录：

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

- `features/*/api/` 和 `features/*/models/` MUST 只服务当前 feature。
- Feature-specific code SHOULD 留在对应 feature 内。
- 跨 feature 复用的代码 SHOULD 提升到 shared module，或在 app / routes 层组合。

## App And Routes

- `src/index.tsx` SHOULD 只承担 global side-effect imports 与 React root creation。
- `src/app/` SHOULD 负责 app composition、global providers 和 global boundaries。
- `src/routes/` SHOULD 负责 route-level composition、route params、route-level loading / error states。
- app / routes MAY 组合 features 和 shared code。
- app / routes MUST NOT 作为业务 resource models、feature-specific components、API request functions 或通用 UI components 的归置目录。

## Components

`src/components/` 存放跨 feature 复用的 UI components，不依赖 feature internals。

```text
components/
├── business/
├── errors/
├── layouts/
└── ui/
```

- `ui/` 存放 design system 基础组件和低业务语义的 shared UI components。
- `business/` 存放跨多个 features 复用且业务语义稳定的 shared business components。
- `errors/` 存放共享 error boundary fallback 和错误展示 components。
- `layouts/` 存放跨 route 或跨 feature 复用的布局 components。

Component-local companion files SHOULD 与 component colocate，例如 `user-form.test.tsx`、`user-form.module.css`、`user-form.helpers.ts`。

## Models

`models/` 存放前端对业务 resource、API 数据、表单数据、运行时校验和数据转换的纯模型代码。

常用文件后缀：

- `<subject>.types.ts`：TypeScript types、interfaces、DTOs、form values。
- `<subject>.schemas.ts`：runtime validation schemas。
- `<subject>.constants.ts`：constants、options、mapping tables。
- `<subject>.mappers.ts`：API DTO、frontend model、form values 之间的纯转换函数。

其他文件后缀 MAY 在确有需要时使用：

- `<subject>.guards.ts`：type guards 或 narrow functions。
- `<subject>.fixtures.ts`：测试或开发 fixtures。
- `<subject>.test.ts`：colocated unit tests。

### Constants

- 具有项目级常量语义的 constants SHOULD 使用 `UPPER_SNAKE_CASE`。
- Local variables 和非 constant 语义的 runtime values SHOULD 使用 `camelCase`。
- 需要保留 literal types 的 constants SHOULD 使用 `as const`。
- 需要校验对象形状但保留具体推断时，SHOULD 使用 `satisfies`。
- 应用源码 SHOULD 避免使用 TypeScript `enum`；enum-like runtime values SHOULD 使用 `as const` object / array 加 union type。生成代码或明确要求使用 `enum` 的 tooling MAY 例外。

### Schemas

- Schema value SHOULD 使用 `camelCase`，并以 `Schema` 结尾，例如 `userSchema`。

### Mappers

- Mapper MUST 是纯函数。
- Mapper SHOULD 放在 `models/*.mappers.ts`。

### Dependencies

- `models/` MAY 被 `api/`、components、hooks 和 routes 使用。
- `models/` MUST NOT 依赖 `api/`。
- `models/` MUST NOT 包含网络请求、TanStack Query hooks、React components、route composition 或 UI side effects。

## API

`api/` 存放 API request functions、TanStack Query integration，以及由多个 API requests 组成的 operations。

- 某个 feature 专有的 API SHOULD 放在 `features/*/api/`。
- 多个 features 共享的 API 代码才 SHOULD 提升到 `src/api/`。

常用文件命名：

- `<resource>.requests.ts`：后端 endpoint request functions；MUST NOT 包含 React、TanStack Query hooks 或 UI side effects。
- `<resource>.operations.ts`：由多个 request functions 组成的 frontend async operations；MUST NOT 包含 React 或 UI side effects。
- `<resource>.queries.ts`：读操作的 TanStack Query query factories、`queryOptions` / `infiniteQueryOptions` 和 query hooks。
- `<resource>.mutations.ts`：写操作的 TanStack Query mutation hooks、cache invalidation 和 cache updates。

### API Naming

- `GET` collection request SHOULD 使用 `list<ResourcePlural>`，query hook SHOULD 使用 `use<ResourcePlural>Query`，infinite query hook SHOULD 使用 `use<ResourcePlural>InfiniteQuery`。
- `GET` detail request SHOULD 使用 `get<ResourceSingular>`，query hook SHOULD 使用 `use<ResourceSingular>Query`。
- `POST` create request SHOULD 使用 `create<ResourceSingular>`，mutation hook SHOULD 使用 `useCreate<ResourceSingular>Mutation`。
- `PATCH` partial update request SHOULD 使用 `update<ResourceSingular>`，mutation hook SHOULD 使用 `useUpdate<ResourceSingular>Mutation`。
- `PUT` replace request SHOULD 使用 `replace<ResourceSingular>`，mutation hook SHOULD 使用 `useReplace<ResourceSingular>Mutation`。
- `DELETE` request SHOULD 使用 `delete<ResourceSingular>`，mutation hook SHOULD 使用 `useDelete<ResourceSingular>Mutation`。
- Custom hooks wrapping `useQueries` SHOULD 使用 `use<ResourcePlural>Queries`。
- Client-side multi-resource operation SHOULD 使用 `<action><ResourcePlural>`，例如 `deleteUsers`。
- Server-side bulk endpoint SHOULD 使用 `bulk<Action><ResourcePlural>`，例如 `bulkDeleteUsers`。
- Server-side batch endpoint SHOULD 使用 `batch<Action><ResourcePlural>`，例如 `batchWriteUsers`。

### URL Search Naming

URL search 相关名称保留以下语义：

- `queryParams` MAY 表示对象形式查询参数。
- `queryString` MAY 表示不带 `?` 的序列化查询串。
- `search` MAY 对齐 Web 标准 `URL.search`，表示带 `?` 的完整查询串。
- `searchParams` MAY 表示 `URLSearchParams` instance。

### TanStack Query

- Query factories SHOULD 使用 `queryOptions` / `infiniteQueryOptions` 管理 `queryKey` 和 `queryFn`。
- Query keys SHOULD 包含所有会影响 `queryFn` 结果的 variables。
- Query hooks SHOULD 复用 query factory options，避免重复定义 `queryKey` 和 `queryFn`。

### DTO And Mapping

- `Dto` 表示 API raw boundary shape，不表示每个 operation 都必须创建独立类型。
- API resource raw shape SHOULD 使用 `<ResourceSingular>Dto`，例如 `UserDto`。
- Response body raw shape SHOULD 使用 `<Operation>ResponseDto`，例如 `ListUsersResponseDto`。
- Path params SHOULD 使用 `<Operation>PathParams`。
- Frontend-facing query params、request headers 和 request body MAY 直接复用 frontend model、form values 或 function params。
- Query params、request headers 或 request body 只有在需要单独表达 API raw boundary shape 时才 SHOULD 使用 `*Dto` 后缀。
- API raw shape 与前端使用的数据结构存在字段、命名、nullable、格式、嵌套结构或语义差异时，SHOULD 定义独立 `*Dto` 类型，并通过 mapper 转换。
- DTO 类型 SHOULD NOT 仅为保持命名统一而重复创建。
- DTO-to-model mapping SHOULD 在返回 frontend model 的 request function 中完成；mapping 逻辑本身 SHOULD 放在 `models/*.mappers.ts`。
- UI code SHOULD 优先调用返回 frontend model 的 request function；只有确实需要 raw DTO 时才调用返回 raw DTO 的 request function。

## Styling

- Tailwind CSS SHOULD 作为 baseline styling approach。
- CSS / CSS Modules SHOULD 只在 Tailwind CSS 不适合时使用。
- Global style entry points SHOULD 放在 `src/styles/`。
- Component-scoped CSS Modules SHOULD 靠近 component，并使用 `<component>.module.css`。

## Testing

- Unit / component tests 使用 `*.test.ts` / `*.test.tsx`，并 MAY 与被测 module colocate；`models/` 下的 unit tests 使用 `*.test.ts`。
- Playwright e2e tests 使用 `*.spec.ts`。
- 跨测试复用的 test utilities SHOULD 放在 `src/testing/`。
- 单一 module 使用的 test helpers SHOULD 与该 module colocate。
- Production code MUST NOT 依赖 `src/testing/`。

## Imports

- Direct imports SHOULD 作为 baseline import style：从实际定义文件或明确 module entry 导入，而不是从目录级 barrel file 导入。
- Feature-level `index.ts` public API 和全局 barrel files SHOULD NOT 作为 baseline。
- 小范围 module entry MAY 使用，但它必须代表真实模块边界。
- Import 语句 MUST 遵守本文档定义的 code flow。
- Type-only imports / exports 遵守 TypeScript 和 ESLint 配置；tool configuration 是自动检查的权威来源。
