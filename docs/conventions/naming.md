# Naming

Read the [scope, normative keywords, and shared principles](README.md) before applying these conventions. See [API naming](implementation.md#api-naming) and [URL search naming](implementation.md#url-search-naming) for API-specific terms.

## Folders and Files

- Directory names MUST use `kebab-case` and, unless explicitly exempted, MUST NOT use uppercase letters.
- The main name of a file SHOULD use `kebab-case`, for example `user-form.tsx`.
- File names MAY use `.` to separate the main name from the file responsibility, for example `users.types.ts`, `users.queries.ts`, `user-list.helpers.ts`, `user-form.test.tsx`, and `user-form.module.css`.
- React component and hook directory names and file names follow the same rule, and MUST NOT use `PascalCase`.
- Tool-mandated paths, locale tags, root-level convention files, and generated files MAY follow their own established names.

## Singular and Plural Names

- Grouping directories and model / API file subjects for countable business resources SHOULD use plural names, for example `users` and `products`.
- Uncountable nouns, capabilities, and domain concepts SHOULD use their natural form, for example `auth`, `metadata`, and `traffic`.

## Semantic Names

- Code symbols directly related to form values SHOULD keep the `FormValues` / `formValues` / `FORM_VALUES` semantic segment, with casing adjusted to the symbol type and the existing naming style. Examples include `UserFormValues`, `userFormValues`, and `userFormValuesSchema`.
- List items MAY use `<ResourceSingular>ListItem` only when the list item shape is actually different from the detail shape, for example `UserListItem` and `userListItem`.

## Navigation Destination Names

These conventions apply to application-defined navigation destination names in URL query parameters, router state, component state, variables, function parameters, and object properties. Required protocol and framework API names take precedence, followed by established project conventions.

For URL query parameters, use the following naming rules:

- `return_to` SHOULD be the default for return flows, such as resuming the originally requested page after sign-in or returning to a list after viewing or editing an item.
- `redirect_to` SHOULD identify the onward destination when a page's primary purpose is forwarding to a caller-selected target, such as a link confirmation page.
- Equivalent flows SHOULD use consistent parameter names. When both descriptions fit a return flow, `return_to` SHOULD be preferred.
- Parameter names SHOULD reflect the page or flow's responsibility rather than the navigation mechanism.
- A page MAY accept both parameters when they represent distinct onward and return destinations.

The same destination semantics apply to state and other JavaScript / TypeScript identifiers. Application-defined names SHOULD use `camelCase`: `returnTo` for return flows and `redirectTo` for onward destinations, following established project conventions. Choose URL query parameters or state according to the flow's data transfer and persistence needs. Fields passed to protocols, third-party APIs, SDKs, or frameworks MUST retain their required names, including when represented as JavaScript / TypeScript object properties.
