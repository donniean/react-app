# Conventions

These documents define frontend engineering conventions that affect long-term maintainability: code boundaries, dependency direction, directory structure, naming patterns, and implementation conventions.

## Reading Guide

Read the scope, normative keywords, and shared principles on this page before applying a topic's conventions. Then read the documents relevant to the task:

- [Structure and dependencies](structure.md): directory responsibilities, feature boundaries, app and route composition, imports, and exports.
- [Naming](naming.md): general file and directory names, resource names, form values, and navigation destinations.
- [Implementation](implementation.md): assets, components, models, API integration, styling, and testing. API-specific naming belongs with the API conventions.

A task may need more than one topic. For example, adding an API module involves structure, general naming, and API implementation conventions.

## Scope

Use existing code, tool configuration, generated files, and design sources to establish current behavior. Resolve conflicts with these conventions within the requested scope: correct documentation drift or carry out an authorized migration. Ask for clarification only when the intended behavior or migration scope remains materially ambiguous. Existing implementations MUST NOT be changed solely to match these conventions unless that is the explicit task.

The directories listed in these conventions are allowed structures, not required structures. Directories MUST be created only when there is a real need. Directories not listed here MAY be created when they have clear responsibilities and are consistent with the relevant framework, tooling, or common community practice.

When these conventions do not define a convention, code SHOULD follow the established pattern in nearby code. If no stable local pattern exists, code SHOULD follow the official documentation and common practice of the relevant framework, tool, or library.

## Normative Keywords

The keywords `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, and `MAY` in these conventions are to be interpreted as described in [BCP 14](https://www.rfc-editor.org/info/bcp14) when, and only when, they appear in uppercase.

- `MUST`: an absolute requirement.
- `MUST NOT`: an absolute prohibition.
- `SHOULD`: a recommended practice; deviations require a clear reason.
- `SHOULD NOT`: a discouraged practice; deviations require a clear reason.
- `MAY`: an optional practice.

## Principles

- Shared code and feature-specific code MUST be separated.
- Code flow MUST be unidirectional: import dependencies MUST point from application composition toward more shared code, for example app / routes -> features -> shared code.
- Features MUST NOT import directly from other features. Cross-feature composition SHOULD happen in app / routes, or through an appropriate shared module.
- Shared code MUST NOT depend on app, routes, or features.
- Code with a clear owner SHOULD stay close to that owner. Code SHOULD be extracted as shared code only when it is reused across boundaries and has stable semantics.
- Feature-specific code SHOULD live inside the owning feature.
- Colocation MUST NOT break the dependency direction or feature isolation.
- Directories MUST represent real responsibilities, real code, and real maintenance boundaries.
- Projects MUST NOT mechanically create every possible directory for each feature.
