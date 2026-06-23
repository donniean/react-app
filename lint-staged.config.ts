import type { Configuration } from 'lint-staged';

const config = {
  '*': [
    'oxfmt --no-error-on-unmatched-pattern',
    'autocorrect --fix',
    'cspell lint --no-progress --no-must-find-files --dot --gitignore',
    () => 'pnpm run i18n:types',
    () => 'pnpm run lint:i18n',
  ],
  '*.{ts,tsx,mts,cts}': [() => 'tsc --build', 'vitest related --run'],
  '*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}': 'oxlint --fix',
  '*.css': 'stylelint --fix',
  '*.html': 'html-validate',
  '*.md': 'markdownlint --dot --fix',
} satisfies Configuration;

export default config;
