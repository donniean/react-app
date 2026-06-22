/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*': [
    'pnpm run format:oxfmt -- --no-error-on-unmatched-pattern',
    'pnpm run lint:autocorrect:fix --',
    () => 'pnpm run lint:spellcheck',
    () => 'pnpm run i18n:types',
    () => 'pnpm run lint:i18n',
  ],
  '*.{ts,tsx,mts,cts}': [() => 'pnpm run typecheck', 'vitest related --run'],
  '*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}': 'pnpm run lint:oxlint:fix --',
  '*.css': () => 'pnpm run lint:styles:fix',
  '*.html': () => 'pnpm run lint:html',
  '*.md': () => 'pnpm run lint:markdown:fix',
};
