# Node.js Version Upgrades

This project pins one Node.js major version at a time. Minor and patch releases within that major line may update automatically; major upgrades are manual.

## Policy

- Use an Active LTS or Maintenance LTS Node.js line.
- Keep the Node.js major version consistent across local development, CI, Docker, and TypeScript Node types.
- Keep `@types/node` on the same major version as the project Node.js runtime.
- Let dependency automation update `@types/node` minor and patch versions only.

## Version Sources

When changing the Node.js major version, update these files together:

- [`.nvmrc`](../.nvmrc)
- [`package.json`](../package.json)
  - `engines.node`
  - `@types/node`
- [`Dockerfile`](../Dockerfile) The build stage base image

The existing automation keeps `@types/node` major updates manual:

- [`.github/dependabot.yaml`](../.github/dependabot.yaml)
- [`.ncurc.mjs`](../.ncurc.mjs)

## Upgrade Checklist

1. Confirm the target Node.js major is LTS, not Current.
2. Update [`.nvmrc`](../.nvmrc) to `<node-major>`.
3. Update `engines.node` to `>=<node-major>.0.0 <next-node-major>.0.0`.
4. Update the Docker build image to `node:<node-major>-slim`.
5. Update `@types/node` to the same major:

   ```bash
   pnpm up --save-dev @types/node@<node-major>
   ```

6. Reinstall dependencies with the target Node.js major:

   ```bash
   fnm install
   fnm use
   pnpm install
   ```

7. Run verification:

   ```bash
   pnpm run lint
   pnpm run test
   pnpm run build
   ```

8. If Docker behavior may be affected, run a local build without pushing:

   ```bash
   docker build --tag react-app:node-upgrade .
   ```

   Do not use `pnpm run docker:build` or `pnpm run docker:build:multi` for this
   check. Those scripts push images.
