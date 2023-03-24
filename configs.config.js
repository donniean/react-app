module.exports = {
  features: {
    gitignore: true,
    gitattributes: true,
    editorconfig: true,
    prettier: {
      extensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'mjs',
        'cjs',
        'json',
        'html',
        'vue',
        'hbs',
        'handlebars',
        'css',
        'less',
        'scss',
        'md',
        'mdx',
        'yaml',
        'yml',
      ],
    },
    tsc: {
      extensions: ['ts', 'tsx'],
    },
    eslint: {
      extensions: ['js', 'jsx', 'ts', 'tsx', 'mjs', 'cjs'],
      options: {
        node: true,
      },
    },
    stylelint: {
      extensions: ['css', 'scss', 'js', 'jsx', 'ts', 'tsx'],
      options: {
        scss: true,
        'css-in-js': true,
      },
    },
    htmlhint: true,
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
