# Conventions

本文档定义会影响长期可维护性的前端工程约定：代码边界、依赖方向、目录结构、命名模式和实现约定。

当本文档与现有代码、tool configuration、generated files、design source 或其他已存在事实冲突时，MUST 以现有事实为准，并将冲突视为 documentation drift 或待确认 migration。MUST NOT 在没有明确任务时仅为匹配本文档而改动现有实现。

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

## Naming

### Folders And Files

- 目录名 MUST 使用 `kebab-case`，除明确例外外 MUST NOT 使用大写字母。
- 文件名的命名主体 SHOULD 使用 `kebab-case`，例如 `user-form.tsx`。
- 文件名 MAY 使用 `.` 分隔命名主体和文件职责，例如 `users.types.ts`、`users.queries.ts`、`user-list.helpers.ts`、`user-form.test.tsx`、`user-form.module.css`。
- React component 和 hook 的目录名、文件名遵循同一规则，MUST NOT 使用 `PascalCase`。
- 工具强制路径、locale tags、根目录约定文件和 generated files MAY 使用各自既有命名。

### Singular And Plural Names

- 可数业务的目录名和文件名前缀 SHOULD 使用复数，例如 `users`、`products`。
- 不可数名词、能力和领域概念 SHOULD 使用自然形式，例如 `auth`、`metadata`、`traffic`。

### Semantic Names

- Collection 名称 SHOULD 通过容器或明确集合语义表达，例如 `User[]`、`Users`、`UserList`、`users`、`userList`。
- List item 只在列表项结构确实不同于详情结构时 SHOULD 使用 `<ResourceSingular>ListItem` stem，例如 `UserListItem`、`userListItem`。
- Form values SHOULD 使用 `<Subject>FormValues` stem，例如 `UserFormValues`、`userFormValues`、`userFormValuesSchema`、`mapUserFormValuesToCreateUserRequestBody`、`useUserFormValues`。

## Project Structure

【需要说明，下面没有的目录，如果实际需要，是可以创建的】

### Root

项目根目录下的目录 MUST 按真实需要创建。目录清单是允许结构，不是必备结构。

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

`src/` 下的目录 MUST 按真实需要创建。目录清单是允许结构，不是必备结构。

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

【此处还是需要按照每个目录和文件简要说明】

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

【这里我建议还是要写详细】

- Request function SHOULD 使用 action + resource：`listUsers`、`getUser`、`createUser`、`updateUser`、`replaceUser`、`deleteUser`。
- TanStack Query hooks SHOULD 在对应 request action 外包裹 React hook 命名：`useUsersQuery`、`useUserQuery`、`useCreateUserMutation`。
- Client-side multi-resource operation SHOULD 使用 `<action><ResourcePlural>`，例如 `deleteUsers`。
- Server-side bulk endpoint SHOULD 使用 `bulk<Action><ResourcePlural>`，例如 `bulkDeleteUsers`。
- Server-side batch endpoint SHOULD 使用 `batch<Action><ResourcePlural>`，例如 `batchWriteUsers`。

### DTO And Mapping

- `Dto` 表示 API raw boundary shape，不表示每个 operation 都必须创建独立类型。
- API resource raw shape SHOULD 使用 `<ResourceSingular>Dto`，例如 `UserDto`。
- Response body raw shape SHOULD 使用 `<Operation>ResponseDto`，例如 `ListUsersResponseDto`。
- Path params、query params、request headers 和 request body MAY 直接复用 frontend model、form values 或 function params。
- 独立的 raw query params、raw request headers 或 raw request body shape 需要单独表达时，SHOULD 使用 `*Dto` 后缀。【这一条和上面一条需要写的更清晰】
- API raw shape 与前端使用的数据结构存在字段、命名、nullable、格式、嵌套结构或语义差异时，SHOULD 定义独立 `*Dto` 类型，并通过 mapper 转换。
- DTO 类型 SHOULD NOT 仅为保持命名统一而重复创建。
- DTO-to-model mapping SHOULD 在返回 frontend model 的 request function 中完成；mapping 逻辑本身 SHOULD 放在 `models/*.mappers.ts`。
- UI code SHOULD 优先调用返回 frontend model 的 request function；只有确实需要 raw DTO 时才调用返回 raw DTO 的 request function。

【TanStack Query 和 URL Search Naming 的部分删除了吗】

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

## Features

`features/*/` 存放某个业务 feature 私有的代码。feature 内目录复用 `src/` 下同名目录的职责，只是作用域收窄到当前 feature。

`features/*/` 下的目录 MUST 按真实需要创建。目录清单是允许结构，不是必备结构。

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

- Feature 内目录 MAY 按需创建。
- `features/*/api/` 和 `features/*/models/` MUST 只服务当前 feature。
- Feature-specific code SHOULD 留在对应 feature 内。
- 跨 feature 复用的代码 SHOULD 提升到 shared module，或在 app / routes 层组合。

## Models

`models/` 存放前端对业务 resource、API 数据、表单数据、运行时校验和数据转换的纯模型代码。

常用文件后缀：

- `<subject>.types.ts`：TypeScript types、interfaces、DTOs、form values。
- `<subject>.schemas.ts`：runtime validation schemas。
- `<subject>.constants.ts`：constants、options、mapping tables。
- `<subject>.mappers.ts`：API DTO、frontend model、form values 之间的纯转换函数。

【这里还是要加入其他的后缀，说明可能不是那么常用】

### Constants

【一般的应该都使用 UPPER_SNAKE_CASE】

- Exported constants 通常使用 `camelCase`。
- 真正常量语义强、不会按业务对象演化的 primitive constants MAY 使用 `UPPER_SNAKE_CASE`。
- 对象、数组、选项表和映射表 SHOULD 使用 `as const` 保留 literal types。【不限定于对象、数组、选项表和映射表】
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

## Styling

- Tailwind CSS SHOULD 作为 baseline styling approach。
- CSS / CSS Modules SHOULD 只在 Tailwind CSS 不适合时使用。
- Global style entry points SHOULD 放在 `src/styles/`。
- Component-scoped CSS Modules SHOULD 靠近 component，并使用 `<component>.module.css`。

## Testing

- Unit / component tests 使用 `*.test.ts` / `*.test.tsx`。
- Playwright e2e tests 使用 `*.spec.ts`。
- 跨测试复用的 test utilities SHOULD 放在 `src/testing/`。
- 单一 module 使用的 test helpers SHOULD 与该 module colocate。
- Production code MUST NOT 依赖 `src/testing/`。

## Imports

- Direct imports SHOULD 作为 baseline import style。
- Feature-level `index.ts` public API 和全局 barrel files SHOULD NOT 作为 baseline。
- 小范围 module entry MAY 使用，但它必须代表真实模块边界。
- Import 语句 MUST 遵守本文档定义的 code flow。
- Type-only imports / exports 遵守 TypeScript 和 ESLint 配置；tool configuration 是自动检查的权威来源。
