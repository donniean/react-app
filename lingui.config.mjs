// eslint-disable-next-line import-x/no-unresolved
import { defineConfig } from '@lingui/cli';

export default defineConfig({
  catalogs: [
    {
      include: ['src/'],
      path: '<rootDir>/src/locales/{locale}/messages',
    },
  ],
  compileNamespace: 'ts',
  locales: ['en', 'zh-Hans'],
  sourceLocale: 'en',
});
