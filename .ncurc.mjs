import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { defineConfig } = require('npm-check-updates');

export default defineConfig({
  reject: ['typescript'],
  target: (dependencyName) => {
    if (dependencyName === '@types/node') {
      return 'minor';
    }

    return 'latest';
  },
});
