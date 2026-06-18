import { defineConfig } from 'npm-check-updates';

const majorLockedDependencies = new Set(['@types/node', 'typescript']);
const blockedDependencyVersions = new Map([
  // vite-plugin-checker@0.14.3 is missing required runtime files.
  // https://github.com/fi3ework/vite-plugin-checker/issues/766
  ['vite-plugin-checker', new Set(['0.14.3'])],
]);

export default defineConfig({
  filterResults: (dependencyName, { upgradedVersion }) => {
    return !blockedDependencyVersions.get(dependencyName)?.has(upgradedVersion);
  },
  target: (dependencyName) => {
    if (majorLockedDependencies.has(dependencyName)) {
      return 'minor';
    }

    return 'latest';
  },
});
