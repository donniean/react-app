import { defineConfig } from 'oxfmt';

export default defineConfig({
  ignorePatterns: [
    '**/*.min.*',
    '.agents/skills/**',
    '.codex/skills/**',
    '.claude/skills/**',
    '.gemini/skills/**',
    '.github/skills/**',
  ],
  singleQuote: true,
  sortImports: true,
  sortTailwindcss: {
    functions: ['clsx', 'cn', 'cva', 'twMerge'],
  },
  sortPackageJson: {
    sortScripts: true,
  },
});
