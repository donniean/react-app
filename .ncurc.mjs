import { defineConfig } from 'npm-check-updates';

const majorLockedDependencies = new Set(['@types/node', 'typescript']);

export default defineConfig({
  target: (dependencyName) => {
    if (majorLockedDependencies.has(dependencyName)) {
      return 'minor';
    }

    return 'latest';
  },
});
