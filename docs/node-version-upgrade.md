# Node.js Version Upgrades

This project pins one Node.js major version at a time. Minor and patch releases within that major line may update automatically; major upgrades are manual.

## Policy

- Use an Active LTS or Maintenance LTS Node.js line.
- Keep local development, CI, Docker, and `@types/node` on the same Node.js major.
- Let dependency automation update `@types/node` minor and patch versions only; keep major updates manual.

## Inputs

Before editing, identify these values:

- `<node-major>`: target LTS Node.js major.
- `<next-node-major>`: the next integer major after `<node-major>`.

If the target major is not specified, confirm it before changing files.

## Files

Update these files together when changing the Node.js major version:

- [`.nvmrc`](../.nvmrc)
- [`package.json`](../package.json)
  - `engines.node`
  - `devDependencies.@types/node`
- [`Dockerfile`](../Dockerfile): Build stage `FROM`

These files should usually keep their existing behavior:

- [`.github/workflows/ci.yaml`](../.github/workflows/ci.yaml): Reads Node.js from [`.nvmrc`](../.nvmrc).
- [`.github/dependabot.yaml`](../.github/dependabot.yaml): Keeps `@types/node` major updates manual.
- [`.ncurc.mjs`](../.ncurc.mjs): Lets `npm-check-updates` update `@types/node` minor and patch versions only.

## Upgrade Checklist

1. Confirm the target Node.js major is LTS, not Current.
2. Update the version files:
   - [`.nvmrc`](../.nvmrc): Set to `<node-major>`.
   - [`package.json`](../package.json)
     - `engines.node`: Set to `>=<node-major>.0.0 <next-node-major>.0.0`.
     - `devDependencies.@types/node`: Update with `pnpm update --save-dev @types/node@<node-major>`.
   - [`Dockerfile`](../Dockerfile): Set build stage `FROM` to `node:<node-major>-slim`.
3. Reinstall dependencies with the target Node.js major:

   ```bash
   fnm install
   fnm use
   pnpm install
   ```

4. Run verification:

   ```bash
   pnpm run lint
   pnpm run test
   pnpm run build
   ```
