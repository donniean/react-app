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
        'json',
        'hbs',
        'handlebars',
        'css',
        'scss',
        'md',
      ],
    },
    tsc: {
      extensions: ['ts', 'tsx'],
    },
    eslint: {
      extensions: ['js', 'ts', 'tsx'],
    },
    stylelint: {
      extensions: ['css', 'scss', 'ts', 'tsx'],
      options: {
        scss: true,
        'css-in-js': true,
      },
    },
    markdownlint: true,
    cspell: {
      extensions: ['*'],
    },
    commitlint: true,
    commitizen: true,
    'sort-package-json': true,
    husky: true,
    'lint-staged': {
      options: {
        prettier: true,
        tsc: true,
        eslint: true,
        stylelint: true,
        markdownlint: true,
        cspell: true,
      },
    },
  },
};
