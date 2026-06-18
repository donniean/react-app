import { defineConfig } from 'oxfmt';

export default defineConfig({
  ignorePatterns: ['**/*.min.*'],
  singleQuote: true,
  sortPackageJson: {
    sortScripts: true,
  },
  sortTailwindcss: {
    functions: ['clsx', 'cn', 'cva', 'twMerge'],
  },
});
