import { defineConfig } from 'oxfmt';

export default defineConfig({
  ignorePatterns: ['**/*.min.*'],
  singleQuote: true,
  sortImports: true,
  sortTailwindcss: {
    functions: ['clsx', 'cn', 'cva', 'twMerge'],
  },
  sortPackageJson: {
    sortScripts: true,
  },
});
