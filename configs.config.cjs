module.exports = {
  features: {
    gitignore: true,
    gitattributes: true,
    editorconfig: true,
    prettier: {
      patterns: ['**'],
    },
    tsc: {
      patterns: ['**/*.{ts,tsx}'],
    },
    eslint: {
      patterns: ['**/*.{js,mjs,cjs,ts,tsx}'],
      plugins: {
        node: true,
      },
    },
    stylelint: {
      patterns: ['**/*.{css,scss,ts,tsx}'],
      scssPatterns: ['**/*.scss'],
      styledPatterns: ['**/*.{ts,tsx}'],
    },
    markdownlint: {
      patterns: ['**/*.md'],
    },
    cspell: {
      patterns: ['**'],
    },
    'sort-package-json': true,
    commitlint: true,
    commitizen: true,
    'lint-staged': true,
    husky: true,
  },
};
