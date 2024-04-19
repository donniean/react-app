import { defineConfig } from '@donniean/configs';

export default defineConfig({
  features: {
    gitignore: true,
    gitattributes: true,
    editorconfig: true,
    prettier: {
      patterns: ['**'],
      tailwindcss: true,
    },
    autocorrect: true,
    tsc: {
      patterns: ['**/*.{ts,tsx}'],
    },
    eslint: {
      patterns: ['**/*.{js,mjs,cjs,ts,tsx}'],
      vitestPatterns: ['**/*.test.ts'],
    },
    stylelint: {
      patterns: ['**/*.css'],
      cssModules: true,
    },
    htmlhint: {
      patterns: ['**/*.html'],
    },
    markdownlint: {
      patterns: ['**/*.md'],
    },
    cspell: {
      patterns: ['**'],
    },
    'sort-package-json': true,
    vitest: true,
    commitlint: true,
    commitizen: true,
    'lint-staged': true,
    husky: true,
  },
});
