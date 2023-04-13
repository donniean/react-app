module.exports = {
  features: {
    gitignore: true,
    gitattributes: true,
    editorconfig: true,
    prettier: {
      extensions: [
        'js',
        'ts',
        'tsx',
        'cjs',
        'json',
        'hbs',
        'handlebars',
        'css',
        'scss',
        'md',
        'yaml',
        'yml',
      ],
    },
    tsc: {
      extensions: ['ts', 'tsx'],
    },
    stylelint: {
      extensions: ['css', 'scss', 'ts', 'tsx'],
    },
    markdownlint: true,
    cspell: {
      extensions: ['**'],
    },
    commitlint: true,
    commitizen: true,
    'sort-package-json': true,
    'lint-staged': true,
    husky: true,
  },
};
