import { defineConfig } from 'oxfmt';

export default defineConfig({
  ignorePatterns: [
    '.agents/skills/**',
    '.claude/skills/**',
    '.codex/skills/**',
    '.gemini/skills/**',
    '.github/skills/**',
    '**/*.min.*',
    'src/@types/i18next-resources.d.ts',
    'src/routeTree.gen.ts',
  ],
  singleQuote: true,
  sortImports: true,
  sortTailwindcss: {
    stylesheet: './src/styles/globals.css',
    functions: ['clsx', 'cn', 'cva', 'twMerge'],
  },
  sortPackageJson: {
    sortScripts: true,
  },
});
