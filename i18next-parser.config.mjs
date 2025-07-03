export default {
  defaultNamespace: 'common',
  lineEnding: 'lf',
  locales: ['en', 'zh-Hans'],
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.ts',
    '!src/**/*.mock.ts',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
    '!src/examples/**',
  ],
  sort: true,
};
