# Upgrade Node.js

This repository pins one Node.js major version at a time. Minor and patch releases within that major line may update automatically; major upgrades are manual.

## Policy

- Use an Active LTS or Maintenance LTS Node.js line.
- Keep local development, CI, Docker, and `@types/node` on the same Node.js major.
- Let dependency automation update `@types/node` minor and patch versions only; keep major updates manual.

## Inputs

Before editing, identify these values:

- `M`: target LTS Node.js major.
- `N`: the next integer major after `M`.

Replace `M` and `N` with those numbers in the version values below. If the target major is not specified, confirm it before changing files.

## Files

Update these files together when changing the Node.js major version:

- [`.nvmrc`](../../.nvmrc)
- [`package.json`](../../package.json)
  - `engines.node`
  - `devDependencies.@types/node`
- [`Dockerfile`](../../Dockerfile): Build stage `FROM`
- [`pnpm-lock.yaml`](../../pnpm-lock.yaml): Updated by pnpm when changing `@types/node`.

These files should usually keep their existing behavior:

- [`.github/workflows/ci.yaml`](../../.github/workflows/ci.yaml): Reads Node.js from [`.nvmrc`](../../.nvmrc).
- [`.github/dependabot.yaml`](../../.github/dependabot.yaml): Keeps `@types/node` major updates manual.
- [`.ncurc.mjs`](../../.ncurc.mjs): Lets `npm-check-updates` update `@types/node` minor and patch versions only.

## Upgrade Checklist

1. Confirm the target Node.js major is LTS, not Current.
2. Update the runtime version files:
   - [`.nvmrc`](../../.nvmrc): Set to `M`.
   - [`package.json`](../../package.json): Set `engines.node` to `>=M.0.0 <N.0.0`, where `N = M + 1`. For example, a target of `26` uses `>=26.0.0 <27.0.0`.
   - [`Dockerfile`](../../Dockerfile): Set build stage `FROM` to `node:M-slim`.
3. Switch to the target Node.js major before running package commands:

   ```bash
   fnm install
   fnm use
   ```

4. Use the pnpm version pinned by `packageManager` in [`package.json`](../../package.json) to update Node.js types and the lockfile. This command reads the target major from [`.nvmrc`](../../.nvmrc) and installs dependencies:

   ```bash
   pnpm add --save-dev --save-exact "@types/node@$(cat .nvmrc)"
   ```

5. Run verification:

   ```bash
   pnpm run lint
   pnpm run test
   pnpm run build
   ```
