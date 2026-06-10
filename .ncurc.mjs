import { defineConfig } from 'npm-check-updates';

export default defineConfig({
  reject: ['typescript'],
  target: (dependencyName) => {
    if (dependencyName === '@types/node') {
      return 'minor';
    }

    return 'latest';
  },
});
