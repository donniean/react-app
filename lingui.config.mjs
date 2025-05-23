// eslint-disable-next-line import-x/no-unresolved
import { defineConfig } from '@lingui/cli';

export default defineConfig({
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src/'],
    },
  ],
  locales: ['en', 'zh-Hans'],
  sourceLocale: 'en',
  compileNamespace: 'ts',
});
